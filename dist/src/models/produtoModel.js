import mongoose, { Schema } from "mongoose";
const produtoSchema = new Schema({
    nome: { type: String, required: true },
    valor: { type: Number, required: true },
    fornecedor: { type: Schema.Types.ObjectId, ref: "fornecedor", required: true },
}, { timestamps: true });
//const produto = mongoose.model<iProduto>("produto", produtoSchema)
export default mongoose.model("produto", produtoSchema);
