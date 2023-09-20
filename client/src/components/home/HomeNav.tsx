import React, { useState, useEffect } from "react";
import { BsLightbulbFill } from "react-icons/bs";
import "../../css/home.scss";
import {
  enableDarkMode,
  disableDarkMode,
  openDropdown,
  closeDropdown,
} from "../../store/slices/toggles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

export default function HomeNav() {
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

  const handleLogout = async () => {
    await fetch("http://localhost:5001/user/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.json());
    });
    navigate("/");
  };

  const handleUserProfileClick = () => {
    if (userDropdownOpen) {
      dispatch(closeDropdown());
    } else {
      dispatch(openDropdown());
    }
  };

  return (
    <>
      <div
        className={
          darkModeEnabled ? "HomeNavBar Nav-UI-Dark" : "HomeNavBar Nav-UI-Light"
        }
      >
        <div className="NavContainer">
          <span className="NavLogo">APP TRACK</span>
          <div className="HomeNavButtons">
            <button onClick={handleDarkModeClick}>
              {darkModeEnabled ? (
                <BsLightbulbFill color="white"></BsLightbulbFill>
              ) : (
                <BsLightbulbFill color="black"></BsLightbulbFill>
              )}
            </button>
            <button onClick={handleUserProfileClick}>
              {user.firstName[0]}
              {user.lastName[0]}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
