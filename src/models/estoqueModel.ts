import mongoose, { Schema } from "mongoose";
import iEstoqueDocument from "../interfaces/iEstoqueDocument.js"

const estoqueSchema = new Schema<iEstoqueDocument>({
    produtos: [{
        produto: { type: Schema.Types.ObjectId, ref: "produto", required: true },
        quantidade: { type: Number, required: true, min: [0, 'Quantidade não pode ser negativa.'] },
    }],
});

export default mongoose.model<iEstoqueDocument>("estoque", estoqueSchema);
