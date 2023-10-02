import React from "react";
import "../../css/home.scss";
import { BiPowerOff } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function HomeNavDropdown() {
  const navigate = useNavigate();

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
    navigate("/");
  };

  return (
    <ul className={darkModeEnabled ? "DropdownDark" : "DropdownLight"}>
      <li className="DropdownItem">
        <BsFillPersonFill
          size={21}
          color={darkModeEnabled ? "white" : "black"}
          className="DropdownIcon"
        ></BsFillPersonFill>
        My Profile
      </li>
      <li className="DropdownItem" onClick={() => handleLogout()}>
        <BiPowerOff
          size={21}
          color={darkModeEnabled ? "white" : "black"}
          className="DropdownIcon"
        ></BiPowerOff>
        Logout
      </li>
    </ul>
  );
}
