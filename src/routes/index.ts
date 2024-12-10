import { Router } from "express";
import fornecedorRoutes from "../routes/fornecedorRoutes.js"
import produtoRoutes from "../routes/produtoRoutes.js"
import estoqueRoutes from "../routes/estoqueRoutes.js"
import funcionarioRoutes from "../routes/funcionarioRoutes.js"
import supermercadosRoutes from "../routes/supermercadoRoutes.js"
import clienteRoutes from "../routes/clienteRoutes.js"
import caixaRoutes from "../routes/caixaRoutes.js"

const router = (app: Router): void => {
    app.use("/",
        fornecedorRoutes,
        produtoRoutes,
        estoqueRoutes,
        funcionarioRoutes,
        supermercadosRoutes,
        clienteRoutes,
        caixaRoutes
        )
}

export default router;