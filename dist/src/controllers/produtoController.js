var _a;
import fornecedorModel from "../models/fornecedorModel.js";
import produtoModel from "../models/produtoModel.js";
class ProdutoController {
}
_a = ProdutoController;
ProdutoController.criarProduto = async (req, res) => {
    try {
        const { nome, valorDeCompra, valorDeVenda, fornecedorId, } = req.body;
        const fornecedorExiste = await fornecedorModel.findById(fornecedorId);
        if (!fornecedorExiste) {
            res.status(404).json({ mensagem: "Fornecedor não encontrado." });
            return;
        }
        const novoProduto = await produtoModel.create({
            nome,
            valorDeCompra,
            valorDeVenda,
            fornecedor: fornecedorId,
        });
        res.status(201).json(novoProduto);
    }
    catch (error) {
        console.error("Erro ao criar produto:", error);
        res.status(500).json({
            mensagem: "Erro ao criar produto.",
            error: error.message,
        });
    }
};
ProdutoController.obterProdutos = async (req, res) => {
    try {
        const produtos = await produtoModel
            .find()
            .populate("fornecedor", "nome");
        res.status(200).json(produtos);
    }
    catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).json({
            mensagem: "Erro ao buscar produtos.",
            error: error.message,
        });
    }
};
ProdutoController.obterProdutoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await produtoModel
            .findById(id)
            .populate("fornecedor", "nome");
        if (!produto) {
            res.status(404).json({ mensagem: "Produto não encontrado." });
            return;
        }
        res.status(200).json(produto);
    }
    catch (error) {
        console.error("Erro ao buscar produto por ID:", error);
        res.status(500).json({
            mensagem: "Erro ao buscar produto por ID.",
            error: error.message,
        });
    }
};
ProdutoController.atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        const produtoAtualizado = await produtoModel
            .findByIdAndUpdate(id, dadosAtualizados, { new: true })
            .populate("fornecedor", "nome");
        if (!produtoAtualizado) {
            res.status(404).json({ mensagem: "Produto não encontrado." });
            return;
        }
        res.status(200).json(produtoAtualizado);
    }
    catch (error) {
        console.error("Erro ao atualizar produto:", error);
        res.status(500).json({
            mensagem: "Erro ao atualizar produto.",
            error: error.message,
        });
    }
};
ProdutoController.excluirProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const produtoExcluido = await produtoModel.findByIdAndDelete(id);
        if (!produtoExcluido) {
            res.status(404).json({ mensagem: "Produto não encontrado." });
            return;
        }
        res.status(200).json({ mensagem: "Produto excluído com sucesso." });
    }
    catch (error) {
        console.error("Erro ao excluir produto:", error);
        res.status(500).json({
            mensagem: "Erro ao excluir produto.",
            error: error.message,
        });
    }
};
export default ProdutoController;
