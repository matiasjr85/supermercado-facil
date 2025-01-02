import express from "express";
import funcionarioController from "../controllers/funcionarioController.js";
const router = express.Router();
router.get("", funcionarioController.obterFuncionarios);
router.get("/:id", funcionarioController.obterFuncionarioPorId);
router.post("", funcionarioController.criarFuncionario);
router.put("/:id", funcionarioController.atualizarFuncionario);
router.delete("/:id", funcionarioController.excluirFuncionario);
export default router;
