import express, { Router } from "express"
import caixaController from "../controllers/caixaController.js";

const router: Router = express.Router();

router.get("/caixas", caixaController.obterCaixas);
router.get("/caixas/:id", caixaController.obterCaixaPorId);
router.post("/caixas", caixaController.criarCaixa);
router.put("/caixas/:id", caixaController.atualizarCaixa);
router.delete("/caixas/:id", caixaController.excluirCaixa);

export default router;