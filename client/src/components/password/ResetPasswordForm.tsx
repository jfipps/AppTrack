import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/login.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/resetpassword.scss";
import {
  updateOldPassword,
  updateConfirmPassword,
  updateNewPassword,
} from "../../store/slices/resetpassword";

function ResetPasswordForm() {
  const dispatch = useAppDispatch();

  const oldPassword = useAppSelector(
    (state) => state.resetpassword.oldPassword
  );

  const newPassword = useAppSelector(
    (state) => state.resetpassword.newPassword
  );

  const confirmPassword = useAppSelector(
    (state) => state.resetpassword.confirmPassword
  );

  const handleResetPasswordSubmit = async (event: React.FormEvent) => {
    let passwords: {
      passwords: {
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
      };
    };
    event.preventDefault();
    if (newPassword.length > 0 && confirmPassword.length > 0) {
      if (newPassword === confirmPassword) {
        const body = { oldPassword, newPassword, confirmPassword };
        await fetch("http://localhost:5001/resetpassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(body),
        }).then((response) => {
          if (response.status === 400) {
            toastCall("Fail");
          } else {
            toastCall("Success");
          }
        });
      } else {
        toastCall("Fail");
      }
    } else {
      toastCall("Empty");
    }
    dispatch(updateOldPassword(""));
    dispatch(updateNewPassword(""));
    dispatch(updateConfirmPassword(""));
  };

  const toastCall = (action: string) => {
    if (action === "Success") {
      toast.info("Password Reset", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (action === "Fail") {
      toast.error("Password not reset", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error("Please enter in a new password.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <form
        id="reset-password-form"
        className="ResetPasswordForm"
        onSubmit={handleResetPasswordSubmit}
      >
        <div className="Inputs">
          <div className="FormInput">
            <label>Current Password</label>
            <input
              type="password"
              name="CurrPassword"
              placeholder="Current Password"
              value={oldPassword}
              onChange={(e) => dispatch(updateOldPassword(e.target.value))}
            />
          </div>
          <div className="FormInput">
            <label>New Password</label>
            <input
              type="password"
              name="NewPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => dispatch(updateNewPassword(e.target.value))}
            />
          </div>
          <div className="FormInput">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="ConfirmNewPassword"
              placeholder="Confirm"
              value={confirmPassword}
              onChange={(e) => dispatch(updateConfirmPassword(e.target.value))}
            />
          </div>
        </div>
        <button type="submit" className="SubmitButton">
          Reset Password
        </button>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default ResetPasswordForm;
