import { statusCode } from "../errors/statusCode";
import userModel from "../model/userModel";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendMail } from "../utils/email";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const value = crypto.randomBytes(10).toString("hex");

    const user = await userModel.create({
      email,
      password: hashed,
      token: value,
    });

    sendMail(user).then(() => {
      console.log("Mail sent...!");
    });

    return res.status(statusCode.OK).json({
      message: "Registered user",
      data: user,
    });
  } catch (error: any) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "error registering user",
      data: error.message,
    });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);
    if (user) {
      if (user.token !== "") {
        await userModel.findByIdAndUpdate(
          user._id,
          {
            token: "",
            verified: true,
          },
          { new: true }
        );
        return res.status(statusCode.CREATED).json({
          message: "verified user",
        });
      } else {
        return res.status(statusCode.BAD_REQUEST).json({
          message: "user haven't been verified",
        });
      }
    } else {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "user does not exist",
      });
    }
  } catch (error: any) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "error verifying user",
      data: error.message,
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        if (user.verified && user.token === "") {
          const token = jwt.sign(
            { id: user?._id, email: user?.email },
            "token"
          );

          return res.status(statusCode.OK).json({
            message: `Welcome Back`,
            data: token,
          });
        } else {
          return res.status(statusCode.BAD_REQUEST).json({
            message: "user haven't been verified",
          });
        }
      } else {
        return res.status(statusCode.BAD_REQUEST).json({
          message: "Password is incorrect",
        });
      }
    } else {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "User is not found",
      });
    }
  } catch (error: any) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "error signing in user",
      data: error.message,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;

    await userModel.findByIdAndDelete(userID);

    return res.status(statusCode.CREATED).json({
      message: "Deleted",
    });
  } catch (error: any) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "error deleting user",
      data: error.message,
    });
  }
};

export const viewAllUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();

    return res.status(statusCode.OK).json({
      message: "viewing all user",
      data: user,
    });
  } catch (error: any) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "error viewing all users",
      data: error.message,
    });
  }
};

export const viewOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID);

    return res.status(statusCode.OK).json({
      message: "viewing one user",
      data: user,
    });
  } catch (error: any) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "error viewing one user",
      data: error.message,
    });
  }
};
