import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/login.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ToastContainer, toast } from "react-toastify";
import ResetPasswordForm from "./ResetPasswordForm";
import "react-toastify/dist/ReactToastify.css";
import "../../css/resetpassword.scss";

function ResetPassword() {
  const darkModeEnabled = useAppSelector(
    (state) => state.toggles.darkModeEnabled
  );

  return (
    <>
      <div
        className={
          darkModeEnabled
            ? "ResetPasswordMain ResetPassword-UI-Dark"
            : "ResetPasswordMain ResetPassword-UI-Light"
        }
      >
        <ResetPasswordForm />
      </div>
    </>
  );
}

export default ResetPassword;
