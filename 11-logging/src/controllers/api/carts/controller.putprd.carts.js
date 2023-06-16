import { cartService } from "../../../services/cart.services.js";

export async function putPrdCart(req, res, next) {
  try {
    const productupd = await cartService.updateProducts(
      req.params.cid,
      req.params.pid,
      req.body.quantity,
      req.bdoy
    );
    res.json(productupd);
  } catch (error) {
    next(error);
  }
}