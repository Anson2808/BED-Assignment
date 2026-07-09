const express = require('express');
const router = express.Router();
const { createOrder, getOrderHistory } = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/customer/:customerId', getOrderHistory);

module.exports = router;
