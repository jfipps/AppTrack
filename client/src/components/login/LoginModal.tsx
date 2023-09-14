import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import "../../css/login.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function LoginModal() {
  const darkModeEnabled = useAppSelector(
    (state) => state.filter.darkModeEnabled
  );

  return (
    <>
      <div
        className={
          darkModeEnabled
            ? "LoginMain Login-UI-Dark"
            : "LoginMain Login-UI-Light"
        }
      >
        <div className="LoginModal">
          <span className="LoginHeader">Login</span>
          <LoginForm></LoginForm>
        </div>
      </div>
    </>
  );
}
