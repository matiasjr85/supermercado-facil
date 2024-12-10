import express from "express";
import clienteController from "../controllers/clienteController.js";
const router = express.Router();
router.get("/clientes", clienteController.obterClientes);
router.get("/clientes/:id", clienteController.obterClientePorId);
router.post("/clientes", clienteController.criarCliente);
router.put("/clientes/:id", clienteController.atualizarCliente);
router.delete("/clientes/:id", clienteController.excluirCliente);
export default router;
