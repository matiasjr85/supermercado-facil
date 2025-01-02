import express, { Router } from "express";
import fornecedorController from "../controllers/fornecedorController.js";

const router: Router = express.Router();

router.get("", fornecedorController.obterFornecedores);
router.get("/:id", fornecedorController.obterFornecedorPorId);
router.post("", fornecedorController.criarFornecedor);
router.put("/:id", fornecedorController.atualizarFornecedor);
router.delete("/:id", fornecedorController.excluirFornecedor);

export default router;
