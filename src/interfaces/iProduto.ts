import { Types } from "mongoose";
import iFornecedor from "../interfaces/iFornecedor.js";

interface iProduto {
  nome: string;
  valorDeCompra: number;
  valorDeVenda: number;
  fornecedor: Types.ObjectId | iFornecedor;
}

export default iProduto;
