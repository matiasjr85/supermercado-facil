import mongoose, { Schema } from "mongoose";
import iVenda from "../interfaces/iVenda.js";

const vendaSchema = new Schema<iVenda>(
  {
    cliente: { type: Schema.Types.ObjectId, ref: "cliente", required: true },
    caixa: { type: Schema.Types.ObjectId, ref: "caixa", required: true },
    produtos: [
      {
        produto: {
          type: Schema.Types.ObjectId,
          ref: "produto",
          required: true,
        },
        quantidade: { type: Number, required: true },
        valorUnitario: { type: Number, required: true },
      },
    ],
    totalVenda: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<iVenda>("venda", vendaSchema);
