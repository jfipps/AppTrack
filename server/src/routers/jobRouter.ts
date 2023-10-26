const { sessionCheck } = require("../middleware/auth");
import express from "express";
import { Request, Response, NextFunction } from "express";
import { Jobs } from "../models/jobs";
require("../db/mongoose");
export const router = express.Router();

// get user's jobs sorted by newest first
router.get(
  "/user/jobs/Newest",
  sessionCheck,
  async (req: Request, res: Response) => {
    try {
      const data = await Jobs.find({
        email: { $eq: req.session.user?.email },
      }).sort({ createdAt: -1 });
      console.log("Jobs found");
      res.status(200).send(data);
    } catch (err) {
      res.status(401).send(err);
    }
  }
);

// get user's jobs sorted by oldest first
router.get(
  "/user/jobs/Oldest",
  sessionCheck,
  async (req: Request, res: Response) => {
    try {
      const data = await Jobs.find({
        email: { $eq: req.session.user?.email },
      }).sort({ createdAt: 1 });
      console.log("Jobs found");
      res.status(200).send(data);
    } catch (err) {
      res.status(401).send(err);
    }
  }
);

// add job linked to currently logged in user's account
router.post("/CreateJob", sessionCheck, async (req: Request, res: Response) => {
  req.body.email = req.session.user?.email;
  console.log("Body");
  console.log(req.body);
  const job = new Jobs(req.body);
  try {
    await job.save();
    res.status(200).send(job);
  } catch (e) {
    res.status(401).send(e);
  }
});

//update application status

router.post(
  "/UpdateAppStatus",
  sessionCheck,
  async (req: Request, res: Response) => {
    console.log(req.body);
    const currJob = await Jobs.findOneAndUpdate(
      { _id: req.body.jobID },
      { jobStatus: req.body.newStatus }
    );
    try {
      currJob?.save();
      console.log(currJob);
      res.status(200).send({ message: "Job Updated" });
    } catch (e) {
      res.status(401).send(e);
    }
  }
);

// update job application
router.post("/EditJob", sessionCheck, async (req: Request, res: Response) => {
  console.log(req.body);
  const currJob = await Jobs.findOneAndUpdate(
    { _id: req.body.jobID },
    {
      jobStatus: req.body.jobStatus,
      jobLink: req.body.jobLink,
      jobDesc: req.body.jobDesc,
      jobTitle: req.body.jobTitle,
      companyName: req.body.companyName,
    }
  );
  try {
    currJob?.save();
    console.log(currJob);
    res.status(200).send({ message: "Job Updated" });
  } catch (e) {
    res.status(401).send(e);
  }
});
