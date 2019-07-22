import express from 'express'
import ProductController from '../controllers/product.controller'

const router = express.Router()

router.route('/')
.get(ProductController.getAllProducts)
.post(ProductController.createProduct)

router.route('/:id')
.get(ProductController.getOneProduct)
.put(ProductController.updateOneProduct)
.delete(ProductController.deleteOneProduct)

module.exports = router