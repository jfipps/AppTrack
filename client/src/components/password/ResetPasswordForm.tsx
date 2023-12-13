import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/login.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/resetpassword.scss";

function ResetPasswordForm() {
  return (
    <>
      <div className="ResetPasswordModal">
        <div className="ResetPasswordForm">Password Reset</div>
      </div>
    </>
  );
}

export default ResetPasswordForm;
