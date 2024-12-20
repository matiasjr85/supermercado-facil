import express from "express";
import supermercadoController from "../controllers/supermercadoController.js";
const router = express.Router();
router.get("/supermercados", supermercadoController.obterSupermercados);
router.get("/supermercados/:id", supermercadoController.obterSupermercadoPorId);
router.post("/supermercados", supermercadoController.criarSupermercado);
router.put("/supermercados/:id", supermercadoController.atualizarSupermercado);
router.delete("/supermercados/:id", supermercadoController.excluirSupermercado);
router.patch(
  "/supermercados/:id/adicionar-funcionario",
  supermercadoController.adicionarFuncionario,
);
export default router;
