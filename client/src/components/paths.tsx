import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";

export default function Paths() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage></LoginPage>}></Route>
        <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/home" element={<HomePage></HomePage>}></Route>
        <Route
          path="/resetpassword"
          element={<ResetPasswordPage></ResetPasswordPage>}
        ></Route>
        <Route
          path="/forgotpassword"
          element={<ForgotPasswordPage></ForgotPasswordPage>}
        ></Route>
      </Routes>
    </>
  );
}
