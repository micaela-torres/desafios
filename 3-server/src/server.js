import express from 'express'
import ProductManager from './ProducManager.js';


const app = express()

const productsManagers = new ProductManager('./data/products.json')

app.get("/", (req, res, next) => {
    res.send("Trabajo practico, servidor con express")
})

app.get('/products', async (req, res) => {
    try {
        const products = await productsManagers.getProducts()
        const limitValue = +(req.query.limit);
        
        if(!limitValue){
            res.json(products);
        } else {
            const productLimit = [];
            for (let i = 0; i < limitValue && i < 10; i++) {
                productLimit.push(products[i])
            }
            res.json(productLimit);
        }
    } 
    catch (error) {
        console.log(error);
    }
});

app.get('/products/:pid', async(req, res) => {
    try {
        const { pid } = req.params;
        const productById = await productsManagers.getProductsById(+pid)
        productById ? res.json(productById) : res.json({message: 'Error 404: Not found'})
    } 
    catch (error) {
        console.log(error);
    }
});

app.listen(8080)


// LINK PARA PRUEVAS

//http://localhost:8080/
    //Bienvenida

//http://localhost:8080/products 
    //Muestra los 10 productos

//http://localhost:8080/products?limit=5
    //devuelve los primeros 5 de 10

//http://localhost:8080/products/2
    //devuelve producto por id
    
//http://localhost:8080/products/34123123 
    //No existe el producto{message":"Error 404: Not found}