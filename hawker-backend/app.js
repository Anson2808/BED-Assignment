const express = require('express');
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
