import React, { useState, useEffect } from "react";
import "../../css/home.scss";
import HomeContent from "./HomeContent";
import AddJob from "./AddJob";
import EditJob from "./EditJob";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateEditJobFlag,
  updateAddedJobFlag,
} from "../../store/slices/toggles";
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

  const jobAddedFlag = useAppSelector((state) => state.toggles.jobAddedFlag);

  const jobEditedFlag = useAppSelector((state) => state.toggles.jobEditedFlag);

  const dispatch = useAppDispatch();

  const [jobData, setJobData] = useState<iJobs[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateSort, setDateSort] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const toastCall = (message: string) => {
    toast.info(message, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

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
          if (jobAddedFlag) {
            toastCall("Job added");
            dispatch(updateAddedJobFlag(false));
            setJobData(data);
            setLoading(false);
          } else if (jobEditedFlag) {
            toastCall("Job changed");
            dispatch(updateEditJobFlag(false));
            setJobData(data);
            setLoading(false);
          } else {
            setJobData(data);
            setLoading(false);
          }
        });
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const filterJobsByStatus = () => {
    try {
      setLoading(true);
      fetch(`http://localhost:5001/user/jobs/${statusFilter}`, {
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

  const filterJobsBySearch = () => {
    const body = {
      searchQuery: searchQuery,
    };
    try {
      setLoading(true);
      fetch(`http://localhost:5001/SearchJobs`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => {
        res.json().then((data) => {
          if (data.length > 0) {
            setJobData(data);
          } else {
            getUserJobs();
          }
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

  useEffect(() => {
    if (statusFilter === "") {
      getUserJobs();
    } else {
      filterJobsByStatus();
    }
  }, [statusFilter]);

  useEffect(() => {
    if (searchQuery === "") {
      getUserJobs();
    } else {
      filterJobsBySearch();
    }
  }, [searchQuery]);

  return (
    <>
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
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          loading={loading}
        ></HomeContent>
        <AddJob getUserJobs={getUserJobs}></AddJob>
        <EditJob getUserJobs={getUserJobs}></EditJob>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
