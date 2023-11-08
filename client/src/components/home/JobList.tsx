import React from "react";
import Jobs from "./Jobs";

interface iJobs {
  applicationDate: Date;
  applicationStatus: String;
  email: String;
  jobDesc: String;
  jobLink: String;
  jobTitle: String;
  jobStatus: String;
  companyName: String;
  _id: String;
}

interface Props {
  jobData: iJobs[];
  getUserJobs: () => void;
  loading: boolean;
}

export default function JobList({ jobData, getUserJobs, loading }: Props) {
  return (
    <>
      {loading ? (
        <div className="lds-dual-ring loader"></div>
      ) : (
        <div className="JobList">
          <Jobs jobData={jobData} getUserJobs={getUserJobs}></Jobs>
        </div>
      )}
    </>
  );
}
