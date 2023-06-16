import { productsRepository } from "../../../repositories/product.repositorie.js";

export async function getProductsController(req, res, next) {
  try {
    const urlsrt = `http://localhost:8080${req.originalUrl}`;
    const result = await productsRepository.getPaginatedElements(
      req.query,
      urlsrt
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
}