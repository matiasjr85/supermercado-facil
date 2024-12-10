var _a;
import fornecedorModel from '../models/fornecedorModel.js';
class fornecedorController {
}
_a = fornecedorController;
fornecedorController.criarFornecedor = async (req, res) => {
    try {
        const { nomeEmpresa, endereco } = req.body;
        const novoFornecedor = await fornecedorModel.create({ nomeEmpresa, endereco });
        res.status(201).json(novoFornecedor);
    }
    catch (error) {
        console.error('Erro ao criar fornecedor:', error);
        res.status(500).json({ mensagem: 'Erro ao criar fornecedor.', error: error.message });
    }
};
fornecedorController.obterFornecedores = async (req, res) => {
    try {
        const fornecedores = await fornecedorModel.find();
        res.status(200).json(fornecedores);
    }
    catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
        res.status(500).json({ mensagem: 'Erro ao buscar fornecedores.', error: error.message });
    }
};
fornecedorController.obterFornecedorPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const fornecedor = await fornecedorModel.findById(id);
        if (!fornecedor) {
            res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
        }
        res.status(200).json(fornecedor);
    }
    catch (error) {
        console.error('Erro ao buscar fornecedor por ID:', error);
        res.status(500).json({ mensagem: 'Erro ao buscar fornecedor por ID.', error: error.message });
    }
};
fornecedorController.atualizarFornecedor = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        const fornecedorAtualizado = await fornecedorModel.findByIdAndUpdate(id, dadosAtualizados, { new: true });
        if (!fornecedorAtualizado) {
            res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
        }
        res.status(200).json(fornecedorAtualizado);
    }
    catch (error) {
        console.error('Erro ao atualizar fornecedor:', error);
        res.status(500).json({ mensagem: 'Erro ao atualizar fornecedor.', error: error.message });
    }
};
fornecedorController.excluirFornecedor = async (req, res) => {
    try {
        const { id } = req.params;
        const fornecedorExcluido = await fornecedorModel.findByIdAndDelete(id);
        if (!fornecedorExcluido) {
            res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
        }
        res.status(200).json({ mensagem: 'Fornecedor excluído com sucesso.' });
    }
    catch (error) {
        console.error('Erro ao excluir fornecedor:', error);
        res.status(500).json({ mensagem: 'Erro ao excluir fornecedor.', error: error.message });
    }
};
export default fornecedorController;
