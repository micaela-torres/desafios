import { moackingProducts } from "../../../utils/mocks/mock.product.js";

export async function getProductsMocked(req, res, next) {
  try {
    const products = await moackingProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}