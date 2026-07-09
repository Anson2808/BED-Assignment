const { getConnection } = require('../config/db');

// GET all customers (id + name only, used for dropdowns until the login story is done)
async function getAllCustomers(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query('SELECT CustID, CustName FROM Customer ORDER BY CustName');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
}

module.exports = { getAllCustomers };
