import { Request, Response } from "express"
import iProduto from "../interfaces/iProduto.js"
import fornecedorModel from "../models/fornecedorModel.js"
import produtoModel from "../models/produtoModel.js";
import iFornecedor from "../interfaces/iFornecedor";
class produtoController {

    public static criarProduto = async (req: Request, res: Response): Promise<void> => {
        try {
            const {nome, valor, fornecedorId}: {nome: string; valor: number; fornecedorId: string} = req.body;

            const fornecedorExiste:  iFornecedor | null = await fornecedorModel.findById(fornecedorId);
            console.log(fornecedorExiste)
            if (!fornecedorExiste) {
                console.log(fornecedorExiste)
                res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
                return
            }

            const novoProduto: iProduto = await produtoModel.create({
                nome,
                valor,
                fornecedor: fornecedorId
            });
            
            res.status(201).json(novoProduto);

        } catch (error: unknown) {
            console.error('Erro ao criar produto:', error);
            res.status(500).json({ mensagem: 'Erro ao criar produto.', error: (error as Error).message });
        }
    }

    public static obterProdutos = async (req: Request, res: Response): Promise<void> => {
        try {
            const produtos: iProduto[] = await produtoModel.find();

            res.status(200).json(produtos as iProduto[]);
        } catch (error: unknown) {
            console.error('Erro ao buscar produtos:', error);
            res.status(500).json({ mensagem: 'Erro ao buscar produtos.', error: (error as Error).message });
        }
    }

    public static obterProdutoPorId = async (req: Request<{id: string}>, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

        const produto: iProduto | null = await produtoModel.findById(id);

        if (!produto) {
            res.status(404).json({ mensagem: 'Produto não encontrado.' });
        }
        res.status(200).json(produto as iProduto);
        } catch (error) {
            console.error('Erro ao buscar produto por ID:', error);

            res.status(500).json({ mensagem: 'Erro ao buscar produto por ID.', error: (error as Error).message });
        }
    }

    public static atualizarProduto = async (req: Request<{id: string}, {}, Partial<iProduto>>, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const dadosAtualizado: Partial<iProduto> = req.body
            const produtoAtualizado: iProduto | null = await produtoModel.findByIdAndUpdate(id, dadosAtualizado, {new: true});
            if (!produtoAtualizado) {
                res.status(404).json({ mensagem: 'Produto não encontrado.' });
            }
            res.status(200).json(produtoAtualizado as iProduto);
        } catch (error: unknown) {
            console.error('Erro ao atualizar produto:', error);

            res.status(500).json({ mensagem: 'Erro ao atualizar produto.', error: (error as Error).message });
        }

    }

    public static excluirFornecedor = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        try {
          const { id } = req.params;
    
          const produtoExcluido: iProduto | null = await produtoModel.findByIdAndDelete(id);
    
          if (!produtoExcluido) {
            res.status(404).json({ mensagem: 'Produto não encontrado.' });
          }
    
            res.status(200).json({ mensagem: 'Produto excluído com sucesso.'});
        } catch (error: unknown) {
          console.error('Erro ao excluir produto:', error);
    
            res.status(500).json({ mensagem: 'Erro ao excluir produto.', error: (error as Error).message });
        }
      }
}

export default produtoController;