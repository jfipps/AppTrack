import React, { useEffect, useRef, useState } from "react";
import EditJobForm from "./EditJobForm";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { closeEditJob } from "../../store/slices/toggles";

interface Props {
  getUserJobs: () => void;
}

export default function EditJob({ getUserJobs }: Props) {
  const sidebarRef = useRef<HTMLElement>(null);

  const editJobOpen = useAppSelector((state) => state.toggles.editJobOpen);

  const dispatch = useAppDispatch();

  let clickHandler = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      dispatch(closeEditJob());
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickHandler);

    return () => {
      // cleanup
      window.removeEventListener("mousedown", clickHandler);
    };
  });

  return (
    <section
      className={editJobOpen ? "EditJobSidebar" : "EditJobSidebar Closed"}
      ref={sidebarRef}
    >
      <EditJobForm getUserJobs={getUserJobs}></EditJobForm>
    </section>
  );
}
