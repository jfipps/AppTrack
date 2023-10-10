import React, { useRef } from "react";
import JobList from "./JobList";
import JobControls from "./JobControls";

export default function HomeContent() {
  return (
    <section className="HomeContent">
      <div className="SidebarFilters">
        <div className="Filter">{/* <form action=""></form> */}</div>
        <div className="Filter">Date</div>
        <div className="Filter">Status</div>
      </div>
      <div className="JobContainer">
        <JobControls></JobControls>
        <JobList></JobList>
      </div>
    </section>
  );
}
