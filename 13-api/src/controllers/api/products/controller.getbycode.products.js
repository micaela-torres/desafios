import { productsRepository } from "../../../repositories/product.repositorie.js";

export async function getProductCodeController(req, res, next) {
  req.logger.http("inside get products by code");
  try {
    const producto = await productsRepository.findOne({ code: req.params.pcd });
    res.json(producto);
  } catch (error) {
    req.logger.error(`get product by code fail ${error.message}`);
    next(error);
  }
}