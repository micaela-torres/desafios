import { HTTP_STATUS } from "../constants/api.contants.js";
import { errorResponse, successResponse } from "../utils/api.js";
import { ProductManager } from "../daos/managers/app.daos.js";
import { limitProducts } from "../utils/validations.js";


const productManager = new ProductManager()
class ProductsController {
    async addProduct(req, res, next) {
        try {
            const {
                title,
                price,
                code,
                stock,
                category,
                description,
                status,
                thumbnails,
            } = req.body;

            const newProduct = {
                title,
                price,
                code,
                stock,
                category,
                description,
                status: status === 'on' ? true : false,
                thumbnails,
            }
            const result = validationProducts(newProduct)
            const allProduct = await productManager.getProducts();
            const validCode = codeValidation(allProduct, newProduct.code);
            if (allProduct.length) {
                if (validCode) {
                    return res.json(validCode);
                } else if (result.success) {
                    await productManager.addProducts(newProduct);
                }
            } else {
                await productManager.addProducts(newProduct);
            }
            const response = successResponse(newProduct);
            res.status(HTTP_STATUS.CREATED).json(response)
        }
        catch (error) {
            next(error);
        }
    };

    async getProduct(req, res, next) {
        try {
            const products = await productManager.getProducts();
            const productList = limitProducts(products, req.query.limit, req.query.page)
            res.json({ ...productList })
        }
        catch (error) {
            next(error)
        }
    }
    async getProductById(req, res, next) {
        try {
            const { pid } = req.params
            const productById = await productManager.getProductsById(pid)
            const response = successResponse(productById);
            productById ? res.json(response) : res.json(errorResponse('ID not found'))
        }
        catch (error) {
            next(error)
        }
    }
    async updateProduct(req, res, next) {
        try {

        }
        catch (error) {
            next(error)
        }
    }
    async deleteProduct(req, res, next) {
        try {

        }
        catch (error) {
            next(error)
        }
    }
};
export default new ProductsController;