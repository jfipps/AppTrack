import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/login.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  updateEmail,
  updatePassword,
  setUserSession,
} from "../../store/slices/login";
import { enableLoading, disableLoading } from "../../store/slices/loading";

export default function LoginForm() {
  const dispatch = useAppDispatch();

  const email = useAppSelector((state) => state.login.email);
  const password = useAppSelector((state) => state.login.password);

  const navigate = useNavigate();

  const handleLoginSubmit = async (event: React.FormEvent) => {
    let user;
    event.preventDefault();
    if (email.length > 0 && password.length > 0) {
      const body = { email, password };
      const res = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });
      user = await res.json();
    }
    if (user) {
      try {
        await fetch("http://localhost:5001/isAuth", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (!res.ok) {
            console.log("Not Found");
          }
          res.json().then((data) => {
            dispatch(setUserSession(data.loggedIn));
            console.log("User Data");
            console.log(data.loggedIn);
          });
        });
      } catch (e) {
        console.log(e);
        return;
      }
      navigate("/home");
    } else {
      console.log("Invalid Login");
    }
    dispatch(updateEmail(""));
    dispatch(updatePassword(""));
  };

  return (
    <>
      <form id="login-form" className="LoginForm" onSubmit={handleLoginSubmit}>
        <div className="FormInput">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => dispatch(updateEmail(e.target.value))}
          />
        </div>
        <div className="FormInput">
          <label>Password</label>
          <input
            type="password"
            name="username"
            placeholder="Password"
            value={password}
            onChange={(e) => dispatch(updatePassword(e.target.value))}
          />
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
