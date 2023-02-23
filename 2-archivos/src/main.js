import fs from 'fs';


const successfully = 'has been successfully';
const errorNotFound = 'Not Found';

class ProductManager {
    constructor(path) {
        this.path = path
    }

    async readingJSON(){
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const dataJSON = JSON.parse(data);
            return dataJSON;
        } 
        catch (error) {
            console.log(error);
        }
    }
    async fileSaving(item){
        try {
            const dataJSON = JSON.stringify(item);
            await fs.promises.writeFile(this.path, dataJSON);
        } 
        catch (error) {
            console.log(error);
        }
    }
    async addProducts(item){
        try {
            const products = await this.readingJSON();
            if(products.length){
                if(products.find( element => element.code === item.code )){
                    return console.log('This products has already been added!!')
                } else {
                    let lastIndex = products.length - 1;
                    let lastId = products[lastIndex].id;
                    item.id = lastId + 1;
                    let id = item.id;
                    products.push(item);
                    this.fileSaving(products);
                    console.log('Product add',successfully)
                    return id;
                }
            } else {
                item.id = 1;
                products.push(item);
                this.fileSaving(products);
                console.log('Product add',successfully)
            }
    
        } 
        catch (error) {
            console.log(error);
        }
    }
    async getProducts(){
        try {
            const product = await this.readingJSON();
            return console.log(product);
        } 
        catch (error) {
            console.log(error);
        }
    }
    async getProductsById(id){
        try {
            const product = await this.readingJSON();
            let productById;
            product.map(item => {
                item.id === id && (productById = item);
            });
            return productById ? console.log(productById) : console.log(errorNotFound);
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateProduct(item){
        try {
            const product = await this.readingJSON();
            const productId = product.findIndex(product => product.id === item.id)
            if(productId >= 0){
                product[productId] = item
                await this.fileSaving(product);
                console.log('Update', successfully);
            } else {
                console.log(errorNotFound);
            }
        } 
        catch (error) {
            console.log(error);
        }
    }
    async deleteProduct(id){
        try {
            const product = await this.readingJSON();
            const productId = product.findIndex(item => item.id === id);
            if(productId >= 0) {
                product.splice(1, productId);
                await this.fileSaving(product);
                console.log('Product delete', successfully);
            } else {
                console.log(errorNotFound);
            }
        } 
        catch (error) {
            console.log(error);
        }
    }
}

//PRUEBAS
const products = new ProductManager('../data/products.json');

// MOSTRAMOS ARRAY VACIO SINO HAY PRODUCTOS
console.log("-------Mostramos el array vacio---------")
await products.getProducts();
console.log("--------------------------------------------")

// CARGAMOS PRODUCTOS
console.log("-------Mostramos los productos agregados-------")

await products.addProducts({
    title:"Jabon tocador baby",
    description:"Jabon tocador baby con estuche por 60 g",
    price:60,
    thumbnail:"https://firebasestorage.googleapis.com/v0/b/primerapractica-22fb2.appspot.com/o/1001.jpg?alt=media&token=9a458821-6122-4bb4-872c-57688478e5f5",
    code:4521,
    stock:23
});
await products.addProducts({
    title:"Shampoo baby",
    description:"Por 444 ml, Manzanilla",
    price:117,
    thumbnail:"https://firebasestorage.googleapis.com/v0/b/primerapractica-22fb2.appspot.com/o/1441.jpg?alt=media&token=3a069684-5280-4608-94a2-fc4276573e30",
    code:8475,
    stock:5
});
await products.addProducts({
    title:"Toallitas húmedas",
    description:"Pack por tres unidades",
    price:540,
    thumbnail:"https://firebasestorage.googleapis.com/v0/b/primerapractica-22fb2.appspot.com/o/1224.jpg?alt=media&token=e94d5a4c-3cbc-4d78-886a-c9dd9de9b1df",
    code:3258,
    stock:150
});

await products.getProducts();

// ELIMINAMOS PRODUCTO POR ID
console.log("----------------------------------------")
console.log("-------ELIMINAMOS PRODUCTO POR ID-------")
await products.deleteProduct(2)
await products.getProducts();