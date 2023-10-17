import express from "express";
import {
  deleteUser,
  registerUser,
  signInUser,
  verifyUser,
  viewAllUser,
  viewOneUser,
} from "../controller/authController";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/:userID/verify").get(verifyUser);
router.route("/sign-in").post(signInUser);
router.route("/:userID/delete").delete(deleteUser);
router.route("/all").get(viewAllUser);
router.route("/:userID/one").get(viewOneUser);

export default router;
