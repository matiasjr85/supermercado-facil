import express from "express";
import caixaController from "../controllers/caixaController.js";
import vendaController from "../controllers/vendaController.js";
const router = express.Router();
router.get("", caixaController.obterCaixas);
router.get("/:id", caixaController.obterCaixaPorId);
router.post("", caixaController.criarCaixa);
router.put("", caixaController.atualizarCaixa);
router.delete("/:id", caixaController.excluirCaixa);
router.post("/:id", vendaController.venderProdutos);
export default router;
