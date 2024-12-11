import { Request, Response } from "express";
import iFornecedor from "../interfaces/iFornecedor.js";
import iCliente from "../interfaces/iCliente.js";
import clienteModel from "../models/clienteModel.js";

class clienteController {
  public static criarCliente = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { nome, endereco } = req.body as iCliente;
      const novoCliente: iCliente = await clienteModel.create({
        nome,
        endereco,
      });

      res.status(201).json(novoCliente as iCliente);
    } catch (error: unknown) {
      console.error("Erro ao criar fornecedor:", error);
      res.status(500).json({
        mensagem: "Erro ao criar fornecedor.",
        error: (error as Error).message,
      });
    }
  };

  public static obterClientes = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const clientes: iCliente[] = await clienteModel.find();

      res.status(200).json(clientes as iCliente[]);
    } catch (error: unknown) {
      console.error("Erro ao buscar fornecedores:", error);
      res.status(500).json({
        mensagem: "Erro ao buscar fornecedores.",
        error: (error as Error).message,
      });
    }
  };

  public static obterClientePorId = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const cliente: iCliente | null = await clienteModel.findById(id);

      if (!cliente) {
        res.status(404).json({ mensagem: "Fornecedor não encontrado." });
      }

      res.status(200).json(cliente as iCliente);
    } catch (error: unknown) {
      console.error("Erro ao buscar fornecedor por ID:", error);

      res.status(500).json({
        mensagem: "Erro ao buscar fornecedor por ID.",
        error: (error as Error).message,
      });
    }
  };

  public static atualizarCliente = async (
    req: Request<{ id: string }, {}, Partial<iFornecedor>>,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const dadosAtualizados: Partial<iCliente> = req.body;

      const clienteAtualizado: iCliente | null =
        await clienteModel.findByIdAndUpdate(id, dadosAtualizados, {
          new: true,
        });

      if (!clienteAtualizado) {
        res.status(404).json({ mensagem: "Fornecedor não encontrado." });
      }

      res.status(200).json(clienteAtualizado as iCliente);
    } catch (error: unknown) {
      console.error("Erro ao atualizar fornecedor:", error);

      res.status(500).json({
        mensagem: "Erro ao atualizar fornecedor.",
        error: (error as Error).message,
      });
    }
  };

  public static excluirCliente = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const clienteExcluido: iCliente | null =
        await clienteModel.findByIdAndDelete(id);

      if (!clienteExcluido) {
        res.status(404).json({ mensagem: "Fornecedor não encontrado." });
      }

      res.status(200).json({ mensagem: "Fornecedor excluído com sucesso." });
    } catch (error: unknown) {
      console.error("Erro ao excluir fornecedor:", error);

      res.status(500).json({
        mensagem: "Erro ao excluir fornecedor.",
        error: (error as Error).message,
      });
    }
  };
}

export default clienteController;
