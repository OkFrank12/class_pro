import express from "express";
import {
  createProject,
  deleteProject,
  readProject,
  viewAllProjects,
} from "../controller/projectController";

const router = express.Router();

router.route("/:userID/create").post(createProject);
router.route("/all-project").get(viewAllProjects);
router.route("/:userID/view").get(readProject);
router.route("/:projectID/delete-project").delete(deleteProject);

export default router;
