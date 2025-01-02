import express, { Router } from "express";
import supermercadoController from "../controllers/supermercadoController.js";

const router: Router = express.Router();

router.get("", supermercadoController.obterSupermercados);
router.get("/:id", supermercadoController.obterSupermercadoPorId);
router.post("", supermercadoController.criarSupermercado);
router.put("/:id", supermercadoController.atualizarSupermercado);
router.delete("/:id", supermercadoController.excluirSupermercado);
router.patch("/:id/adicionar-funcionario",
  supermercadoController.adicionarFuncionario,
);

export default router;
