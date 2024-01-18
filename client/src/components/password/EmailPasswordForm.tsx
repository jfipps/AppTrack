import React, { useState, useEffect } from "react";
import "../../css/login.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/resetpassword.scss";
import { updateEmailPassword } from "../../store/slices/resetpassword";

function EmailPasswordForm() {
  const dispatch = useAppDispatch();

  const emailPassword = useAppSelector(
    (state) => state.resetpassword.emailPassword
  );

  const handleForgotPasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (emailPassword.length > 0) {
      const body = { email: emailPassword };
      await fetch("http://localhost:5001/finduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => {
        res.json().then(async (data) => {
          if (data.user) {
            // const body = {email: emailPassword}
            await fetch("http://localhost:5001/sendemail", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }).then((res) => {
              console.log(res);
            });
          }
        });
      });
    }
    toastCall("Success", emailPassword);
  };

  const toastCall = (action: string, message: string) => {
    if (action === "Success") {
      toast.info(`An reset password email has been sent. ${message}`, {
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
        onSubmit={handleForgotPasswordSubmit}
      >
        <div className="Inputs">
          <div className="FormInput">
            <label>Email</label>
            <input
              type="text"
              name="CurrPassword"
              placeholder="Email"
              value={emailPassword}
              onChange={(e) => dispatch(updateEmailPassword(e.target.value))}
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

export default EmailPasswordForm;
