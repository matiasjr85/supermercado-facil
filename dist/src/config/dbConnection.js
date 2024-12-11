import mongoose from "mongoose";
async function dbConnection() {
  mongoose.connect(
    "mongodb+srv://Edmilson:1234@cluster0.d90pb.mongodb.net/FranquiaDeSupermercados",
  );
  return mongoose.connection;
}
export default dbConnection;
