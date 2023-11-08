import React from "react";
import { FaSearch } from "react-icons/fa";
import "../../css/home.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateJobSearch } from "../../store/slices/filter";

interface Props {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchFilter({ searchQuery, setSearchQuery }: Props) {
  const jobSearch = useAppSelector((state) => state.filter.jobSearch);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(jobSearch);
    if (jobSearch === "") {
      setSearchQuery("");
    } else {
      setSearchQuery(jobSearch);
      dispatch(updateJobSearch(""));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="SearchInput">
          <input
            type="text"
            name="jobsearch"
            placeholder="Search Jobs"
            value={jobSearch}
            onChange={(e) => dispatch(updateJobSearch(e.target.value))}
          />
          <button type="submit" className="SearchIcon">
            <FaSearch></FaSearch>
          </button>
        </div>
      </form>
    </>
  );
}
