import { productsRepository } from "../../../repositories/product.repositorie.js";

export async function getProductCodeController(req, res, next) {
  try {
    const producto = await productsRepository.findOne({ code: req.params.pcd });
    res.json(producto);
  } catch (error) {
    next(error);
  }
}