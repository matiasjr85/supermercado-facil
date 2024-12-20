import express from "express";
import caixaController from "../controllers/caixaController.js";
import vendaController from "../controllers/vendaController.js";
const router = express.Router();
router.get("/caixas", caixaController.obterCaixas);
router.get("/caixas/:id", caixaController.obterCaixaPorId);
router.post("/caixas", caixaController.criarCaixa);
router.put("/caixas/:id", caixaController.atualizarCaixa);
router.delete("/caixas/:id", caixaController.excluirCaixa);
router.post("/caixas/:id", vendaController.venderProdutos);
export default router;
