import express from "express";
import dbConnection from "./config/dbConnection.js";
import router from "./routes/index.js";
const conexao = await dbConnection();
conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});
conexao.once("open", () => {
  console.log("Conexao com o banco feita com sucesso");
});
const app = express();
app.use(express.json());
router(app);
export default app;
