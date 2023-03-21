import app  from "./app.js";
import { Server } from "socket.io";
import ProductManager from "./model/product.container.js";

const PORT = process.env.PORT || 8080;

const productManager = new ProductManager("./data/products.json");

// SERVER
const server = app.listen(PORT, () => {
    console.log(`Server listen and running in PORT: ${PORT}`);
});

const io = new Server(server);

// SOCKET
io.on('connection', async (socket) => {
    console.log('New client connected!');
    const products = await productManager.getProducts()

    socket.emit('products', {
        products: products,
        showProducts: products.length > 0
    });
})