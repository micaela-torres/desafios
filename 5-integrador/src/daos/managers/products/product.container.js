import ProductsMongoDAO  from "./products.dao.mongo.js";
const ProductsMongo = new ProductsMongoDAO(); 

class ProductManager {
    #path
    constructor(path) {
        this.#path = path
    }

    async addProducts(item){
        try {
            await ProductsMongo.addProduct(item);
            console.log('Product add');
        } 
        catch (error) {
            console.log(error);
        }
    }
    async getProducts(){
        try {
            const product = await ProductsMongo.getAll();
            return !product ? await ProductsMongo.addProduct() : product;
        } 
        catch (error) {
            console.log(error);
            return []
        }
    }
    async getProductsById(id){
        try {
            const productById = await ProductsMongo.getById(id);
            return productById;
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateProduct(id, item){
        try {
            const product = await ProductsMongo.getAll();
            const productId = product.findIndex(product => product.id === _id);
            if(productId >= 0){
                item.id = _id
                product[productId] = item;
                await ProductsMongo.addProduct();
                return product[productId];
            }
        } 
        catch (error) {
            console.log(error);
        }
    }
    async deleteProduct(id){
        try {
            const allProduct = await ProductsMongo.getAll();
            const deleteProduct = allProduct.findIndex(item => item.id === _id);
            if(deleteProduct >= 0) {
                allProduct.splice(deleteProduct, 1);
                await ProductsMongo.addProduct();
            }
            return deleteProduct;
        } 
        catch (error) {
            console.log(error);
        }
    }
}

export default ProductManager;