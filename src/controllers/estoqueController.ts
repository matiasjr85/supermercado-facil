// src/controllers/estoqueController.ts
import { Request, Response } from "express";
import estoqueModel from "../models/estoqueModel.js";
import produtoModel from "../models/produtoModel.js";
import iEstoque from "../interfaces/iEstoque.js";
import { Types } from "mongoose";
import iProduto from "../interfaces/iProduto.js";

class estoqueController {
  // Criar Estoque
  public static criarEstoque = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const {
        produtos,
      }: { produtos: { produtoId: string; quantidade: number }[] } = req.body;

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

      const novoEstoque: iEstoque = {
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
    } catch (error: unknown) {
      console.error("Erro ao criar estoque:", error);
      res.status(500).json({
        mensagem: "Erro ao criar estoque.",
        error: (error as Error).message,
      });
    }
  };

  public static adicionarProduto = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const {
        produtoId,
        quantidade,
      }: { produtoId: string; quantidade: number } = req.body;

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
    } catch (error: unknown) {
      console.error("Erro ao adicionar produto ao estoque:", error);
      res.status(500).json({
        mensagem: "Erro ao adicionar produto ao estoque.",
        error: (error as Error).message,
      });
    }
  };

  public static retirarProduto = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const produtoEncontrado: iProduto | null =
        await produtoModel.findByIdAndDelete(id);

      if (!produtoEncontrado) {
        res.status(404).json({ message: "Produto não encontado" });
      }
    } catch (error: unknown) {}
  };
  public static listarEstoques = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const estoques = await estoqueModel.find().populate("produtos.produto");
      res.status(200).json(estoques);
    } catch (error: unknown) {
      console.error("Erro ao listar estoques:", error);
      res.status(500).json({
        mensagem: "Erro ao listar estoques.",
        error: (error as Error).message,
      });
    }
  };
}

export default estoqueController;
