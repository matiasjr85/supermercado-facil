import express from "express";
import clienteController from "../controllers/clienteController.js";
const router = express.Router();
router.get("", clienteController.obterClientes);
router.get("/:id", clienteController.obterClientePorId);
router.post("", clienteController.criarCliente);
router.put("/:id", clienteController.atualizarCliente);
router.delete("/:id", clienteController.excluirCliente);
export default router;
