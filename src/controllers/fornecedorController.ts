import { Request, Response } from 'express';
import fornecedorModel from '../models/fornecedorModel.js';
import iFornecedor from '../interfaces/iFornecedor.js';

class fornecedorController {
  
  public static criarFornecedor = async (req: Request, res: Response): Promise<void> => {
    try {
      
      const { nomeEmpresa, endereco } = req.body as iFornecedor;

      const novoFornecedor: iFornecedor = await fornecedorModel.create({ nomeEmpresa, endereco });

      res.status(201).json(novoFornecedor as iFornecedor);
    } catch (error: unknown) {
      console.error('Erro ao criar fornecedor:', error);

      res.status(500).json({ mensagem: 'Erro ao criar fornecedor.', error: (error as Error).message });
    }
  }
  
  public static obterFornecedores = async (req: Request, res: Response): Promise<void> => {
    try {
      const fornecedores: iFornecedor[] = await fornecedorModel.find();

      res.status(200).json(fornecedores as iFornecedor[]);
    } catch (error: unknown) {
      console.error('Erro ao buscar fornecedores:', error);
      res.status(500).json({ mensagem: 'Erro ao buscar fornecedores.', error: (error as Error).message });
    }
  }
  
  public static obterFornecedorPorId = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const fornecedor: iFornecedor | null = await fornecedorModel.findById(id);

      if (!fornecedor) {
        res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
      }

        res.status(200).json(fornecedor as iFornecedor);
    } catch (error: unknown) {
      console.error('Erro ao buscar fornecedor por ID:', error);

        res.status(500).json({ mensagem: 'Erro ao buscar fornecedor por ID.', error: (error as Error).message });
    }
  }
  
  public static atualizarFornecedor = async (req: Request<{ id: string }, {}, Partial<iFornecedor>>, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const dadosAtualizados: Partial<iFornecedor> = req.body;

      const fornecedorAtualizado: iFornecedor | null = await fornecedorModel.findByIdAndUpdate(
        id,
        dadosAtualizados,
        { new: true }
      );

      if (!fornecedorAtualizado) {
        res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
      }

        res.status(200).json(fornecedorAtualizado as iFornecedor);
    } catch (error: unknown) {
      console.error('Erro ao atualizar fornecedor:', error);

        res.status(500).json({ mensagem: 'Erro ao atualizar fornecedor.', error: (error as Error).message });
    }
  }
  
  public static excluirFornecedor = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const fornecedorExcluido: iFornecedor | null = await fornecedorModel.findByIdAndDelete(id);

      if (!fornecedorExcluido) {
        res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
      }

        res.status(200).json({ mensagem: 'Fornecedor excluído com sucesso.'});
    } catch (error: unknown) {
      console.error('Erro ao excluir fornecedor:', error);

        res.status(500).json({ mensagem: 'Erro ao excluir fornecedor.', error: (error as Error).message });
    }
  }
}

export default fornecedorController;
