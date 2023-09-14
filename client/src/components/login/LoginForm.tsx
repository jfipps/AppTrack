import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/login.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function LoginForm() {
  const darkModeEnabled = useAppSelector(
    (state) => state.filter.darkModeEnabled
  );

  const navigate = useNavigate();

  return (
    <>
      <form id="login-form" className="LoginForm">
        <div className="FormInput">
          <label>Email</label>
          <input type="text" name="email" placeholder="Email" />
        </div>
        <div className="FormInput">
          <label>Password</label>
          <input type="password" name="username" placeholder="Password" />
        </div>
        <button type="submit" className="SubmitButton">
          Login
        </button>
        <span>
          Don't have an account? Register{" "}
          <a onClick={() => navigate("/signup")}>here</a>
        </span>
      </form>
    </>
  );
}
