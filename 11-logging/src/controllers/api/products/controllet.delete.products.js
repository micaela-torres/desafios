import { pmg } from "../../../dao/mongoose/product.dao.mg.js";
import { socketFn } from "../../../mid/soketio.rt.js";
import { productsRepository } from "../../../repositories/product.repositorie.js";

export async function deleteProduct(req, res, next) {
  try {
    await productsRepository.deleteOne(req.params.pid);
    await socketFn();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
