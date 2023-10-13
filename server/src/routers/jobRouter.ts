const { sessionCheck } = require("../middleware/auth");
import express from "express";
import { Request, Response, NextFunction } from "express";
import { Jobs } from "../models/jobs";
require("../db/mongoose");
export const router = express.Router();

// get user's jobs
router.get("/user/jobs", sessionCheck, async (req: Request, res: Response) => {
  try {
    const data = await Jobs.find({ email: { $eq: req.session.user?.email } });
    console.log("Jobs found");
    res.status(200).send(data);
  } catch (err) {
    res.status(401).send(err);
  }
});

// add job linked to currently logged in user's account
router.post("/CreateJob", sessionCheck, async (req: Request, res: Response) => {
  req.body.email = req.session.user?.email;
  const job = new Jobs(req.body);
  try {
    await job.save();
    res.status(200).send(job);
  } catch (e) {
    res.status(401).send(e);
  }
});

// update job application status
router.post(
  "/UpdateAppStatus",
  sessionCheck,
  async (req: Request, res: Response) => {
    const currJob = await Jobs.findOneAndUpdate(
      { _id: req.body.jobID },
      { applicationStatus: req.body.newStatus }
    );
    try {
      currJob?.save();
      res.status(200).send({ message: "Job Status Updated" });
    } catch (e) {
      res.status(401).send(e);
    }
  }
);
