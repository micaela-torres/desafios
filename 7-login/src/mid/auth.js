import { ErrorPermiss } from "../entidades/errorauth.js";

export function onlyAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return next(new ErrorPermiss());
  }
  next();
}
