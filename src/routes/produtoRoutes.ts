import express, { Router } from "express";
import produtoController from "../controllers/produtoController.js";

const router: Router = express.Router();

router.get("/produtos", produtoController.obterProdutos);
router.post("/produtos", produtoController.criarProduto);
router.get("/produtos/:id", produtoController.obterProdutoPorId);
router.put("/produtos/:id", produtoController.atualizarProduto);
router.delete("/produtos/:id", produtoController.excluirFornecedor);

export default router;
