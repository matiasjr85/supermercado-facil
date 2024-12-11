import { Request, Response } from "express";
import iFuncionario from "../interfaces/iFuncionario.js";
import funcionarioModel from "../models/funcionarioModel.js";

class funcionarioController {
  public static criarFuncionario = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { nome, cargo, salario, endereco, dataAdmissao } =
        req.body as iFuncionario;

      const novoFuncionario: iFuncionario = await funcionarioModel.create({
        nome,
        cargo,
        salario,
        endereco,
        dataAdmissao,
      });
      res.status(201).json(novoFuncionario as iFuncionario);
    } catch (error: unknown) {
      console.error("Erro ao criar funcionario:", error);

      res.status(500).json({
        mensagem: "Erro ao criar fornecedor.",
        error: (error as Error).message,
      });
    }
  };

  public static obterFuncionarios = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const listaDeFuncionarios: iFuncionario[] = await funcionarioModel.find();
      res.status(200).json(listaDeFuncionarios as iFuncionario[]);
    } catch (error: unknown) {
      console.error("Erro ao buscar fornecedores:", error);
      res.status(500).json({
        mensagem: "Erro ao buscar fornecedores.",
        error: (error as Error).message,
      });
    }
  };

  public static obterFuncionarioPorId = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const funcionarioEncontrado: iFuncionario | null =
        await funcionarioModel.findById(id);

      if (!funcionarioEncontrado) {
        res.status(404).json({ message: "Funcionario não encontrado" });
      }
      res.status(200).json(funcionarioEncontrado as iFuncionario);
    } catch (error: unknown) {
      console.error("Erro ao buscar funcionario por ID:", error);

      res.status(500).json({
        mensagem: "Erro ao buscar funcionario por ID.",
        error: (error as Error).message,
      });
    }
  };

  public static atualizarFuncionario = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const dadosAtualizados: Partial<iFuncionario> = req.body;

      const funcionarioEncontrado: iFuncionario | null =
        await funcionarioModel.findByIdAndUpdate(id, dadosAtualizados, {
          new: true,
        });

      if (!funcionarioEncontrado) {
        res.status(404).json({ mensagem: "Funcionaro não encontrado" });
      }
      res.status(200).json(funcionarioEncontrado as iFuncionario);
    } catch (error: unknown) {
      console.error("Erro ao atualizar funcionario:", error);

      res.status(500).json({
        mensagem: "Erro ao atualizar funcionario.",
        error: (error as Error).message,
      });
    }
  };

  public static excluirFuncionario = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const funcionarioExcluido: iFuncionario | null =
        await funcionarioModel.findByIdAndDelete(id);

      if (!funcionarioExcluido) {
        res.status(404).json({ mensagem: "Funcionario não encontrado" });
      }

      res.status(200).json({ mensagem: "Funcionario excluido com sucesso" });
    } catch (error: unknown) {
      console.error("Erro ao excluir fornecedor:", error);

      res.status(500).json({
        mensagem: "Erro ao excluir funcionario.",
        error: (error as Error).message,
      });
    }
  };
}

export default funcionarioController;
