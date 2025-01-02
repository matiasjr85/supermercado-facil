import express, { Router } from "express";
import estoqueController from "../controllers/estoqueController.js";

const router: Router = express.Router();

router.get("", estoqueController.listarEstoques);
router.post("", estoqueController.criarEstoque);
router.post("/:id", estoqueController.adicionarProduto); //colocazr post, e remover produto do estoque
router.delete("/:id", estoqueController.retirarProduto);

export default router;
