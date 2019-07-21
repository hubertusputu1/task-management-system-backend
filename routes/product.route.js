const express = require('express');
const router = express.Router();
const product_controller = require('../controllers/product.controller');

router.route('/')
.post(product_controller.product_create)

router.route('/:id')
.get(product_controller.product_details)
.put(product_controller.product_update)
.delete(product_controller.product_delete)

module.exports = router;