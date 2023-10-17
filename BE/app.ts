import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmets from "helmet";
import { statusCode } from "./errors/statusCode";
import auth from "./router/authRouter";
import project from "./router/projectRouter";

export const appConfig = (app: Application) => {
  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(helmets());

  app.use("/api", auth);
  app.use("/api", project);

  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(statusCode.OK).json({
        message: "Default Route connected",
      });
    } catch (error: any) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "error on Default Route",
        data: error.message,
      });
    }
  });
};