import mongoose, { Schema } from "mongoose";
const funcionarioSchema = new Schema({
    nome: { type: String, required: true },
    cargo: { type: String, required: true },
    salario: { type: Number, required: true },
    endereco: {
        rua: { type: String, required: true },
        numero: { type: Number, required: true },
        cep: { type: Number, required: true },
    },
    dataAdmissao: { type: Date, required: true },
}, { timestamps: true });
export default mongoose.model("funcionario", funcionarioSchema);
