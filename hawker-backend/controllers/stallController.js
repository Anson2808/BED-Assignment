const { getConnection, sql } = require('../config/db');

// GET all stalls
async function getAllStalls(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM FoodStall');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stalls' });
  }
}

// GET one stall + its menu items
async function getStallById(req, res) {
  try {
    const { id } = req.params;
    const pool = await getConnection();

    const stallResult = await pool.request()
      .input('stallId', sql.Int, id)
      .query('SELECT * FROM FoodStall WHERE StallID = @stallId');

    if (stallResult.recordset.length === 0) {
      return res.status(404).json({ error: 'Stall not found' });
    }

    const menuResult = await pool.request()
      .input('stallId', sql.Int, id)
      .query(`
        SELECT ItemCode, ItemDesc, ItemCategory, ItemPrice, IsAvailable
        FROM MenuItem
        WHERE StallID = @stallId
      `);

    res.json({
      stall: stallResult.recordset[0],
      menu: menuResult.recordset
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stall details' });
  }
}

module.exports = { getAllStalls, getStallById };