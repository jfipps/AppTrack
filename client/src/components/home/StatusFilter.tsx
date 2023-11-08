import React from "react";
import "../../css/home.scss";

interface Props {
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
}

export default function StatusFilter({ statusFilter, setStatusFilter }: Props) {
  const handleStatusFilterClick = (value: string) => {
    if (value === statusFilter) {
      setStatusFilter("");
    } else {
      setStatusFilter(value);
    }
  };

  return (
    <>
      <div className="OptionContainer">
        <div className="Options">
          <button
            className="StatusFilter Applied"
            onClick={() => handleStatusFilterClick("Applied")}
          >
            Applied
          </button>
          <button
            className="StatusFilter Interview"
            onClick={() => handleStatusFilterClick("Interview")}
          >
            Interview
          </button>
          <button
            className="StatusFilter Assessment"
            onClick={() => handleStatusFilterClick("Assessment")}
          >
            Assessment
          </button>
          <button
            className="StatusFilter Offer"
            onClick={() => handleStatusFilterClick("Offer")}
          >
            Offer
          </button>
          <button
            className="StatusFilter Rejected"
            onClick={() => handleStatusFilterClick("Rejected")}
          >
            Rejected
          </button>
        </div>
        {/* <div className="OptionRow"></div> */}
      </div>
    </>
  );
}
