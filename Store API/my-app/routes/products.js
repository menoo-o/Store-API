import express from "express";
const router = express.Router();
import productsControllers from '../controllers/products.js'

router.route('/').get(productsControllers.getAllProducts)
router.route('/static').get(productsControllers.getAllProductsStatic)

export default router;