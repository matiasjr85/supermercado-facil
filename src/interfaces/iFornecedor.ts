import iendereco from "./iEndereco.js";
import { Document } from "mongoose";

interface iFornecedor extends Document {
    nomeEmpresa: string;
    endereco: iendereco
}

export default iFornecedor;