import React, { useState, useEffect } from "react";
import { BsLightbulbFill } from "react-icons/bs";
import "../../css/login.scss";
import { enableDarkMode, disableDarkMode } from "../../store/slices/toggles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function LoginNav() {
  const darkModeEnabled = useAppSelector(
    (state) => state.toggles.darkModeEnabled
  );
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (darkModeEnabled) {
      dispatch(disableDarkMode());
    } else {
      dispatch(enableDarkMode());
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
