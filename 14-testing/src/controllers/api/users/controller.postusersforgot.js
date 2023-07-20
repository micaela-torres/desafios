import { userRepository } from "../../../repositories/users.repository.js";
import { emailService } from "../../../services/email.service.js";
import { encriptarJWT } from "../../../utils/cripto.js";

export async function postUsersForgot(req, res, next) {
  try {
    req.logger.http("inside get  forgot-user");
    const user = await userRepository.findOne({ email: req.body.email });
    req.logger.info(user);
    const recoveryToken = encriptarJWT({ email: user.email });
    const mailData = {
      subject: "Recuperación de contraseña",
      mensaje: `Hola,\n\n
          Para restablecer tu contraseña, haz clic en el siguiente enlace: \n\n
          http://localhost:8080/recover?token=${recoveryToken}\n\n
          Si no has solicitado un restablecimiento de contraseña, ignora este correo.\n\n
          Saludos,\n
          `,
    };
    await emailService.send(user.email, mailData);

    res.status(201).json("email sent");
  } catch (error) {
    req.logger.error(`post forgotuser fail ${error.message}`);
    next(error);
  }
}
