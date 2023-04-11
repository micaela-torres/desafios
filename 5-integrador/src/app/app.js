import express from "express";
import { engine } from "express-handlebars";
import router from "../routers/app.routers.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));

app.engine('handlebars', engine());
app.set('views' , './views');
app.set('view engine','handlebars');

app.use(router);


export default app;