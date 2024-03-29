import React, { useEffect, useRef } from "react";
import "../../css/home.scss";
import { BiPowerOff } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { closeDropdown } from "../../store/slices/toggles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUserLoggedIn } from "../../store/slices/login";

interface Props {
  userProfileRef: HTMLButtonElement | null;
}

export default function HomeNavDropdown({ userProfileRef }: Props) {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const dropdownRef = useRef<HTMLDivElement>(null);

  let clickHandler = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      event.target !== userProfileRef
    ) {
      dispatch(closeDropdown());
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickHandler);

    return () => {
      // cleanup
      window.removeEventListener("mousedown", clickHandler);
    };
  });

  const darkModeEnabled = useAppSelector(
    (state) => state.toggles.darkModeEnabled
  );

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
    dispatch(setUserLoggedIn(false));
    navigate("/");
  };

  return (
    <div
      className={darkModeEnabled ? "DropdownDark" : "DropdownLight"}
      ref={dropdownRef}
    >
      <div className="DropdownItem" onClick={() => navigate("/resetpassword")}>
        <BsFillPersonFill
          size={21}
          color={darkModeEnabled ? "white" : "black"}
          className="DropdownIcon"
        ></BsFillPersonFill>
        Reset Password
      </div>
      <div className="DropdownItem" onClick={() => handleLogout()}>
        <BiPowerOff
          size={21}
          color={darkModeEnabled ? "white" : "black"}
          className="DropdownIcon"
        ></BiPowerOff>
        Logout
      </div>
    </div>
  );
}
