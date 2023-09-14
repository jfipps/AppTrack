import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/signup.scss";
import {
  updateFirstName,
  updateLastName,
  updateEmail,
  updatePassword,
  createAccount,
} from "../../store/slices/signup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function LoginForm() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(createAccount());
  };

  return (
    <>
      <form id="signup-form" className="SignUpForm" onSubmit={handleSubmit}>
        <div className="FormInput">
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={(e) => dispatch(updateFirstName(e.target.value))}
          />
        </div>
        <div className="FormInput">
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={(e) => dispatch(updateLastName(e.target.value))}
          />
        </div>
        <div className="FormInput">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => dispatch(updateEmail(e.target.value))}
          />
        </div>
        <div className="FormInput">
          <label>Password</label>
          <input
            type="password"
            name="username"
            placeholder="Password"
            onChange={(e) => dispatch(updatePassword(e.target.value))}
          />
        </div>
        <button type="submit" className="SubmitButton">
          Sign Up
        </button>
        <span>
          Already have an account? <a onClick={() => navigate("/")}>Login</a>
        </span>
      </form>
    </>
  );
}
