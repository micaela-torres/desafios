import { cartRepository } from "../repositories/cart.repositrie.js";
import Users from "../models/Users.model.js";
import Carts from "../models/carts.model.js";
import { userRepository } from "../repositories/users.repository.js";

class UserService {
  constructor(repositorie) {
    this.repositorie = repositorie;
  }
  async registrar(UserData) {
    try {
      const newcart = new Carts();
      const cart = await cartRepository.add(newcart.dto());
      UserData.cart = cart.id;
      const datasuser = {
        email: UserData.email,
        first_name: UserData.first_name,
        last_name: UserData.last_name,
        age: Number(UserData.age),
        password: UserData.password,
        role:
          UserData.email === "adminCoder@coder.com" &&
          UserData.password === "adminCod3r123"
            ? "admin"
            : UserData.email === "joaquin.bidart@blackid.app" &&
              UserData.password === "blackastro"
            ? "super-admin"
            : "user",
        cart: UserData.cart,
      };
      console.log(`data : ${JSON.stringify(datasuser)}`);
      const user = new Users(datasuser);
      console.log(`user:${JSON.stringify(user)}`);
      const registrado = await this.repositorie.add(user.dto());
      return registrado;
    } catch (error) {
      await cartRepository.deleteCart(UserData.cart);
    }
  }
}

export const userService = new UserService(userRepository);