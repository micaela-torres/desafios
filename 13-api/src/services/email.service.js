// import { createTransport } from 'nodemailer'
// import { CREDENCIALES_EMAIL } from '../config/email.config.js'

// class EmailService {
//   #clienteNodemailer

//   constructor(credencialesMail) {
//     this.#clienteNodemailer = createTransport({
//       service: 'gmail',
//       port: 587,
//       auth: credencialesMail
//     })
//   }

//   async send(destinatario, mensaje) {
//     const mailOptions = {
//       from: 'Enviador de mails molesto',
//       to: destinatario,
//       subject: 'Mail molesto!',
//       text: mensaje,
//     }
//     try {
//       const info = await this.#clienteNodemailer.sendMail(mailOptions)
//       console.log(info)
//       return info
//     } catch (error) {
//       console.log(error)
//       throw error
//     }
//   }
// }

// export const emailService = new EmailService(CREDENCIALES_EMAIL)