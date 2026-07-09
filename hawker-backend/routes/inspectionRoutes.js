const express = require('express');
const router = express.Router();
const { getAllInspections } = require('../controllers/inspectionController');

router.get('/', getAllInspections);

module.exports = router;
