import mongoose, { Schema } from "mongoose";
import iFornecedor from "../interfaces/iFornecedor.js";

const fornecedorSchema = new Schema<iFornecedor>({
  nomeEmpresa: { type: String, required: true },
  endereco: {
    rua: { type: String, required: true },
    numero: { type: Number, required: true },
    cep: { type: Number, required: true },
  },
});

export default mongoose.model<iFornecedor>("fornecedor", fornecedorSchema);
