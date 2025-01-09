import express, { Application } from "express";
import cors from "cors"; // Importando o pacote cors
import { initializeDatabase } from "./config/database.js";
import router from "./routes/index.js";

const app: Application = express();

// Configuração do CORS
app.use(
  cors({
    origin: "*", // Permite todas as origens. Substitua "*" pela URL específica do front-end para maior segurança.
    methods: ["GET", "POST", "PUT", "DELETE"], // Permite apenas os métodos especificados
    allowedHeaders: ["Content-Type", "Authorization"], // Define os cabeçalhos permitidos
  })
);

app.use(express.json());
router(app);

initializeDatabase();

export default app;
