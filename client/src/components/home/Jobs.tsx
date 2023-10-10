import React, { useState, useRef, useEffect } from "react";
import JobStatusDropdown from "./JobStatusDropdown";
import { setJobIndex } from "../../store/slices/toggles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { AiTwotoneEdit } from "react-icons/ai";

export default function Jobs() {
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  dropdownRefs.current = [];

  const addToRefs = (element: HTMLDivElement) => {
    if (element && !dropdownRefs.current.includes(element)) {
      dropdownRefs.current.push(element);
    }
  };

  const [jobData, setJobData] = useState([
    {
      date: "Sept 23, 2023",
      title: "Front End",
      desc: "This is the first desc",
      link: "https://company1.com",
      status: "Applied",
    },
    {
      date: "Sept 24, 2023",
      title: "Front End 1",
      desc: "This is the second desc",
      link: "https://company2.com",
      status: "Denied",
    },
    {
      date: "Sept 25, 2023",
      title: "Front End 3",
      desc: "This is the third desc",
      link: "https://company3.com",
      status: "Interview",
    },
  ]);

  const jobDropdownIndex = useAppSelector(
    (state) => state.toggles.jobDropdownIndex
  );

  const dispatch = useAppDispatch();

  const handleJobStatusClick = (index: number) => {
    if (jobDropdownIndex === index) {
      dispatch(setJobIndex(-1));
    } else {
      dispatch(setJobIndex(index));
    }
  };

  const changeJobStatus = (index: number, status: string) => {
    let tempArr = [...jobData];
    tempArr[index].status = status;
    setJobData(tempArr);
    dispatch(setJobIndex(-1));
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
  }, []);

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
                  {job.status}
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
                )}
              </div>
              <AiTwotoneEdit size={24}></AiTwotoneEdit>
            </div>
          </article>
        );
      })}
    </>
  );
}
