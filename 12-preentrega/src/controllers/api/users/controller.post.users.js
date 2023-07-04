import { encriptarJWT } from "../../../utils/cripto.js";
import { userService } from "../../../services/users.service.js";

export async function postUsuarios(req, res, next) {
  req.logger.http("inside post user");
  try {
    const userCreated = await userService.registrar(req.body);
    req.session.user = userCreated;
    res.cookie("jwt_authorization", encriptarJWT(userCreated), {
      signed: true,
      httpOnly: true,
    });

    res.status(201).json(userCreated);
  } catch (error) {
    req.logger.error(`post user fail ${error.message}`);
    next(error);
  }
}