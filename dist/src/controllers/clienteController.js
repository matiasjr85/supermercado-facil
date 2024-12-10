var _a;
import clienteModel from "../models/clienteModel.js";
class clienteController {
}
_a = clienteController;
clienteController.criarCliente = async (req, res) => {
    try {
        const { nome, endereco } = req.body;
        const novoCliente = await clienteModel.create({ nome, endereco });
        res.status(201).json(novoCliente);
    }
    catch (error) {
        console.error('Erro ao criar fornecedor:', error);
        res.status(500).json({ mensagem: 'Erro ao criar fornecedor.', error: error.message });
    }
};
clienteController.obterClientes = async (req, res) => {
    try {
        const clientes = await clienteModel.find();
        res.status(200).json(clientes);
    }
    catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
        res.status(500).json({ mensagem: 'Erro ao buscar fornecedores.', error: error.message });
    }
};
clienteController.obterClientePorId = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await clienteModel.findById(id);
        if (!cliente) {
            res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
        }
        res.status(200).json(cliente);
    }
    catch (error) {
        console.error('Erro ao buscar fornecedor por ID:', error);
        res.status(500).json({ mensagem: 'Erro ao buscar fornecedor por ID.', error: error.message });
    }
};
clienteController.atualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        const clienteAtualizado = await clienteModel.findByIdAndUpdate(id, dadosAtualizados, { new: true });
        if (!clienteAtualizado) {
            res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
        }
        res.status(200).json(clienteAtualizado);
    }
    catch (error) {
        console.error('Erro ao atualizar fornecedor:', error);
        res.status(500).json({ mensagem: 'Erro ao atualizar fornecedor.', error: error.message });
    }
};
clienteController.excluirCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const clienteExcluido = await clienteModel.findByIdAndDelete(id);
        if (!clienteExcluido) {
            res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
        }
        res.status(200).json({ mensagem: 'Fornecedor excluído com sucesso.' });
    }
    catch (error) {
        console.error('Erro ao excluir fornecedor:', error);
        res.status(500).json({ mensagem: 'Erro ao excluir fornecedor.', error: error.message });
    }
};
export default clienteController;
