const { getConnection, sql } = require('../config/db');

// GET all menu items across all stalls (for the explore-menu page)
async function getAllMenuItems(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT
        mi.ItemCode,
        mi.ItemDesc,
        mi.ItemCategory,
        mi.ItemPrice,
        mi.IsAvailable,
        fs.StallID,
        fs.StallName,
        c.CuisineDesc,
        (SELECT AVG(CAST(f.FdbkRating AS FLOAT))
           FROM Feedback f
          WHERE f.StallID = fs.StallID) AS StallRating
      FROM MenuItem mi
      JOIN FoodStall fs ON mi.StallID = fs.StallID
      JOIN Cuisine c ON mi.CuisineID = c.CuisineID
      ORDER BY fs.StallName, mi.ItemDesc
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
}

module.exports = { getAllMenuItems };
