import mongoose, { Schema } from "mongoose";
const produtoSchema = new Schema({
    nome: { type: String, required: true },
    valorDeCompra: { type: Number, required: true },
    valorDeVenda: { type: Number, required: true },
    fornecedor: {
        type: Schema.Types.ObjectId,
        ref: "fornecedor",
        required: true,
    },
}, { timestamps: true });
export default mongoose.model("produto", produtoSchema);
