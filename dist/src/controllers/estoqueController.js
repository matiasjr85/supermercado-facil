var _a;
import estoqueModel from "../models/estoqueModel.js";
import produtoModel from "../models/produtoModel.js";
import { Types } from "mongoose";
class estoqueController {}
_a = estoqueController;
// Criar Estoque
estoqueController.criarEstoque = async (req, res) => {
  try {
    const { produtos } = req.body;
    // Verificar se todos os produtos existem
    for (const item of produtos) {
      const produtoExistente = await produtoModel.findById(item.produtoId);
      if (!produtoExistente) {
        res.status(404).json({
          mensagem: `Produto com ID ${item.produtoId} não encontrado.`,
        });
        return;
      }
    }
    const novoEstoque = {
      produtos: produtos.map((item) => ({
        produto: new Types.ObjectId(item.produtoId),
        quantidade: item.quantidade,
      })),
    };
    const estoqueCriado = await estoqueModel.create(novoEstoque);
    res.status(201).json({
      mensagem: "Estoque criado com sucesso.",
      estoque: estoqueCriado,
    });
  } catch (error) {
    console.error("Erro ao criar estoque:", error);
    res.status(500).json({
      mensagem: "Erro ao criar estoque.",
      error: error.message,
    });
  }
};
estoqueController.adicionarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { produtoId, quantidade } = req.body;
    const produtoExistente = await produtoModel.findById(produtoId);
    if (!produtoExistente) {
      res.status(404).json({ mensagem: "Produto não encontrado." });
      return;
    }
    const estoque = await estoqueModel.findById(id);
    if (!estoque) {
      res.status(404).json({ mensagem: "Estoque não encontrado." });
      return;
    }
    const produtoNoEstoque = estoque.produtos.find(
      (item) => item.produto.toString() === produtoId,
    );
    if (produtoNoEstoque) {
      produtoNoEstoque.quantidade += quantidade;
    } else {
      estoque.produtos.push({
        produto: new Types.ObjectId(produtoId),
        quantidade,
      });
    }
    await estoque.save();
    res.status(200).json({
      mensagem: "Produto adicionado ao estoque com sucesso.",
      estoque,
    });
  } catch (error) {
    console.error("Erro ao adicionar produto ao estoque:", error);
    res.status(500).json({
      mensagem: "Erro ao adicionar produto ao estoque.",
      error: error.message,
    });
  }
};
estoqueController.retirarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { produtoId, quantidade } = req.body;
    const estoque = await estoqueModel.findById(id);
    if (!estoque) {
      res.status(404).json({ mensagem: "Estoque não encontrado." });
      return;
    }
    const produtoNoEstoque = estoque.produtos.find(
      (item) => item.produto.toString() === produtoId,
    );
    if (!produtoNoEstoque) {
      res.status(404).json({ mensagem: "Produto não encontrado no estoque." });
      return;
    }
    produtoNoEstoque.quantidade -= quantidade;
    if (produtoNoEstoque.quantidade === 0) {
      estoque.produtos = estoque.produtos.filter(
        (item) => item.produto.toString() !== produtoId,
      );
    }
    await estoque.save();
    res.status(200).json({
      mensagem: "Produto removido do estoque com sucesso.",
      estoque,
    });
  } catch (error) {
    console.error("Erro ao remover produto do estoque:", error);
    res.status(500).json({
      mensagem: "Erro ao remover produto do estoque.",
      error: error.message,
    });
  }
};
estoqueController.listarEstoques = async (req, res) => {
  try {
    // Popula todas as informações dos produtos relacionados
    const estoques = await estoqueModel.find().populate({
      path: "produtos.produto", // Popula os produtos dentro do estoque
      model: "produto", // Nome do modelo associado
    });
    res.status(200).json(estoques);
  } catch (error) {
    console.error("Erro ao listar estoques:", error);
    res.status(500).json({
      mensagem: "Erro ao listar estoques.",
      error: error.message,
    });
  }
};
export default estoqueController;
