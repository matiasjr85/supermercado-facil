import express from "express";
import estoqueController from "../controllers/estoqueController.js";
const router = express.Router();
router.get("/estoques", estoqueController.listarEstoques);
router.post("/estoques", estoqueController.criarEstoque);
router.patch("/estoques/:id", estoqueController.adicionarProduto);
export default router;