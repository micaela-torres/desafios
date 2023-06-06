import { PERSISTENCIA } from "../config/config.js";

let userDao;
let productDao;
let cartDao
if (PERSISTENCIA === "mongoose") {
  const { umg } = await import("./mongoose/users.dao.mg.js");
  userDao = umg;
  const { pmg } = await import("./mongoose/product.dao.mg.js");
  productDao = pmg;
  const { cmg } = await import("./mongoose/cart.dao.mg.js");
  cartDao=cmg
} else {
  const { um } = await import("./fs/users.manager.fs.js");
  userDao = um;
  const { pm } = await import("./fs/product.manager.fs.js");
  productDao = pm;
  const { cm } = await import("./fs/cart.manager.fs.js");
  cartDao=cm
}

export { userDao, productDao,cartDao };