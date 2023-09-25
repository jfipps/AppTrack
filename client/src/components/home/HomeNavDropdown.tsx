import React from "react";
import "../../css/home.scss";
import { useNavigate } from "react-router-dom";

export default function HomeNavDropdown() {
  const navigate = useNavigate();

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
    <ul className="Dropdown">
      <li className="DropdownItem">My Profile</li>
      <li className="DropdownItem" onClick={() => handleLogout()}>
        Logout
      </li>
    </ul>
  );
}
