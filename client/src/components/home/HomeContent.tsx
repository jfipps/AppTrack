import React, { useEffect, useRef } from "react";
import JobList from "./JobList";
import JobControls from "./JobControls";

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
  setDateSort: React.Dispatch<React.SetStateAction<string>>;
  dateSort: string;
}

export default function HomeContent({
  jobData,
  getUserJobs,
  setDateSort,
  dateSort,
}: Props) {
  return (
    <section className="HomeContent">
      <div className="SidebarFilters">
        <div className="Filter">{/* <form action=""></form> */}</div>
        <div className="Filter">Date</div>
        <div className="Filter">Status</div>
      </div>
      <div className="JobContainer">
        <JobControls
          setDateSort={setDateSort}
          dateSort={dateSort}
        ></JobControls>
        <JobList jobData={jobData} getUserJobs={getUserJobs}></JobList>
      </div>
    </section>
  );
}
