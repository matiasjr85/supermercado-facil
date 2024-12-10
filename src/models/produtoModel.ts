import mongoose, { Schema } from "mongoose";
import iProduto from "../interfaces/iProduto.js";

const produtoSchema = new Schema<iProduto>({
    nome: { type: String, required: true},
    valor: { type: Number, required: true},
    fornecedor: { type: Schema.Types.ObjectId, ref: "fornecedor", required: true},

}, { timestamps: true});

//const produto = mongoose.model<iProduto>("produto", produtoSchema)
export default mongoose.model<iProduto>("produto", produtoSchema)

