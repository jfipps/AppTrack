import React from "react";
import "../../css/home.scss";

type JobStatusPropsType = {
  changeJobStatus: (index: number, status: string) => void;
  index: number;
};

export default function JobStatusDropdown({
  changeJobStatus,
  index,
}: JobStatusPropsType) {
  return (
    <ul className="JobStatusDropdown">
      <li
        className="StatusItem"
        onClick={() => changeJobStatus(index, "Applied")}
      >
        Applied
      </li>
      <li
        className="StatusItem"
        onClick={() => changeJobStatus(index, "Closed")}
      >
        Closed
      </li>
      <li
        className="StatusItem"
        onClick={() => changeJobStatus(index, "Assessment")}
      >
        Assessment
      </li>
      <li
        className="StatusItem"
        onClick={() => changeJobStatus(index, "Interview")}
      >
        Interview
      </li>
      <li
        className="StatusItem"
        onClick={() => changeJobStatus(index, "Offer")}
      >
        Offer
      </li>
      <li
        className="StatusItem"
        onClick={() => changeJobStatus(index, "Applied")}
      >
        Rejected
      </li>
    </ul>
  );
}
