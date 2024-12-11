import { Request, Response } from "express";
import mongoose from "mongoose";
import caixaModel from "../models/caixaModel.js";
import supermercadoModel from "../models/supermercadoModel.js";
import funcionarioModel from "../models/supermercadoModel.js";
import iFuncionario from "../interfaces/iFuncionario.js";

class caixaController {
  // Criar um novo caixa
  public static criarCaixa = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { id_Supermercado, saldo, id_Funcionario, status } = req.body;

      // Validar mercado
      const supermercado = await supermercadoModel.findById(id_Supermercado);
      if (!supermercado) {
        res.status(404).json({ mensagem: "Supermercado não encontrado" });
        return;
      }

      // Validar funcionário
      let funcionario: iFuncionario | null = null;
      if (id_Funcionario) {
        funcionario = (await funcionarioModel.findById(
          id_Funcionario,
        )) as iFuncionario | null;
        if (!funcionario) {
          res.status(404).json({ mensagem: "Funcionário não encontrado" });
          return;
        }
      }

      // Criar o novo caixa
      const novoCaixa = new caixaModel({
        id_Supermercado,
        saldo,
        id_Funcionario: funcionario ? funcionario._id : null,
        id_Cliente: null,
        status,
      });

      await novoCaixa.save();
      res
        .status(201)
        .json({ mensagem: "Caixa criado com sucesso", caixa: novoCaixa });
    } catch (error) {
      console.error("Erro ao criar caixa:", error);
      res.status(500).json({ mensagem: "Erro ao criar caixa", error });
    }
  };

  // Obter todos os caixas
  public static obterCaixas = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const caixas = await caixaModel
        .find()
        .populate("id_Supermercado id_Funcionario id_Cliente");
      res.status(200).json(caixas);
    } catch (error) {
      console.error("Erro ao obter caixas:", error);
      res.status(500).json({ mensagem: "Erro ao obter caixas", error });
    }
  };

  // Obter caixa por ID
  public static obterCaixaPorId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      // Validar ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ mensagem: "ID inválido" });
        return;
      }

      const caixa = await caixaModel
        .findById(id)
        .populate("id_Supermercado id_Funcionario id_Cliente");

      if (!caixa) {
        res.status(404).json({ mensagem: "Caixa não encontrado" });
        return;
      }

      res.status(200).json(caixa);
    } catch (error) {
      console.error("Erro ao obter caixa por ID:", error);
      res.status(500).json({ mensagem: "Erro ao obter caixa", error });
    }
  };

  // Atualizar caixa
  public static atualizarCaixa = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { id_Supermercado, saldo, id_Funcionario, id_Cliente, status } =
        req.body;

      // Validar ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ mensagem: "ID inválido" });
        return;
      }

      // Atualizar o caixa
      const caixaAtualizado = await caixaModel.findByIdAndUpdate(
        id,
        { id_Supermercado, saldo, id_Funcionario, id_Cliente, status },
        { new: true },
      );

      if (!caixaAtualizado) {
        res.status(404).json({ mensagem: "Caixa não encontrado" });
        return;
      }

      res.status(200).json({
        mensagem: "Caixa atualizado com sucesso",
        caixa: caixaAtualizado,
      });
    } catch (error) {
      console.error("Erro ao atualizar caixa:", error);
      res.status(500).json({ mensagem: "Erro ao atualizar caixa", error });
    }
  };

  // Excluir caixa
  public static excluirCaixa = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      // Validar ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ mensagem: "ID inválido" });
        return;
      }

      const caixaExcluido = await caixaModel.findByIdAndDelete(id);

      if (!caixaExcluido) {
        res.status(404).json({ mensagem: "Caixa não encontrado" });
        return;
      }

      res.status(200).json({ mensagem: "Caixa excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir caixa:", error);
      res.status(500).json({ mensagem: "Erro ao excluir caixa", error });
    }
  };
}

export default caixaController;
