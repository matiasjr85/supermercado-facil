import express, { Router } from "express";
import funcionarioController from "../controllers/funcionarioController.js";

const router: Router = express.Router();

router.get("", funcionarioController.obterFuncionarios);
router.get("/:id", funcionarioController.obterFuncionarioPorId);
router.post("", funcionarioController.criarFuncionario);
router.put("/:id", funcionarioController.atualizarFuncionario);
router.delete("/:id", funcionarioController.excluirFuncionario);

export default router;
