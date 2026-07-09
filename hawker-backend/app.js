const express = require('express');
const { getConnection, sql } = require('./config/db');
const stallRoutes = require('./routes/stallRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/stalls', stallRoutes);

app.get('/', (req, res) => {
  res.send('Hawker Centre backend is running!');
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