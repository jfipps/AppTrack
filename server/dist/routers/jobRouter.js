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
// get all jobs (dev)
exports.router.get("/jobs", async (req, res) => {
    try {
        const data = await jobs_1.Jobs.find({});
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
    req.body.username = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.email;
    const job = new jobs_1.Jobs(req.body);
    try {
        await job.save();
        res.status(200).send(job);
    }
    catch (e) {
        res.status(401).send(e);
    }
});
// update job application status
exports.router.post("/UpdateAppStatus", sessionCheck, async (req, res) => {
    const currJob = await jobs_1.Jobs.findOneAndUpdate({ _id: req.body.jobID }, { applicationStatus: req.body.newStatus });
    try {
        currJob === null || currJob === void 0 ? void 0 : currJob.save();
        res.status(200).send({ message: "Job Status Updated" });
    }
    catch (e) {
        res.status(401).send(e);
    }
});