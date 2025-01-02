import fornecedorRoutes from "../routes/fornecedorRoutes.js";
import produtoRoutes from "../routes/produtoRoutes.js";
import estoqueRoutes from "../routes/estoqueRoutes.js";
import funcionarioRoutes from "../routes/funcionarioRoutes.js";
import supermercadosRoutes from "../routes/supermercadoRoutes.js";
import clienteRoutes from "../routes/clienteRoutes.js";
import caixaRoutes from "../routes/caixaRoutes.js";
const router = (app) => {
    // Registrar rotas com caminhos específicos
    app.use("/fornecedores", fornecedorRoutes);
    app.use("/produtos", produtoRoutes);
    app.use("/estoques", estoqueRoutes);
    app.use("/funcionarios", funcionarioRoutes);
    app.use("/supermercados", supermercadosRoutes);
    app.use("/clientes", clienteRoutes);
    app.use("/caixas", caixaRoutes);
};
export default router;
