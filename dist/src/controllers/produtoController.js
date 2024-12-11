var _a;
import fornecedorModel from "../models/fornecedorModel.js";
import produtoModel from "../models/produtoModel.js";
class produtoController {}
_a = produtoController;
produtoController.criarProduto = async (req, res) => {
  try {
    const { nome, valor, fornecedorId } = req.body;
    const fornecedorExiste = await fornecedorModel.findById(fornecedorId);
    console.log(fornecedorExiste);
    if (!fornecedorExiste) {
      console.log(fornecedorExiste);
      res.status(404).json({ mensagem: "Fornecedor não encontrado." });
      return;
    }
    const novoProduto = await produtoModel.create({
      nome,
      valor,
      fornecedor: fornecedorId,
    });
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({
      mensagem: "Erro ao criar produto.",
      error: error.message,
    });
  }
};
produtoController.obterProdutos = async (req, res) => {
  try {
    const produtos = await produtoModel.find();
    res.status(200).json(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({
      mensagem: "Erro ao buscar produtos.",
      error: error.message,
    });
  }
};
produtoController.obterProdutoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await produtoModel.findById(id);
    if (!produto) {
      res.status(404).json({ mensagem: "Produto não encontrado." });
    }
    res.status(200).json(produto);
  } catch (error) {
    console.error("Erro ao buscar produto por ID:", error);
    res.status(500).json({
      mensagem: "Erro ao buscar produto por ID.",
      error: error.message,
    });
  }
};
produtoController.atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const dadosAtualizado = req.body;
    const produtoAtualizado = await produtoModel.findByIdAndUpdate(
      id,
      dadosAtualizado,
      {
        new: true,
      },
    );
    if (!produtoAtualizado) {
      res.status(404).json({ mensagem: "Produto não encontrado." });
    }
    res.status(200).json(produtoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({
      mensagem: "Erro ao atualizar produto.",
      error: error.message,
    });
  }
};
produtoController.excluirFornecedor = async (req, res) => {
  try {
    const { id } = req.params;
    const produtoExcluido = await produtoModel.findByIdAndDelete(id);
    if (!produtoExcluido) {
      res.status(404).json({ mensagem: "Produto não encontrado." });
    }
    res.status(200).json({ mensagem: "Produto excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({
      mensagem: "Erro ao excluir produto.",
      error: error.message,
    });
  }
};
export default produtoController;
