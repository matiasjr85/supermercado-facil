import mongoose, { Schema } from "mongoose";
import iProduto from "../interfaces/iProduto.js";

const produtoSchema = new Schema<iProduto>(
  {
    nome: { type: String, required: true },
    valorDeCompra: { type: Number, required: true },
    valorDeVenda: { type: Number, required: true },
    fornecedor: {
      type: Schema.Types.ObjectId,
      ref: "fornecedor",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<iProduto>("produto", produtoSchema);
