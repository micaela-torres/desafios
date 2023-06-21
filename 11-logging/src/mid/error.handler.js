import {
  ErrorInvalidQuantity,
  ErrorAuthothentication,
  ErrorDuplicatedElement,
  ErrorInvalidArgument,
  ErrorNotFound,
  ErrorPermissions,
} from "../models/error/errors.model.js";

export function apiErrorHandler(error, req, res, next) {
  if (error instanceof ErrorInvalidArgument) {
    res.status(400);
  } else if (error instanceof ErrorNotFound) {
    res.status(404);
  } else if (error instanceof ErrorAuthothentication) {
    res.status(401);
  } else if (error instanceof ErrorPermissions) {
    res.status(403);
  } else if (error instanceof ErrorDuplicatedElement) {
    res.status(404);
  } else if (error instanceof ErrorInvalidQuantity) {
    res.status(404);
  } else {
    res.status(500);
  }
  res.json({
    estado: "error",
    tipo: error.tipo,
    descripcion: error.descripcion,
  });
}
