import iendereco from "./iEndereco";
import { Document } from "mongoose";

interface iFuncionario extends Document{
    nome: string;
    cargo: string;
    salario: number
    endereco: iendereco;
    dataAdmissao: Date;
}

export default iFuncionario