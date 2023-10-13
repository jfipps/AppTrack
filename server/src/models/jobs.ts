import mongoose from "mongoose";

interface IJob extends mongoose.Document {
  email: string;
  jobTitle: string;
  companyName: string;
  jobPostLink: string;
  jobPostDesc: string;
  applicationStatus: string;
  applicationDate: Date;
}

interface IJobMethods {
  getJob(): {
    email: string;
    jobTitle: string;
    companyName: string;
    jobPostLink: string;
    jobPostDesc: string;
    applicationStatus: string;
    applicationDate: Date;
  };
}

const jobSchema = new mongoose.Schema<IJob, IJobMethods>(
  {
    email: {
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
    jobPostDesc: {
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
  email: string;
  jobTitle: string;
  companyName: string;
  jobPostLink: string;
  jobPostDesc: string;
  applicationStatus: string;
  applicationDate: Date;
} {
  const job = this;
  const jobObject = job.toObject();
  return jobObject;
};

export const Jobs = mongoose.model<IJob>("Jobs", jobSchema);
