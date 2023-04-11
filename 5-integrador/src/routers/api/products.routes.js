import { Router } from "express";
import productController from "../../controller/product.controller.js";

const router = Router();

router.post('/inventoryupload', productController.addProduct);
router.get('/inventoryupload', productController.getProduct);
router.get('/inventoryupload/:pid', productController.getProductById);
router.put('/inventoryupload/:pid', productController.updateProduct);
router.delete('/inventaryupload/:pid', productController.deleteProduct);

export default router;