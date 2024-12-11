import mongoose, { Schema } from "mongoose";
const estoqueSchema = new Schema({
  produtos: [
    {
      produto: { type: Schema.Types.ObjectId, ref: "produto", required: true },
      quantidade: {
        type: Number,
        required: true,
        min: [0, "Quantidade não pode ser negativa."],
      },
    },
  ],
});
export default mongoose.model("estoque", estoqueSchema);
