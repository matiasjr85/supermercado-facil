import mongoose, { Schema } from "mongoose";
const iSupermercadoSchema = new Schema({
    nome: { type: String, required: true },
    endereco: {
        rua: { type: String, required: true },
        numero: { type: Number, required: true },
        cep: { type: Number, required: true },
    },
    funcionarios: [
        { type: mongoose.Schema.Types.ObjectId, ref: "funcionario" },
    ],
    estoque: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "estoque",
        required: true,
    },
}, { timestamps: true });
export default mongoose.model("supermercado", iSupermercadoSchema);
