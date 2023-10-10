import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  updateJobTitle,
  updateJobDesc,
  updateJobLink,
  updateJobStatus,
} from "../../store/slices/addjob";

export default function AddJobForm() {
  const dispatch = useAppDispatch();

  const jobTitle = useAppSelector((state) => state.addJob.jobTitle);
  const jobDesc = useAppSelector((state) => state.addJob.jobDesc);
  const jobLink = useAppSelector((state) => state.addJob.jobLink);
  const jobStatus = useAppSelector((state) => state.addJob.jobStatus);

  return (
    <>
      <form id="add-job-form" className="AddJobForm">
        <div className="JobFormInput">
          <label>Title</label>
          <input
            type="text"
            name="jobTitle"
            placeholder="Title"
            value={jobTitle}
            onChange={(e) => dispatch(updateJobTitle(e.target.value))}
          />
        </div>
        <div className="JobFormInput">
          <label>Description</label>
          <input
            type="text"
            name="jobDesc"
            placeholder="Description"
            value={jobDesc}
            onChange={(e) => dispatch(updateJobDesc(e.target.value))}
          />
        </div>
        <div className="JobFormInput">
          <label>Link</label>
          <input
            type="text"
            name="jobLink"
            placeholder="Link"
            value={jobLink}
            onChange={(e) => dispatch(updateJobLink(e.target.value))}
          />
        </div>
        <div className="JobFormInput">
          <label>Status</label>
          <select
            name="status"
            id="job-status"
            className="JobStatusSelect"
            onChange={(e) => dispatch(updateJobStatus(e.target.value))}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Assessment">Assessment</option>
            <option value="Offer">Offer</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </form>
    </>
  );
}
