import mongoose from "mongoose";
import { MONGODB_CNX_STR } from "../../config/config.js";

export async function conectar() {
  if (MONGODB_CNX_STR) {
    await mongoose.connect(MONGODB_CNX_STR);
  }

  console.log(`base de dto conectada a ${MONGODB_CNX_STR}`);
}