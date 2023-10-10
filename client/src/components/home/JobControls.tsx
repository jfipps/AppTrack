import React, { useRef } from "react";
import { closeAddJob, openAddJob } from "../../store/slices/toggles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function JobControls() {
  const addJobOpen = useAppSelector((state) => state.toggles.addJobOpen);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const dispatch = useAppDispatch();

  const handleAddJobClick = () => {
    if (addJobOpen) {
      dispatch(closeAddJob());
    } else {
      dispatch(openAddJob());
    }
  };

  return (
    <>
      <div className="JobControls">
        <select name="sorting" id="sorting-options" className="SortingOptions">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
        <button
          className="AddJobButton"
          onClick={handleAddJobClick}
          ref={buttonRef}
        >
          Add Job
        </button>
      </div>
    </>
  );
}
