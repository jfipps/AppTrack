import React, { useState, useEffect, useRef } from "react";
import { BsLightbulbFill } from "react-icons/bs";
import HomeNavDropdown from "./HomeNavDropdown";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import "../../css/home.scss";
import {
  enableDarkMode,
  disableDarkMode,
  openDropdown,
  closeDropdown,
} from "../../store/slices/toggles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate, Navigate } from "react-router-dom";

export default function HomeNav() {
  const userProfileButtonRef = useRef<HTMLButtonElement>(null);

  const darkModeEnabled = useAppSelector(
    (state) => state.toggles.darkModeEnabled
  );

  const userDropdownOpen = useAppSelector(
    (state) => state.toggles.userDropdownOpen
  );

  const user = useAppSelector((state) => state.login.user);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleDarkModeClick = () => {
    if (darkModeEnabled) {
      dispatch(disableDarkMode());
    } else {
      dispatch(enableDarkMode());
    }
  };

  const handleUserProfileClick = () => {
    if (userDropdownOpen) {
      dispatch(closeDropdown());
    } else {
      dispatch(openDropdown());
    }
  };

  if (user.firstName.length > 0) {
    return (
      <>
        <div
          className={
            darkModeEnabled
              ? "HomeNavBar Nav-UI-Dark"
              : "HomeNavBar Nav-UI-Light"
          }
        >
          <div className="NavContainer">
            <span className="NavLogo" onClick={() => navigate("/home")}>
              APP TRACK
            </span>
            <div className="HomeNavButtons">
              <button className="DarkModeButton" onClick={handleDarkModeClick}>
                {darkModeEnabled ? (
                  <BsLightbulbFill color="white"></BsLightbulbFill>
                ) : (
                  <BsLightbulbFill color="black"></BsLightbulbFill>
                )}
              </button>
              <div className="DropdownButton">
                <button
                  onClick={handleUserProfileClick}
                  ref={userProfileButtonRef}
                >
                  {user.firstName} {user.lastName}{" "}
                  <AiOutlineDown></AiOutlineDown>
                </button>
              </div>
            </div>
            {userDropdownOpen && (
              <HomeNavDropdown
                userProfileRef={userProfileButtonRef.current}
              ></HomeNavDropdown>
            )}
          </div>
        </div>
      </>
    );
  } else {
    console.log("User session is not available");
    return <Navigate replace to="/" />;
  }
}
