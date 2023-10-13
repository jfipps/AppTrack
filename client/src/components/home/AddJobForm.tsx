import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  updateJobTitle,
  updateJobDesc,
  updateJobLink,
  updateJobStatus,
  updateCompanyName,
} from "../../store/slices/addjob";
import { closeAddJob } from "../../store/slices/toggles";

export default function AddJobForm() {
  const dispatch = useAppDispatch();

  const jobTitle = useAppSelector((state) => state.addJob.jobTitle);
  const jobDesc = useAppSelector((state) => state.addJob.jobDesc);
  const jobLink = useAppSelector((state) => state.addJob.jobLink);
  const jobStatus = useAppSelector((state) => state.addJob.jobStatus);
  const companyName = useAppSelector((state) => state.addJob.companyName);

  const closeButtonHandler = () => {
    dispatch(updateJobLink(""));
    dispatch(updateJobStatus(""));
    dispatch(updateJobTitle(""));
    dispatch(updateJobDesc(""));
    dispatch(closeAddJob());
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const date = new Date();
    console.log(jobTitle, jobDesc, jobLink, jobStatus);
    console.log(
      `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
    );
  };

  return (
    <>
      <div className="CloseButtonSection">
        <AiOutlineClose
          size={26}
          color="white"
          id="close-button"
          onClick={closeButtonHandler}
        ></AiOutlineClose>
      </div>
      <form id="add-job-form" className="AddJobForm" onSubmit={handleSubmit}>
        <div className="JobFormInput">
          <label>Company</label>
          <input
            type="text"
            name="companyName"
            placeholder="Company"
            value={companyName}
            onChange={(e) => dispatch(updateCompanyName(e.target.value))}
          />
        </div>
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
          <textarea
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
            value={jobStatus}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Assessment">Assessment</option>
            <option value="Offer">Offer</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div className="JobFormSubmit">
          <button className="FormSubmit">Submit</button>
        </div>
      </form>
    </>
  );
}
