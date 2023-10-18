import mongoose from "mongoose";

interface IJob extends mongoose.Document {
  email: string;
  jobTitle: string;
  companyName: string;
  jobLink: string;
  jobDesc: string;
  jobStatus: string;
  applicationDate: Date;
}

interface IJobMethods {
  getJob(): {
    email: string;
    jobTitle: string;
    companyName: string;
    jobLink: string;
    jobDesc: string;
    jobStatus: string;
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
    jobLink: {
      type: String,
      required: false,
    },
    jobDesc: {
      type: String,
      required: false,
    },
    jobStatus: {
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
  jobLink: string;
  jobDesc: string;
  jobStatus: string;
  applicationDate: Date;
} {
  const job = this;
  const jobObject = job.toObject();
  return jobObject;
};

export const Jobs = mongoose.model<IJob>("Jobs", jobSchema);
