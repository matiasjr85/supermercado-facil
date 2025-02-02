import { Request, Response } from "express";
import iSupermercado from "../interfaces/iSupermercado.js";
import funcionarioModel from "../models/funcionarioModel.js";
import supermercadoModel from "../models/supermercadoModel.js";
import mongoose from "mongoose";
import estoqueModel from "../models/estoqueModel.js";

class supermercadoController {
  public static criarSupermercado = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { nome, endereco, funcionarios, estoque }: iSupermercado =
        req.body as iSupermercado;

      const estoqueExiste = await estoqueModel.findById(estoque);

      if (!estoqueExiste) {
        res.status(404).json({ message: "Estoque não encontrado" });
        return;
      }

      const supermercado = new supermercadoModel({
        nome,
        endereco,
        funcionarios: [],
        estoque,
      });

      if (funcionarios && funcionarios.length > 0) {
        const funcionarioExistentes = await funcionarioModel.find({
          _id: { $in: funcionarios },
        });

        if (funcionarioExistentes.length !== funcionarios.length) {
          res.status(404).json({
            message: "Um ou mais IDs de funcionários não foram encontrados",
          });
          return;
        }

        supermercado.funcionarios.push(
          ...funcionarioExistentes.map((f) => f._id as mongoose.Types.ObjectId),
        );
      }

      const novoSupermercado = await supermercado.save();

      res.status(201).json(novoSupermercado);
    } catch (error: unknown) {
      console.error("Erro ao criar supermercado:", error);
      res.status(500).json({ mensagem: "Erro ao criar supermercado", error });
    }
  };

  public static obterSupermercados = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const supermercados = await supermercadoModel
        .find()
        .populate("funcionarios");
      res.status(200).json(supermercados);
    } catch (error) {
      console.error("Erro ao obter supermercados:", error);
      res.status(500).json({ mensagem: "Erro ao obter supermercados", error });
    }
  };

  public static obterSupermercadoPorId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ mensagem: "ID inválido" });
        return;
      }
      const supermercado = await supermercadoModel
        .findById(id)
        .populate("funcionarios");

      if (!supermercado) {
        res.status(404).json({ mensagem: "Supermercado não encontrado" });
        return;
      }

      res.status(200).json(supermercado);
    } catch (error) {
      console.error("Erro ao obter supermercado por ID:", error);
      res.status(500).json({ mensagem: "Erro ao obter supermercado", error });
    }
  };

  public static atualizarSupermercado = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const dadosAtualizados = req.body;

      const supermercadoAtualizado = await supermercadoModel.findByIdAndUpdate(
        id,
        dadosAtualizados,
        { new: true },
      );

      if (!supermercadoAtualizado) {
        res.status(404).json({ mensagem: "Supermercado não encontrado" });
        return;
      }

      res.status(200).json(supermercadoAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar supermercado:", error);
      res
        .status(500)
        .json({ mensagem: "Erro ao atualizar supermercado", error });
    }
  };

  public static excluirSupermercado = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const supermercadoExcluido =
        await supermercadoModel.findByIdAndDelete(id);

      if (!supermercadoExcluido) {
        res.status(404).json({ mensagem: "Supermercado não encontrado" });
        return;
      }

      res.status(200).json({ mensagem: "Supermercado excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir supermercado:", error);
      res.status(500).json({ mensagem: "Erro ao excluir supermercado", error });
    }
  };

  public static adicionarFuncionario = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { funcionarios } = req.body;

      const supermercado = await supermercadoModel.findById(id);
      if (!supermercado) {
        res.status(404).json({ mensagem: "Supermercado não encontrado" });
        return;
      }

      const funcionariosExistentes = await funcionarioModel.find({
        _id: { $in: funcionarios },
      });

      if (funcionariosExistentes.length !== funcionarios.length) {
        res
          .status(404)
          .json({ mensagem: "Um ou mais funcionários não encontrados" });
        return;
      }

      supermercado.funcionarios.push(
        ...funcionariosExistentes.map((f) => f._id as mongoose.Types.ObjectId),
      );
      await supermercado.save();

      res.status(200).json({
        mensagem: "Funcionários adicionados com sucesso",
        supermercado,
      });
    } catch (error) {
      console.error("Erro ao adicionar funcionário ao supermercado:", error);
      res
        .status(500)
        .json({ mensagem: "Erro ao adicionar funcionário", error });
    }
  };
}

export default supermercadoController;
