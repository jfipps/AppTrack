import React, { useEffect, useRef } from "react";
import AddJobForm from "./AddJobForm";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { closeAddJob } from "../../store/slices/toggles";

export default function AddJob({}) {
  const sidebarRef = useRef<HTMLElement>(null);

  const addJobOpen = useAppSelector((state) => state.toggles.addJobOpen);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let clickHandler = (event: MouseEvent) => {
      var element = event.target as HTMLElement;
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        element.innerHTML !== "Add Job"
      ) {
        dispatch(closeAddJob());
      }
    };
    document.addEventListener("mousedown", clickHandler);
  }, []);

  return (
    <section
      className={addJobOpen ? "AddJobSidebar" : "AddJobSidebar Closed"}
      ref={sidebarRef}
    >
      <AddJobForm></AddJobForm>
    </section>
  );
}

// work on off click sidebar. Button don't work
