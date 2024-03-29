import { pm } from "../../../dao/product.manager.fs.js";
import { pmg } from "../../../dao/product.manager.mg.js";
import Products from "../../../entidades/products.js";
import { socketFn } from "../../../mid/soketio.productrt.js";

export async function postProductController(req, res, next) {
  try {
    const producto = new Products(req.body);
    const result = await pmg.addProduct(producto.datos());
    await socketFn();
    console.log(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
