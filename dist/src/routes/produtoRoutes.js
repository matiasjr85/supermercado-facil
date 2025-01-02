import express from "express";
import produtoController from "../controllers/produtoController.js";
const router = express.Router();
router.get("", produtoController.obterProdutos);
router.post("", produtoController.criarProduto);
router.get("/:id", produtoController.obterProdutoPorId);
router.put("/:id", produtoController.atualizarProduto);
router.delete("/:id", produtoController.excluirProduto);
export default router;
