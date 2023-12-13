import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  updateJobTitle,
  updateJobDesc,
  updateJobLink,
  updateJobStatus,
  updateCompanyName,
  updateJobID,
} from "../../store/slices/editjob";
import {
  closeEditJob,
  updateEditJobFlag,
  updateDeletedJobFlag,
} from "../../store/slices/toggles";

interface Props {
  getUserJobs: () => void;
}

export default function EditJobForm({ getUserJobs }: Props) {
  const dispatch = useAppDispatch();

  const jobTitle = useAppSelector((state) => state.editJob.jobTitle);
  const jobDesc = useAppSelector((state) => state.editJob.jobDesc);
  const jobLink = useAppSelector((state) => state.editJob.jobLink);
  const jobStatus = useAppSelector((state) => state.editJob.jobStatus);
  const companyName = useAppSelector((state) => state.editJob.companyName);
  const jobID = useAppSelector((state) => state.editJob.jobID);

  const closeButtonHandler = () => {
    dispatch(updateJobLink(""));
    dispatch(updateJobStatus(""));
    dispatch(updateJobTitle(""));
    dispatch(updateJobDesc(""));
    dispatch(updateCompanyName(""));
    dispatch(updateJobID(""));
    dispatch(closeEditJob());
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const body = {
        jobTitle: jobTitle,
        jobDesc: jobDesc,
        jobLink: jobLink,
        jobStatus: jobStatus,
        companyName: companyName,
        jobID: jobID,
      };

      fetch("http://localhost:5001/EditJob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      }).then((res) => {
        res.json().then((data) => {
          console.log(data);
          dispatch(updateEditJobFlag(true));
          getUserJobs();
        });
      });
      dispatch(updateJobLink(""));
      dispatch(updateJobStatus(""));
      dispatch(updateJobTitle(""));
      dispatch(updateJobDesc(""));
      dispatch(updateCompanyName(""));
      dispatch(closeEditJob());
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = () => {
    try {
      const body = {
        jobID: jobID,
      };
      fetch("http://localhost:5001/DeleteJob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      }).then((res) => {
        res.json().then((data) => {
          dispatch(updateDeletedJobFlag(true));
          getUserJobs();
        });
      });
      dispatch(updateJobLink(""));
      dispatch(updateJobStatus(""));
      dispatch(updateJobTitle(""));
      dispatch(updateJobDesc(""));
      dispatch(updateCompanyName(""));
      dispatch(closeEditJob());
    } catch (e) {
      console.log(e);
    }
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
      <form id="edit-job-form" className="EditJobForm" onSubmit={handleSubmit}>
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
            defaultValue="Applied"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Assessment">Assessment</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="JobFormSubmit">
          <button
            id="delete"
            className="FormSubmit"
            onClick={() => handleDelete()}
          >
            Delete Job
          </button>
          <button className="FormSubmit" id="edit">
            Edit Job
          </button>
        </div>
      </form>
    </>
  );
}
