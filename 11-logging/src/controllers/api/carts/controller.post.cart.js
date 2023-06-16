import Carts from "../../../models/carts.model.js";
import { cartRepository } from "../../../repositories/cart.repositrie.js";

export async function postCart(req, res, next) {
  try {
    const newcart = new Carts();
    const agregada = await cartRepository.add(newcart);
    res.json(agregada);
  } catch (error) {
    next(error);
  }
}
