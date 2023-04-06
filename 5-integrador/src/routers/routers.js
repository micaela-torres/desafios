import { Router } from "express";
import ProductManager from "../model/product.container.js";
import ProductsController from "../controller/product.controller.js";

const viewsRoute = Router();
const productManager = new ProductManager("./src/data/mongoose.js")
const products = await productManager.getProducts();

viewsRoute.get('/', async (req, res, next) => {
    try {
        res.render('index', {
            title: 'Productos: ',
            products: [...products],
            showProducts: products.length > 0
        })
    } 
    catch (error) {
        next(error);
    }
});


viewsRoute.get('/realtimeproducts', async (req, res, next) => {
    try {
        res.render('realtimeproducts', {
            title: 'Productos: ',
            products: [...products],
            showProducts: products.length > 0
        })
    } 
    catch (error) {
        next(error);
    }
})
viewsRoute.post('/realtimeproducts', ProductsController.addProducts);

export default viewsRoute;