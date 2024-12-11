import { Types } from "mongoose";

interface iProdutoEstoque {
  produto: Types.ObjectId;
  quantidade: number;
}

interface iEstoque {
  produtos: iProdutoEstoque[];
}

export default iEstoque;
