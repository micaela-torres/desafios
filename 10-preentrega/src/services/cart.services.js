import { cartRepository } from "../repositories/cart.repositrie.js";
import { productsRepository } from "../repositories/product.repositorie.js";

class CartService {
  constructor(repositorie) {
    this.repositorie = repositorie;
  }
  async chargeProducts(datacart, dataprod, dataq, datas) {
    try {
      const prod = await productsRepository.findOneById(dataprod);
      datas = prod.stock;
    } catch (error) {
      if (error.message === "Not Found") throw new Error("Invalid Product");
    }
    try {
      let cartqt = 0;
      const cart = await cartRepository.getCartbyId(datacart);
      const productsincart = cart.products;
      const producttocharge = productsincart.find(
        (p) => p.product === dataprod
      );
      if (producttocharge) {
        cartqt = producttocharge.quantity;
      }

      if (datas < cartqt + Number(dataq)) throw new Error("Quiantity Exceeded");
      const product = await cartRepository.addProductInCart(
        datacart,
        dataprod,
        Number(dataq) || 1
      );
      return product;
    } catch (error) {
      if (error.message === "Not Found") throw new Error("Invalid Cart");
      if (error.message === "Quiantity Exceeded")
        throw new Error("Not Enough Stock");
    }
  }

  async updateProducts(datacart, dataprod, dataq, info) {
    try {
      await productsRepository.findOneById(dataprod);
    } catch (error) {
      if (error.message === "Not Found") throw new Error("Invalid Product");
    }
    try {
      const productupd = await cartRepository.updProductinCart(
        datacart,
        dataprod,
        info
      );
      if (productupd?.stock < dataq) {
        throw new Error("Invalid Quiantity");
      }
    } catch (error) {
      if (error.message === "Not Found") throw new Error("Invalid Cart");
      if (error.mensaje === "Invalid Quiantity")
        throw new Error("Not Enough Stock");
    }
  }

  async deleteProducts(datacart, dataprod) {
    try {
      await productsRepository.findOneById(dataprod);
    } catch (error) {
      if (error.message === "Not Found") throw new Error("Invalid Product");
    }
    try {
      const deleter = await cartRepository.delProductInCart(datacart, dataprod);
      return deleter;
    } catch (error) {
      if (error.message === "Not Found") throw new Error("Invalid Cart");
    }
  }
}

export const cartService = new CartService(cartRepository);