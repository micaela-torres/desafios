import { encriptarJWT } from "../../../utils/cripto.js";
import { userService } from "../../../services/users.service.js";

export async function postUsuarios(req, res, next) {
  try {
    console.log(req.body);
    const userCreated = await userService.registrar(req.body);
    res.cookie("jwt_authorization", encriptarJWT(userCreated), {
      signed: true,
      httpOnly: true,
    });

    res.status(201).json(userCreated);
  } catch (error) {
    next(error);
  }
}