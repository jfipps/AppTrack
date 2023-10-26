"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const { sessionCheck } = require("../middleware/auth");
const express_1 = __importDefault(require("express"));
const jobs_1 = require("../models/jobs");
require("../db/mongoose");
exports.router = express_1.default.Router();
// get user's jobs sorted by newest first
exports.router.get("/user/jobs/Newest", sessionCheck, async (req, res) => {
    var _a;
    try {
        const data = await jobs_1.Jobs.find({
            email: { $eq: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.email },
        }).sort({ createdAt: -1 });
        console.log("Jobs found");
        res.status(200).send(data);
    }
    catch (err) {
        res.status(401).send(err);
    }
});
// get user's jobs sorted by oldest first
exports.router.get("/user/jobs/Oldest", sessionCheck, async (req, res) => {
    var _a;
    try {
        const data = await jobs_1.Jobs.find({
            email: { $eq: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.email },
        }).sort({ createdAt: 1 });
        console.log("Jobs found");
        res.status(200).send(data);
    }
    catch (err) {
        res.status(401).send(err);
    }
});
// add job linked to currently logged in user's account
exports.router.post("/CreateJob", sessionCheck, async (req, res) => {
    var _a;
    req.body.email = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.email;
    console.log("Body");
    console.log(req.body);
    const job = new jobs_1.Jobs(req.body);
    try {
        await job.save();
        res.status(200).send(job);
    }
    catch (e) {
        res.status(401).send(e);
    }
});
//update application status
exports.router.post("/UpdateAppStatus", sessionCheck, async (req, res) => {
    console.log(req.body);
    const currJob = await jobs_1.Jobs.findOneAndUpdate({ _id: req.body.jobID }, { jobStatus: req.body.newStatus });
    try {
        currJob === null || currJob === void 0 ? void 0 : currJob.save();
        console.log(currJob);
        res.status(200).send({ message: "Job Updated" });
    }
    catch (e) {
        res.status(401).send(e);
    }
});
// update job application
exports.router.post("/EditJob", sessionCheck, async (req, res) => {
    console.log(req.body);
    const currJob = await jobs_1.Jobs.findOneAndUpdate({ _id: req.body.jobID }, {
        jobStatus: req.body.jobStatus,
        jobLink: req.body.jobLink,
        jobDesc: req.body.jobDesc,
        jobTitle: req.body.jobTitle,
        companyName: req.body.companyName,
    });
    try {
        currJob === null || currJob === void 0 ? void 0 : currJob.save();
        console.log(currJob);
        res.status(200).send({ message: "Job Updated" });
    }
    catch (e) {
        res.status(401).send(e);
    }
});
