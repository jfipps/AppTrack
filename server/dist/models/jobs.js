"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jobs = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jobSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    jobPostLink: {
        type: String,
        required: false,
    },
    applicationStatus: {
        type: String,
        required: true,
    },
    applicationDate: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});
jobSchema.methods.getJob = function () {
    const job = this;
    const jobObject = job.toObject();
    return jobObject;
};
exports.Jobs = mongoose_1.default.model("Jobs", jobSchema);
