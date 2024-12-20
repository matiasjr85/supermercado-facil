import { Document, Types } from "mongoose";

interface iProdutoVenda {
  produto: Types.ObjectId;
  quantidade: number;
  valorUnitario: number;
}

interface iVenda extends Document {
  cliente: Types.ObjectId;
  caixa: Types.ObjectId;
  produtos: iProdutoVenda[];
  totalVenda: number;
  createdAt: Date;
  updatedAt: Date;
}

export default iVenda
