import mongoose from "mongoose";
import dbConnection from "./dbConnection.js";

export const initializeDatabase = async (): Promise<void> => {
  const conexao: mongoose.Connection = await dbConnection();

  conexao.on("error", (erro: Error) => {
    console.error("Erro de conexão com o banco de dados:", erro);
  });

  conexao.once("open", () => {
    console.log("Conexão com o banco de dados estabelecida com sucesso");
  });
};
