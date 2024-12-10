import iendereco from "./iEndereco.js";
import mongoose, { Document, Types } from "mongoose";

interface iSupermercado extends Document {
    nome: string;
    endereco: iendereco;
    funcionarios: Types.ObjectId[];    
    estoque: Types.ObjectId;    
}


export default iSupermercado;