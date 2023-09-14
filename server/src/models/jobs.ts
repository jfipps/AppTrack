import mongoose from "mongoose";

interface IJob extends mongoose.Document {
  username: string;
  jobTitle: string;
  companyName: string;
  jobPostLink: string;
  applicationStatus: string;
  applicationDate: Date;
}

interface IJobMethods {
  getJob(): {
    username: string;
    jobTitle: string;
    companyName: string;
    jobPostLink: string;
    applicationStatus: string;
    applicationDate: Date;
  };
}

const jobSchema = new mongoose.Schema<IJob, IJobMethods>(
  {
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
  },
  {
    timestamps: true,
  }
);

jobSchema.methods.getJob = function (): {
  username: string;
  jobTitle: string;
  companyName: string;
  jobPostLink: string;
  applicationStatus: string;
  applicationDate: Date;
} {
  const job = this;
  const jobObject = job.toObject();
  return jobObject;
};

export const Jobs = mongoose.model<IJob>("Jobs", jobSchema);
