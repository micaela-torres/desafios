import * as dotenv from "dotenv";

dotenv.config({
  path: "src/config/.env",
});

//server

const PORT = process.env.PORT;

//persitencia
const PERSISTENCIA = process.env.PERSISTENCIA;

const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR;

//auth
const JWT_PRIVATE_KEY = "pioneta";
const COOKIE_KEY = "micatorres21";

const CLIENTID_GIT = 'Iv1.3da744d0448f60e8';

const CLIENTSCR_GIT = "37fe03a13bcf096201bb0084ec76e63125111e2a";

const SESSION_SECRET = "elquenoabrelacabezanolecreceelcorazon";

//views
const PATH_NEW_PRODUCT = process.env.PATH_NEW_PRODUCT;
const PATH_PRODUCT = process.env.PATH_PRODUCT;
const PATH_CARTS = process.env.PATH_CARTS;
const PATH_LOGIN = process.env.PATH_LOGIN;
const PATH_REGIS = process.env.PATH_REGIS;
const PATH_CHAT = process.env.PATH_CHAT;
const PATH_TICKET = process.env.PATH_TICKET;

export {
  PORT,
  PERSISTENCIA,
  MONGODB_CNX_STR,
  COOKIE_KEY,
  JWT_PRIVATE_KEY,
  CLIENTID_GIT,
  CLIENTSCR_GIT,
  SESSION_SECRET,
  PATH_CARTS,
  PATH_LOGIN,
  PATH_NEW_PRODUCT,
  PATH_PRODUCT,
  PATH_REGIS,
  PATH_CHAT,
  PATH_TICKET,
};