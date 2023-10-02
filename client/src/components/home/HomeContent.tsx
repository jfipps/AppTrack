import React from "react";
import JobList from "./JobList";

export default function HomeContent() {
  return (
    <section className="HomeContent">
      <div className="SidebarFilters">
        <div className="Filter">{/* <form action=""></form> */}</div>
        <div className="Filter">Date</div>
        <div className="Filter">Status</div>
      </div>
      <div className="JobContainer">
        <div className="AddJob"></div>
        <JobList></JobList>
      </div>
    </section>
  );
}
