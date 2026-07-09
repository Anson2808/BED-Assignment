const { getConnection } = require('../config/db');

// GET all inspections with stall, officer and operator details
async function getAllInspections(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT
        i.InspectionID,
        i.InspectionDate,
        i.HygieneGrade,
        i.InspectionRemark,
        fs.StallName,
        hc.HCName,
        o.OfficerName,
        op.OperatorName
      FROM Inspection i
      JOIN FoodStall fs ON i.StallID = fs.StallID
      JOIN HawkerCentre hc ON fs.HCID = hc.HCID
      JOIN NEA_Officer o ON i.OfficerID = o.OfficerID
      JOIN Operator op ON i.OperatorID = op.OperatorID
      ORDER BY i.InspectionDate DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch inspections' });
  }
}

module.exports = { getAllInspections };
