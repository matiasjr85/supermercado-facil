import mongoose, { Connection } from "mongoose";

async function dbConnection(): Promise<Connection> {
  mongoose.connect(
    "mongodb+srv://Edmilson:1234@cluster0.d90pb.mongodb.net/FranquiaDeSupermercados",
  );

  return mongoose.connection;
}

export default dbConnection;
