import mongoose, { Schema } from "mongoose";
const clienteSchema = new Schema({
    nome: { type: String, required: true },
    endereco: {
        rua: { type: String, required: true },
        numero: { type: Number, required: true },
        cep: { type: Number, required: true }
    }
});
export default mongoose.model("cliente", clienteSchema);
