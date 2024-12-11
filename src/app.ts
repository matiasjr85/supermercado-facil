import express, { Application } from "express";
import dbConnection from "./config/dbConnection.js";
import router from "./routes/index.js";
import mongoose from "mongoose";

const conexao: mongoose.Connection = await dbConnection();

conexao.on("error", (erro: Error) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conexao com o banco feita com sucesso");
});

const app: Application = express();
app.use(express.json());
router(app);

export default app;
