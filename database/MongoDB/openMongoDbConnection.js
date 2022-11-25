import mongoose from "mongoose";

export const openMongoDbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("Can't connect to the database");
  }
};
