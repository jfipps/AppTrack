import React, { useEffect, useRef } from "react";
import JobList from "./JobList";
import JobControls from "./JobControls";
import StatusFilter from "./StatusFilter";
import SearchFilter from "./SearchFilter";
import { useAppSelector } from "../../store/hooks";

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

interface Props {
  jobData: iJobs[];
  getUserJobs: () => void;
  setDateSort: React.Dispatch<React.SetStateAction<string>>;
  dateSort: string;
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}

export default function HomeContent({
  jobData,
  getUserJobs,
  setDateSort,
  dateSort,
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery,
  loading,
}: Props) {
  const darkModeEnabled = useAppSelector(
    (state) => state.toggles.darkModeEnabled
  );

  return (
    <section className="HomeContent">
      <div className="SidebarFilters">
        <div
          className={
            darkModeEnabled ? "Filter Filter-UI-Dark" : "Filter Filter-UI-Light"
          }
        >
          <SearchFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          ></SearchFilter>
        </div>
        <div
          className={
            darkModeEnabled ? "Filter Filter-UI-Dark" : "Filter Filter-UI-Light"
          }
        >
          <StatusFilter
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          ></StatusFilter>
        </div>
      </div>
      <div className="JobContainer">
        <JobControls
          setDateSort={setDateSort}
          dateSort={dateSort}
        ></JobControls>
        <JobList
          jobData={jobData}
          getUserJobs={getUserJobs}
          loading={loading}
        ></JobList>
      </div>
    </section>
  );
}
