import React, { useState, useRef, useEffect } from "react";
import { closeEditJob, openEditJob } from "../../store/slices/toggles";
import {
  updateCompanyName,
  updateJobTitle,
  updateJobDesc,
  updateJobLink,
  updateJobStatus,
  updateJobID,
} from "../../store/slices/editjob";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { AiTwotoneEdit } from "react-icons/ai";

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
}

export default function Jobs({ jobData, getUserJobs }: Props) {
  const editJobOpen = useAppSelector((state) => state.toggles.editJobOpen);

  const dispatch = useAppDispatch();

  const handleEditJobClick = (job: iJobs) => {
    dispatch(updateCompanyName(job.companyName.toString()));
    dispatch(updateJobTitle(job.jobTitle.toString()));
    dispatch(updateJobStatus(job.jobStatus.toString()));
    dispatch(updateJobLink(job.jobLink.toString()));
    dispatch(updateJobDesc(job.jobDesc.toString()));
    dispatch(updateJobID(job._id.toString()));
    if (editJobOpen) {
      dispatch(closeEditJob());
    } else {
      dispatch(openEditJob());
    }
  };

  const handleJobStatusClick = (
    _id: String,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      const body = {
        jobID: _id,
        newStatus: e.target.value,
      };
      fetch("http://localhost:5001/UpdateAppStatus", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => {
        res.json().then((data) => {
          console.log(data);
          getUserJobs();
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {jobData.map((job, index) => {
        return (
          <article key={index} className="Job">
            <div className="JobInfo">
              <span id="date">
                {job.applicationDate.toString().split("T")[0]}
              </span>
              <span id="company">{job.companyName}</span>
              <span id="title">{job.jobTitle}</span>
              <span id="desc">{job.jobDesc}</span>
              <a id="link">{job.jobLink}</a>
            </div>
            <div className="JobStatus">
              <div className="StatusContainer">
                {/* <select
                  name="job-status"
                  id="job-status"
                  className={"JobStatusSelect " + job.jobStatus.toString()}
                  onChange={(e) => handleJobStatusClick(job._id, e)}
                  defaultValue={job.jobStatus.toString()}
                  value={job.jobStatus.toString()}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Assessment">Assessment</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select> */}
                <div className={"JobStatusSelect " + job.jobStatus.toString()}>
                  {job.jobStatus.toString()}
                </div>
              </div>
              <AiTwotoneEdit
                size={24}
                onClick={() => {
                  handleEditJobClick(job);
                }}
              ></AiTwotoneEdit>
            </div>
          </article>
        );
      })}
    </>
  );
}
