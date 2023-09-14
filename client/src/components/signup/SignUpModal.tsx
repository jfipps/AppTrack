import React, { useState, useEffect } from "react";
import SignUpForm from "./SignUpForm";
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
            ? "SignUpMain SignUp-UI-Dark"
            : "SignUpMain SignUp-UI-Light"
        }
      >
        <div className="SignUpModal">
          <span className="SignUpHeader">Sign Up</span>
          <SignUpForm></SignUpForm>
        </div>
      </div>
    </>
  );
}
