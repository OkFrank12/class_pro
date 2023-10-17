import mongoose from "mongoose";

const url: string = `mongodb://127.0.0.1:27017/database`;

export const dbConfig = () => {
  mongoose.connect(url).then(() => {
    console.log("Database and Server is connected...!!!");
  });
};
