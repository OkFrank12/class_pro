import mongoose from "mongoose";

interface iUser {
  email: string;
  password: string;
  verified: boolean;
  fullName: string;
  token: string;
  avatar: string;
  avatarID: string;

  follower: Array<string>;
  following: Array<string>;
  projects: Array<string>;
}

interface iUserData extends iUser, mongoose.Document {}

const userModel = new mongoose.Schema<iUserData>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    fullName: {
      type: String,
    },
    password: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    follower: [
      {
        type: mongoose.Types.ObjectId,
        ref: "followers",
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "followings",
      },
    ],
    projects: [
      {
        type: mongoose.Types.ObjectId,
        ref: "projects",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iUserData>("users", userModel);
