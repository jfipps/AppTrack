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
    // <ul className="JobStatusDropdown">
    //   <li
    //     className="StatusItem"
    //     onClick={() => changeJobStatus(index, "Applied")}
    //   >
    //     Applied
    //   </li>
    //   <li
    //     className="StatusItem"
    //     onClick={() => changeJobStatus(index, "Closed")}
    //   >
    //     Closed
    //   </li>
    //   <li
    //     className="StatusItem"
    //     onClick={() => changeJobStatus(index, "Assessment")}
    //   >
    //     Assessment
    //   </li>
    //   <li
    //     className="StatusItem"
    //     onClick={() => changeJobStatus(index, "Interview")}
    //   >
    //     Interview
    //   </li>
    //   <li
    //     className="StatusItem"
    //     onClick={() => changeJobStatus(index, "Offer")}
    //   >
    //     Offer
    //   </li>
    //   <li
    //     className="StatusItem"
    //     onClick={() => changeJobStatus(index, "Rejected")}
    //   >
    //     Rejected
    //   </li>
    // </ul>
    <select name="job-status" id="job-status" className="JobStatusDropdown">
      <option value="Applied">Applied</option>
      <option value="Interview">Interview</option>
      <option value="Assessment">Assessment</option>
      <option value="Offer">Offer</option>
    </select>
  );
}
