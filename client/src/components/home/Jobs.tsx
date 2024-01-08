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
  jobLink: string;
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

  const darkModeEnabled = useAppSelector(
    (state) => state.toggles.darkModeEnabled
  );

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

  return (
    <>
      {jobData.map((job, index) => {
        return (
          <article
            key={index}
            className={darkModeEnabled ? "Job Job-UI-Dark" : "Job Job-UI-Light"}
          >
            <div className="JobInfo">
              <span id="date">
                {job.applicationDate.toString().split("T")[0]}
              </span>
              <span id="company">{job.companyName}</span>
              <span id="title">{job.jobTitle}</span>
              <span id="desc">{job.jobDesc}</span>
              <a id="link" href={job.jobLink} target="_blank">
                {job.jobLink}
              </a>
            </div>
            <div className="JobStatus">
              <div className="StatusContainer">
                <div className={"JobStatusSelect " + job.jobStatus.toString()}>
                  {job.jobStatus.toString()}
                </div>
              </div>
              <AiTwotoneEdit
                size={24}
                onClick={() => {
                  handleEditJobClick(job);
                }}
                className="EditJobButton"
              ></AiTwotoneEdit>
            </div>
          </article>
        );
      })}
    </>
  );
}
