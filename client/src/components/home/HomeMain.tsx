import React, { useState, useEffect } from "react";
import "../../css/home.scss";
import HomeContent from "./HomeContent";
import AddJob from "./AddJob";
import EditJob from "./EditJob";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

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

export default function HomeMain() {
  const darkModeEnabled = useAppSelector(
    (state) => state.toggles.darkModeEnabled
  );

  const [jobData, setJobData] = useState<iJobs[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateSort, setDateSort] = useState("newest");

  const getUserJobs = () => {
    try {
      setLoading(true);
      fetch(`http://localhost:5001/user/jobs/${dateSort}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((data) => {
          setJobData(data);
          setLoading(false);
        });
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserJobs();
  }, [dateSort]);

  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <div
          className={
            darkModeEnabled ? "HomeMain Home-UI-Dark" : "HomeMain Home-UI-Light"
          }
        >
          <HomeContent
            jobData={jobData}
            getUserJobs={getUserJobs}
            setDateSort={setDateSort}
            dateSort={dateSort}
          ></HomeContent>
          <AddJob getUserJobs={getUserJobs}></AddJob>
          <EditJob getUserJobs={getUserJobs}></EditJob>
        </div>
      )}
    </>
  );
}
