var _a;
import funcionarioModel from "../models/funcionarioModel.js";
class funcionarioController {
}
_a = funcionarioController;
funcionarioController.criarFuncionario = async (req, res) => {
    try {
        const { nome, cargo, salario, endereco, dataAdmissao } = req.body;
        const novoFuncionario = await funcionarioModel.create({
            nome,
            cargo,
            salario,
            endereco,
            dataAdmissao
        });
        res.status(201).json(novoFuncionario);
    }
    catch (error) {
        console.error('Erro ao criar funcionario:', error);
        res.status(500).json({ mensagem: 'Erro ao criar fornecedor.', error: error.message });
    }
};
funcionarioController.obterFuncionarios = async (req, res) => {
    try {
        const listaDeFuncionarios = await funcionarioModel.find();
        res.status(200).json(listaDeFuncionarios);
    }
    catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
        res.status(500).json({ mensagem: 'Erro ao buscar fornecedores.', error: error.message });
    }
};
funcionarioController.obterFuncionarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const funcionarioEncontrado = await funcionarioModel.findById(id);
        if (!funcionarioEncontrado) {
            res.status(404).json({ message: "Funcionario não encontrado" });
        }
        res.status(200).json(funcionarioEncontrado);
    }
    catch (error) {
        console.error('Erro ao buscar funcionario por ID:', error);
        res.status(500).json({ mensagem: 'Erro ao buscar funcionario por ID.', error: error.message });
    }
};
funcionarioController.atualizarFuncionario = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        const funcionarioEncontrado = await funcionarioModel.findByIdAndUpdate(id, dadosAtualizados, { new: true });
        if (!funcionarioEncontrado) {
            res.status(404).json({ mensagem: "Funcionaro não encontrado" });
        }
        res.status(200).json(funcionarioEncontrado);
    }
    catch (error) {
        console.error('Erro ao atualizar funcionario:', error);
        res.status(500).json({ mensagem: 'Erro ao atualizar funcionario.', error: error.message });
    }
};
funcionarioController.excluirFuncionario = async (req, res) => {
    try {
        const { id } = req.params;
        const funcionarioExcluido = await funcionarioModel.findByIdAndDelete(id);
        if (!funcionarioExcluido) {
            res.status(404).json({ mensagem: "Funcionario não encontrado" });
        }
        res.status(200).json({ mensagem: "Funcionario excluido com sucesso" });
    }
    catch (error) {
        console.error('Erro ao excluir fornecedor:', error);
        res.status(500).json({ mensagem: 'Erro ao excluir funcionario.', error: error.message });
    }
};
export default funcionarioController;
