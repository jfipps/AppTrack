import React from "react";
import JobStatusDropdown from "./JobStatusDropdown";
import { AiTwotoneEdit } from "react-icons/ai";

export default function Jobs() {
  const handleJobStatusClick = (index: number) => {
    console.log(index);
  };

  const jobData = [
    {
      date: "Sept 23, 2023",
      title: "Front End",
      desc: "This is the first desc",
      link: "https://company1.com",
    },
    {
      date: "Sept 24, 2023",
      title: "Front End 1",
      desc: "This is the second desc",
      link: "https://company2.com",
    },
    {
      date: "Sept 25, 2023",
      title: "Front End 3",
      desc: "This is the third desc",
      link: "https://company3.com",
    },
  ];

  return (
    <>
      {jobData.map((job, index) => {
        return (
          <article key={index} className="Job">
            <div className="JobInfo">
              <span id="date">{job.date}</span>
              <span id="title">{job.title}</span>
              <span id="desc">{job.desc}</span>
              <a id="link">{job.link}</a>
            </div>
            <div className="JobStatus">
              <div className="StatusContainer">
                <button
                  onClick={() => handleJobStatusClick(index)}
                  className="JobStatusDropdownButton"
                >
                  Applied
                </button>
                {/* <JobStatusDropdown></JobStatusDropdown> */}
              </div>
              <AiTwotoneEdit size={24}></AiTwotoneEdit>
            </div>
          </article>
        );
      })}
    </>
  );
}
