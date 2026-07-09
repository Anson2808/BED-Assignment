const express = require('express');
const router = express.Router();
const { getAllStalls, getStallById } = require('../controllers/stallController');

router.get('/', getAllStalls);
router.get('/:id', getStallById);

module.exports = router;