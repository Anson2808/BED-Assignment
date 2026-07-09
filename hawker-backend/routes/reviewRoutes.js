const express = require('express');
const router = express.Router();
const { getAllReviews, createReview } = require('../controllers/reviewController');

router.get('/', getAllReviews);
router.post('/', createReview);

module.exports = router;
