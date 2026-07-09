const express = require('express');
const { randomUUID } = require('crypto');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
const { getConnection, sql } = require('./config/db');
const stallRoutes = require('./routes/stallRoutes');
const menuRoutes = require('./routes/menuRoutes');
const customerRoutes = require('./routes/customerRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const inspectionRoutes = require('./routes/inspectionRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const profiles = new Map();

const seedId = randomUUID();
profiles.set(seedId, {
  id: seedId,
  name: 'Jane Doe',
  email: 'jane@example.com',
  bio: 'Loves hiking and JavaScript.',
  passwordHash: bcrypt.hashSync('changeme123', 10),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

function toPublicProfile(profile) {
  if (!profile) return profile;
  const { passwordHash, ...publicProfile } = profile;
  return publicProfile;
}

function findAll() {
  return Array.from(profiles.values());
}

function findById(id) {
  return profiles.get(id) || null;
}

function findByEmail(email) {
  return findAll().find((p) => p.email.toLowerCase() === email.toLowerCase()) || null;
}

function createProfile({ name, email, bio, password }) {
  const id = randomUUID();
  const now = new Date().toISOString();
  const profile = {
    id,
    name,
    email,
    bio: bio || '',
    passwordHash: bcrypt.hashSync(password, 10),
    createdAt: now,
    updatedAt: now,
  };
  profiles.set(id, profile);
  return profile;
}

function updateProfileById(id, updates) {
  const existing = profiles.get(id);
  if (!existing) return null;
  const updated = {
    ...existing,
    ...updates,
    id: existing.id, // id and createdAt can never be overwritten by the client
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };
  profiles.set(id, updated);
  return updated;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateCreate(req, res, next) {
  const { name, email, bio, password } = req.body || {};
  const errors = [];
 
  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('name is required and must be a non-empty string');
  }
  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email)) {
    errors.push('email is required and must be a valid email address');
  }
  if (bio !== undefined && typeof bio !== 'string') {
    errors.push('bio must be a string');
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    errors.push('password is required and must be at least 8 characters');
  }
 
  if (errors.length) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }
  next();
}

function validateUpdate(req, res, next) {
  const { name, email, bio, password } = req.body || {};
  const errors = [];
 
  if (name !== undefined && (typeof name !== 'string' || !name.trim())) {
    errors.push('name must be a non-empty string');
  }
  if (email !== undefined && (typeof email !== 'string' || !EMAIL_RE.test(email))) {
    errors.push('email must be a valid email address');
  }
  if (bio !== undefined && typeof bio !== 'string') {
    errors.push('bio must be a string');
  }
  // Password is optional on update — only re-validate it if the user is changing it.
  if (password !== undefined && (typeof password !== 'string' || password.length < 8)) {
    errors.push('password must be at least 8 characters');
  }
  if (Object.keys(req.body || {}).length === 0) {
    errors.push('request body must include at least one field to update (name, email, bio, password)');
  }
 
  if (errors.length) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }
  next();
}

const router = express.Router();

router.get('/', (req, res) => {
  res.json(findAll().map(toPublicProfile));
});

router.get('/:id', (req, res) => {
  const profile = findById(req.params.id);
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json(toPublicProfile(profile));
});

router.post('/', validateCreate, (req, res) => {
  const { name, email, bio, password } = req.body;
 
  if (findByEmail(email)) {
    return res.status(409).json({ error: 'A profile with this email already exists' });
  }
 
  const profile = createProfile({ name, email, bio, password });
  res.status(201).json(toPublicProfile(profile));
});

router.put('/:id', validateUpdate, (req, res) => {
  const { id } = req.params;
  const existing = findById(id);
  if (!existing) return res.status(404).json({ error: 'Profile not found' });
 
  const { name, email, bio, password } = req.body;
 
  // If the email is changing, make sure no other profile already has it.
  if (email && email.toLowerCase() !== existing.email.toLowerCase()) {
    const conflict = findByEmail(email);
    if (conflict && conflict.id !== id) {
      return res.status(409).json({ error: 'That email is already in use by another profile' });
    }
  }
 
  const updated = updateProfileById(id, {
    ...(name !== undefined && { name }),
    ...(email !== undefined && { email }),
    ...(bio !== undefined && { bio }),
    ...(password !== undefined && { passwordHash: bcrypt.hashSync(password, 10) }),
  });
 
  res.json(toPublicProfile(updated));
});

router.delete('/:id', (req, res) => {
  const deleted = profiles.delete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Profile not found' });
  res.status(204).send();
});
 
app.use('/api/profiles', router);
 
app.get('/', (req, res) => {
  res.json({ message: 'Profile Manager API is running. See /api/profiles' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Profile Manager API listening on http://localhost:${PORT}`);
});

module.exports = app;

// Serve the frontend (html/, js/, Css/) from the same server
app.use(express.static(path.join(__dirname, '..')));

app.use('/api/stalls', stallRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/inspections', inspectionRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.redirect('/html/index.html');
});

app.get('/test-db', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT COUNT(*) AS stallCount FROM FoodStall');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
