import mongoose, { Schema } from "mongoose";
import statusCaixa from "../enum/enumCaixa.js";
const caixaSchema = new Schema(
  {
    id_Supermercado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supermercado",
      required: true,
    },
    saldo: {
      type: Number,
      required: true,
      min: [0, "O saldo não pode ser negativo."],
    },
    id_Funcionario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "funcionario",
      required: false,
    },
    id_Cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cliente",
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(statusCaixa),
      required: true,
      default: statusCaixa.ativo,
    },
  },
  { timestamps: true },
);
export default mongoose.model("caixa", caixaSchema);
