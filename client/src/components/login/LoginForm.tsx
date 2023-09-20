import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/login.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  updateEmail,
  updatePassword,
  setUserLoggedIn,
  setUserSession,
} from "../../store/slices/login";

export default function LoginForm() {
  const dispatch = useAppDispatch();

  const email = useAppSelector((state) => state.login.email);
  const password = useAppSelector((state) => state.login.password);

  const navigate = useNavigate();

  const handleLoginSubmit = async (event: React.FormEvent) => {
    let user: { user: { firstName: string; lastName: string; email: string } };
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
      console.log(typeof user);
    } else {
      return;
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
            dispatch(setUserLoggedIn(data.loggedIn));
            dispatch(
              setUserSession({
                firstName: user.user.firstName,
                lastName: user.user.lastName,
                email: user.user.email,
              })
            );
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
