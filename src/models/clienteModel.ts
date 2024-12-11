import mongoose, { Schema } from "mongoose";
import iCliente from "../interfaces/iCliente";

const clienteSchema = new Schema<iCliente>({
  nome: { type: String, required: true },
  endereco: {
    rua: { type: String, required: true },
    numero: { type: Number, required: true },
    cep: { type: Number, required: true },
  },
});

export default mongoose.model<iCliente>("cliente", clienteSchema);
