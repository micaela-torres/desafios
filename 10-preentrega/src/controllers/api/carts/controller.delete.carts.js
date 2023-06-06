import { cartRepository } from "../../../repositories/cart.repositrie.js";

export async function deleteAllPrdCart(req, res, next) {
  try {
    const deleter = await cartRepository.delAllProductsInCart(req.params.cid);
    res.json(deleter);
  } catch (error) {
    return next(error);
  }
}