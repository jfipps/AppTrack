import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/login.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ToastContainer, toast } from "react-toastify";
import ResetPasswordForm from "./ResetPasswordForm";
import "react-toastify/dist/ReactToastify.css";
import "../../css/resetpassword.scss";

function ResetPasswordModal() {
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
        <div className="ResetPasswordModal">
          <span className="ResetPasswordHeader">Reset Password</span>
          <ResetPasswordForm />
        </div>
      </div>
    </>
  );
}

export default ResetPasswordModal;
