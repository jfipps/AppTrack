import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/login.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ToastContainer, toast } from "react-toastify";
import EmailPasswordForm from "./EmailPasswordForm";
import "react-toastify/dist/ReactToastify.css";
import "../../css/resetpassword.scss";

function EmailPasswordModal() {
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
          <span className="ResetPasswordHeader">Forgot Password?</span>
          <EmailPasswordForm />
        </div>
      </div>
    </>
  );
}

export default EmailPasswordModal;
