import React, { useState, useEffect } from "react";
import { BsLightbulbFill } from "react-icons/bs";
import "../../css/login.scss";
import { enable, disable } from "../../store/slices/filter";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function LoginNav() {
  const darkModeEnabled = useAppSelector(
    (state) => state.filter.darkModeEnabled
  );
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (darkModeEnabled) {
      dispatch(disable());
    } else {
      dispatch(enable());
    }
  };

  return (
    <>
      <div
        className={
          darkModeEnabled
            ? "LoginNavBar Nav-UI-Dark"
            : "LoginNavBar Nav-UI-Light"
        }
      >
        <div className="NavContainer">
          <span className="NavLogo">APP TRACK</span>
          <button onClick={handleClick}>
            {darkModeEnabled ? (
              <BsLightbulbFill color="white"></BsLightbulbFill>
            ) : (
              <BsLightbulbFill color="black"></BsLightbulbFill>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
