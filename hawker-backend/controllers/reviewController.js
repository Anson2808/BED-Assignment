const { getConnection, sql } = require('../config/db');

// GET all reviews (Feedback joined with customer + stall names)
async function getAllReviews(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT
        f.FdbkID,
        f.FdbkRating,
        f.FdbkComment,
        f.FdbkDateTime,
        c.CustName,
        fs.StallName
      FROM Feedback f
      JOIN Customer c ON f.CustID = c.CustID
      JOIN FoodStall fs ON f.StallID = fs.StallID
      ORDER BY f.FdbkDateTime DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}

// POST a new review into Feedback
async function createReview(req, res) {
  try {
    const { custId, stallId, rating, comment } = req.body;

    const ratingNumber = parseInt(rating);
    if (!custId || !stallId || !ratingNumber || ratingNumber < 1 || ratingNumber > 5) {
      return res.status(400).json({ error: 'custId, stallId and a rating from 1 to 5 are required' });
    }

    const pool = await getConnection();
    const result = await pool.request()
      .input('custId', sql.Int, custId)
      .input('stallId', sql.Int, stallId)
      .input('rating', sql.Int, ratingNumber)
      .input('comment', sql.VarChar(500), comment || null)
      .query(`
        INSERT INTO Feedback (CustID, StallID, FdbkRating, FdbkComment)
        OUTPUT INSERTED.FdbkID
        VALUES (@custId, @stallId, @rating, @comment)
      `);

    res.status(201).json({ fdbkId: result.recordset[0].FdbkID, message: 'Review saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save review' });
  }
}

module.exports = { getAllReviews, createReview };
