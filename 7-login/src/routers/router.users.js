import { Router } from "express";
import { postUsuarios } from "../controllers/api/users/controller.post.users.js";

export const appUsers = Router();

appUsers.post("/", postUsuarios);
