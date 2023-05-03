// Libery
import express from "express";
import { engine } from "express-handlebars";
import { Server as socketIOServer } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";

//root
import { apiRouter } from "../routers/router.api.js";
import { viewsRouter } from "../routers/router.views.js";

//config
import { PORT } from "../config/config.server.js";

//mid
import { errorFn } from "../mid/error.js";
import { socketFn } from "../mid/soketio.productrt.js";
//DDBB
import { conectar } from "../database/mongoose.js";
import session from "../mid/session.js";
import { passportInitialize, passportSession } from "../mid/passport.js";
const app = express();

await conectar();

app.use(cors({ origin: "*" }));
app.use("/public", express.static("public"));
app.use(cookieParser("joacode19"));
app.use(session);

app.engine("handlebars", engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

app.use(passportInitialize, passportSession);

app.use("/api", apiRouter);
app.use("/", viewsRouter);
app.use(errorFn);

const httpServer = app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}/`);
});

export const io = new socketIOServer(httpServer);

io.on("connection", async (clientSocket) => {
  console.log(`New connection: ${clientSocket.id}`);
  await socketFn();
});
