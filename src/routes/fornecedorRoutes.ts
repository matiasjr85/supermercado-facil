import express, { Router } from "express";
import fornecedorController from "../controllers/fornecedorController.js";

const router: Router = express.Router();

router.get("/fornecedores", fornecedorController.obterFornecedores);
router.get("/fornecedores/:id", fornecedorController.obterFornecedorPorId);
router.post("/fornecedores", fornecedorController.criarFornecedor);
router.put("/fornecedores/:id", fornecedorController.atualizarFornecedor);
router.delete("/fornecedores/:id", fornecedorController.excluirFornecedor);

export default router;
