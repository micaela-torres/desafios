import { userRepository } from "../../../repositories/users.repository.js";
import { encriptarJWT } from "../../../utils/cripto.js";

export function getCurrentSessionController(req, res, next) {
  const userws = userRepository.findMany();
  res.json(userws);
}

export async function postSesiones(req, res, next) {
  res.cookie("jwt_authorization", encriptarJWT(req.user), {
    signed: true,
    httpOnly: true,
  });

  res.sendStatus(201);
}

export async function deleteSesiones(req, res, next) {
  req.logout(async (err) => {
    res.clearCookie("jwt_authorization", {
      signed: true,
      httpOnly: true,
    });
    res.sendStatus(200);
  });
}