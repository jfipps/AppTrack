import React, { useEffect, useRef, useState } from "react";
import AddJobForm from "./AddJobForm";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { closeAddJob } from "../../store/slices/toggles";

interface Props {
  getUserJobs: () => void;
}

export default function AddJob({ getUserJobs }: Props) {
  const sidebarRef = useRef<HTMLElement>(null);

  const addJobOpen = useAppSelector((state) => state.toggles.addJobOpen);

  const dispatch = useAppDispatch();

  let clickHandler = (event: MouseEvent) => {
    var element = event.target as HTMLElement;
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node) &&
      element.innerHTML !== "Add Job" &&
      !element.classList.contains("JobStatusDropdownButton")
    ) {
      dispatch(closeAddJob());
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", clickHandler);

    return () => {
      // cleanup
      window.removeEventListener("mouseup", clickHandler);
    };
  });

  return (
    <section
      className={addJobOpen ? "AddJobSidebar" : "AddJobSidebar Closed"}
      ref={sidebarRef}
    >
      <AddJobForm getUserJobs={getUserJobs}></AddJobForm>
    </section>
  );
}
