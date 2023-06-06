import { cartService } from "../../../services/cart.services.js";

export async function delPrdInCart(req, res, next) {
  try {
    const deleter = await cartService.deleteProducts(
      req.params.cid,
      req.params.pid
    );
    res.status(200).json(deleter);
  } catch (error) {
    return next(error);
  }
}