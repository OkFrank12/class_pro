import { Request, Response } from "express";
import { statusCode } from "../errors/statusCode";
import userModel from "../model/userModel";
import projectModel from "../model/projectModel";
import mongoose from "mongoose";

export const createProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;
    const { title, task, motivation, url } = req.body;

    const user: any = await userModel.findById(userID);

    if (user) {
      const project = await projectModel.create({
        title,
        task,
        motivation,
        url,
      });

      user.projects.push(new mongoose.Types.ObjectId(project?._id));
      user.save();

      return res.status(statusCode.CREATED).json({
        message: "project created",
        data: project,
      });
    } else {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "user doesn't exist",
      });
    }
  } catch (error: any) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "error creating project",
      data: error.message,
    });
  }
};

export const readProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID).populate({
      path: "projects",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res.status(statusCode.OK).json({
      message: "Viewing User's Projects",
      data: user,
    });
  } catch (error: any) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "error reading project",
      data: error.message,
    });
  }
};

export const viewAllProjects = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const project = await projectModel.find();

    return res.status(statusCode.OK).json({
      message: "view all projects",
      data: project,
    });
  } catch (error: any) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "error viewing all projects",
      data: error.message,
    });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { projectID } = req.params;

    await projectModel.findByIdAndDelete(projectID);

    return res.status(statusCode.OK).json({
      message: "Deleted project",
    });
  } catch (error: any) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: "error deleting projects",
      data: error.message,
    });
  }
};
