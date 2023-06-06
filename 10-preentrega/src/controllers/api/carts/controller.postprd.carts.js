import { cartService } from "../../../services/cart.services.js";

export async function postPdrInCart(req, res, next) {
  try {
    const product = await cartService.chargeProducts(
      req.params.cid,
      req.params.pid,
      req.query.quantity
    );
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}