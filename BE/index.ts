import express, { Application } from "express";
import { dbConfig } from "./config/database";
import { appConfig } from "./app";

const port: number = 1000;
const app: Application = express();
appConfig(app);

const server = app.listen(port, () => {
  dbConfig();
});

process.on("uncaughtException", (error: any) => {
  console.log("uncaughtException: ", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("'unhandledRejection: ", reason);
  server.close(() => {
    process.exit(1);
  });
});
