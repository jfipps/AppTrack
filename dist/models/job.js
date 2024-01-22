"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jobSchema = new mongoose_1.default.Schema({
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
