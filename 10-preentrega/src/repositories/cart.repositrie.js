import { cartDao } from "../dao/index.js";

export class cartmodelRepository {
  #dao;
  constructor(dao) {
    this.#dao = dao;
  }

  get dao() {
    return this.#dao;
  }

  add(datac) {
    return this.#dao.add(datac);
  }

  async getCartbyId(datac) {
    return this.#dao.getCartbyId(datac);
  }

  async getProductsInCartById(datac) {
    return this.#dao.getProductsInCartById(datac);
  }

  async addProductInCart(datac, datap, dataq) {
    return this.#dao.addProductInCart(datac, datap, dataq);
  }

  async updProductinCart(datac, datap, info) {
    return this.#dao.updProductinCart(datac, datap, info);
  }

  async delProductInCart(datac, datap) {
    return this.#dao.delProductInCart(datac, datap);
  }

  async updateCart(datac, updcart) {
    return this.#dao.updateCart(datac, updcart);
  }

  async delAllProductsInCart(datac) {
    return this.#dao.delAllProductsInCart(datac);
  }

  async deleteCart(datac) {
    return this.#dao.deleteCart(datac);
  }
}

export const cartRepository = new cartmodelRepository(cartDao);