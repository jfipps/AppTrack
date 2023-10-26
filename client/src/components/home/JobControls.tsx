import React, { useRef } from "react";
import { closeAddJob, openAddJob } from "../../store/slices/toggles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface Props {
  setDateSort: React.Dispatch<React.SetStateAction<string>>;
  dateSort: string;
}

export default function JobControls({ setDateSort, dateSort }: Props) {
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

  const handleJobSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setDateSort(e.target.value);
  };

  return (
    <>
      <div className="JobControls">
        <select
          name="sorting"
          id="sorting-options"
          className="SortingOptions"
          onChange={(e) => handleJobSort(e)}
          value={dateSort}
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
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
