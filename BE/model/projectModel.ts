import mongoose from "mongoose";

interface iProject {
  url: string;
  title: string;
  task: string;
  motivation: string;
  avatar: string;
  avatarID: string;

  comments: Array<string>;
  user: {};
}

interface iProjectData extends iProject, mongoose.Document {}

const projectModel = new mongoose.Schema<iProjectData>(
  {
    url: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    motivation: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comments",
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iProjectData>("projects", projectModel);
