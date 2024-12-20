import express, { Router } from "express";
import estoqueController from "../controllers/estoqueController.js";

const router: Router = express.Router();

router.get("/estoques", estoqueController.listarEstoques);
router.post("/estoques", estoqueController.criarEstoque);
router.post("/estoques/:id", estoqueController.adicionarProduto); //colocazr post, e remover produto do estoque
router.delete("/estoques/:id", estoqueController.retirarProduto);

export default router;
