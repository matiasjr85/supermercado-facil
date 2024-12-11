import { Types } from "mongoose";
import statusCaixa from "../enum/enumCaixa.js";

interface iCaixa {
  id_Supermercado: Types.ObjectId;
  saldo: number;
  id_Funcionario: Types.ObjectId;
  id_Cliente: Types.ObjectId;
  status: statusCaixa;
}

export default iCaixa;
