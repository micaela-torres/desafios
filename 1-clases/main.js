// CLASE ProductManager

class ProductManager {

    constructor(){
        this.products = [];
    }
    
    getProducts(){
        return this.products;
    }

    addProduct(producto){
        if (this.products.length ===0){
            producto.id = 1;
        } else {
            producto.id = this.products [this.products.length -1].id +1;
        }

        const codigoUnico = this.products.find((product) => product.code === producto.code)

        if (codigoUnico){
            console.log("El code ya existe, ingrese otro valor");
        }else {
            this.products.push(producto)
        }
    }
    getProductById(id){
        const productToFind = this.products.find((product) => product.id === id)

        if (!productToFind) {
            console.log("Not found");
            return
        
        }else {
            return productToFind;
        }
    }    

}

// elemento products

class products {
    constructor(title,description, price, thumbnail, code,stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id= 0;
        
    }
}

//PRUEBAS 

const manejadorEventos = new ProductManager();

// Array vacio sino hay productos

console.log("-------Mostramos el array vacio---------")
console.log (manejadorEventos.getProducts());
console.log("--------------------------------------------")

// Agregando productos

console.log("-------Mostramos los productos agregados-------")
manejadorEventos.addProduct(new products("Jabon tocador baby" ,"Jabon tocador baby con estuche por 60 g", 60, "https://firebasestorage.googleapis.com/v0/b/primerapractica-22fb2.appspot.com/o/1001.jpg?alt=media&token=9a458821-6122-4bb4-872c-57688478e5f5", 4521 , 23))

manejadorEventos.addProduct(new products("Shampoo baby", "Por 444 ml, Manzanilla", 117, "https://firebasestorage.googleapis.com/v0/b/primerapractica-22fb2.appspot.com/o/1441.jpg?alt=media&token=3a069684-5280-4608-94a2-fc4276573e30", 8475 , 5))

manejadorEventos.addProduct(new products("Toallitas húmedas", "Pack por tres unidades", 540, "https://firebasestorage.googleapis.com/v0/b/primerapractica-22fb2.appspot.com/o/1224.jpg?alt=media&token=e94d5a4c-3cbc-4d78-886a-c9dd9de9b1df", 3258 , 150))

console.log (manejadorEventos.getProducts());

//CODE ya existente

console.log("-------Code ya existente-------")
manejadorEventos.addProduct(new products("Toallitas húmedas", "Pack por tres unidades", 540, "https://firebasestorage.googleapis.com/v0/b/primerapractica-22fb2.appspot.com/o/1224.jpg?alt=media&token=e94d5a4c-3cbc-4d78-886a-c9dd9de9b1df", 3258 , "150"))

console.log("----------------------------------------")

//BUSCANDO POR ID

console.log("-------Filtramos por id correcto-------")
console.log(manejadorEventos.getProductById(2))
console.log("----------------------------------------")
console.log("-------Filtramos por id incorrecto-------")
console.log(manejadorEventos.getProductById(5))