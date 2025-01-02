var _a;
import produtoModel from "../models/produtoModel.js";
import estoqueModel from "../models/estoqueModel.js";
import caixaModel from "../models/caixaModel.js";
import vendaModel from "../models/vendaModel.js";
class vendaController {
}
_a = vendaController;
vendaController.venderProdutos = async (req, res) => {
    try {
        const { id } = req.params;
        const { clienteId, produtos, } = req.body;
        console.log(id, clienteId);
        const caixa = await caixaModel.findById(id);
        if (!caixa || caixa.status !== "ativo") {
            res.status(404).json({ mensagem: "Caixa não encontrado ou inativo." });
            return;
        }
        let totalVenda = 0;
        for (const item of produtos) {
            const { produtoId, quantidade } = item;
            const estoque = await estoqueModel.findOne({
                "produtos.produto": produtoId,
            });
            if (!estoque) {
                res
                    .status(404)
                    .json({
                    mensagem: `Produto com ID ${produtoId} não encontrado no estoque.`,
                });
                return;
            }
            const produtoEstoque = estoque.produtos.find((p) => p.produto.toString() === produtoId);
            if (!produtoEstoque || produtoEstoque.quantidade < quantidade) {
                res
                    .status(400)
                    .json({
                    mensagem: `Estoque insuficiente para o produto ${produtoId}.`,
                });
                return;
            }
            const produto = await produtoModel.findById(produtoId);
            if (!produto) {
                res
                    .status(404)
                    .json({ mensagem: `Produto com ID ${produtoId} não encontrado.` });
                return;
            }
            if (isNaN(produto.valorDeVenda) || isNaN(quantidade)) {
                res
                    .status(400)
                    .json({
                    mensagem: `Valor de venda ou quantidade inválida para o produto ${produtoId}.`,
                });
                return;
            }
            const valorVenda = produto.valorDeVenda * quantidade;
            if (isNaN(valorVenda)) {
                res
                    .status(400)
                    .json({
                    mensagem: `Erro no cálculo da venda para o produto ${produtoId}.`,
                });
                return;
            }
            produtoEstoque.quantidade -= quantidade;
            totalVenda += produto.valorDeVenda * quantidade;
            await estoque.save();
        }
        caixa.saldo += totalVenda;
        await caixa.save();
        const novaVenda = await vendaModel.create({
            cliente: clienteId,
            caixa: id,
            produtos: await Promise.all(produtos.map(async (p) => {
                const produto = await produtoModel.findById(p.produtoId);
                if (!produto) {
                    throw new Error(`Produto com ID ${p.produtoId} não encontrado`);
                }
                return {
                    produto: p.produtoId,
                    quantidade: p.quantidade,
                    valorUnitario: produto.valorDeVenda,
                };
            })),
            totalVenda,
        });
        res.status(201).json({
            mensagem: "Venda realizada com sucesso.",
            venda: novaVenda,
        });
    }
    catch (error) {
        console.error("Erro ao realizar venda:", error);
        res.status(500).json({
            mensagem: "Erro ao realizar venda.",
            error: error.message,
        });
    }
};
export default vendaController;
