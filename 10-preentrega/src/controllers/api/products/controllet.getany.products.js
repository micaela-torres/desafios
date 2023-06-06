import { productsRepository } from "../../../repositories/product.repositorie.js";

export async function getProductController(req, res, next) {
  try {
    const producto = await productsRepository.findOneById(req.params.pid);
    console.log(producto);
    res.json(producto);
  } catch (error) {
    next(error);
  }
}
