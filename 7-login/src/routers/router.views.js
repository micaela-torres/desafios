import { Router } from "express";
import {
  cartView,
  loginView,
  newProductView,
  productView,
  regisView,
} from "../controllers/views/controller.all.views.js";
import { onlyAuth } from "../mid/auth.js";

export const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  res.redirect("/login");
});

viewsRouter.get("/newproducts", onlyAuth, newProductView);

//vistas de productos paginado
//nota falta ver como hacer para que siempre aparezca en mi url page como req (ver como redirigir)
viewsRouter.get("/products", onlyAuth, productView);

//vista de carritos
viewsRouter.get("/carts/:cid", onlyAuth, cartView);

//Login
viewsRouter.get("/login", loginView);

//Register
viewsRouter.get("/register", regisView);
