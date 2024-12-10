import mongoose, { Schema } from "mongoose";
import iSupermercado from "../interfaces/iSupermercado.js";


const iSupermercadoSchema = new Schema<iSupermercado>({
    nome: { type: String, required: true},
    endereco: {
        rua: { type: String, required: true},
        numero: { type: Number, required: true},
        cep: { type: Number, required: true}
    },
    funcionarios: [ { type: mongoose.Schema.Types.ObjectId, ref: "funcionario"}],    
    estoque: { type: mongoose.Schema.Types.ObjectId, ref: "estoque", required: true},    
}, {timestamps: true})

export default mongoose.model<iSupermercado>("supermercado", iSupermercadoSchema)