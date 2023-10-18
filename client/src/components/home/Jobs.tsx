import React, { useState, useRef, useEffect } from "react";
import JobStatusDropdown from "./JobStatusDropdown";
import { setJobIndex } from "../../store/slices/toggles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { AiTwotoneEdit } from "react-icons/ai";

export default function Jobs() {
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

  const [isLoading, setIsLoading] = useState(false);

  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  dropdownRefs.current = [];

  const addToRefs = (element: HTMLDivElement) => {
    console.log("Adding refs");
    if (element && !dropdownRefs.current.includes(element)) {
      dropdownRefs.current.push(element);
    }
  };

  const [jobData, setJobData] = useState<iJobs[]>([]);

  // const jobDropdownIndex = useAppSelector(
  //   (state) => state.toggles.jobDropdownIndex
  // );

  const dispatch = useAppDispatch();

  const handleJobStatusClick = (
    _id: String,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsLoading(false);
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
          getUserJobs();
        });
      });
    } catch (e) {
      console.log(e);
      setIsLoading(true);
    }
  };

  // const changeJobStatus = (index: number, status: string) => {
  //   let tempArr = [...jobData];
  //   console.log(tempArr[index].jobStatus);
  //   dispatch(setJobIndex(-1));
  // };

  const getUserJobs = () => {
    try {
      fetch("http://localhost:5001/user/jobs", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((data) => {
          setJobData(data);
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let clickHandler = (event: MouseEvent) => {
      if (
        dropdownRefs.current[0] &&
        !dropdownRefs.current[0].contains(event.target as Node)
      ) {
        dispatch(setJobIndex(-1));
      }
    };
    document.addEventListener("mousedown", clickHandler);
    getUserJobs();
  }, []);

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
                <select
                  name="job-status"
                  id="job-status"
                  className="JobStatusSelect"
                  onChange={(e) => handleJobStatusClick(job._id, e)}
                  defaultValue={job.jobStatus.toString()}
                  value={job.jobStatus.toString()}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Assessment">Assessment</option>
                  <option value="Offer">Offer</option>
                  <option value="Closed">Closed</option>
                  <option value="Rejected">Rejected</option>
                </select>
                {/* <button
                  onClick={() => handleJobStatusClick(index)}
                  className="JobStatusDropdownButton"
                >
                  {job.jobStatus}
                </button>
                {jobDropdownIndex === index ? (
                  <div ref={addToRefs}>
                    <JobStatusDropdown
                      changeJobStatus={changeJobStatus}
                      index={index}
                    ></JobStatusDropdown>
                  </div>
                ) : (
                  ""
                )} */}
              </div>
              <AiTwotoneEdit size={24}></AiTwotoneEdit>
            </div>
          </article>
        );
      })}
    </>
  );
}
