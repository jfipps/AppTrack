import React from "react";
import "../../css/home.scss";

export default function JobStatusDropdown() {
  return (
    <ul className="JobStatusDropdown">
      <li className="StatusItem">Applied</li>
      <li className="StatusItem">Closed</li>
      <li className="StatusItem">Assessment</li>
      <li className="StatusItem">Interview</li>
      <li className="StatusItem">Offer</li>
      <li className="StatusItem">Rejected</li>
    </ul>
  );
}
