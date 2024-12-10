import express, {Router} from "express"
import funcionarioController from "../controllers/funcionarioController.js";

const router: Router = express.Router();

router.get("/funcionarios", funcionarioController.obterFuncionarios);
router.get("/funcionarios/:id", funcionarioController.obterFuncionarioPorId);
router.post("/funcionarios", funcionarioController.criarFuncionario);
router.put("/funcionarios/:id", funcionarioController.atualizarFuncionario);
router.delete("/funcionarios/:id", funcionarioController.excluirFuncionario);


export default router;