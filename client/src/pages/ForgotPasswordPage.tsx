import React, { useState, useEffect } from "react";
import HomeNav from "../components/home/HomeNav";
import { setUserLoggedIn, setUserSession } from "../store/slices/login";
import { enableLoading, disableLoading } from "../store/slices/toggles";
import "../css/home.scss";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate, Navigate } from "react-router-dom";
import LoginNav from "../components/login/LoginNav";
import EmailPasswordModal from "../components/password/EmailPasswordModal";

function ForgotPasswordPage() {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.toggles.isLoading);

  const userLoggedIn = useAppSelector((state) => state.login.loggedIn);

  const CheckAuth = async () => {
    dispatch(enableLoading());
    await fetch("http://localhost:5001/isAuth", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json().then((data) => {
          console.log("Home: ", data.loggedIn);
          dispatch(setUserLoggedIn(data.loggedIn));
          if (data.loggedIn) {
            console.log(
              data.user.firstName,
              data.user.lastName,
              data.user.email
            );
            dispatch(
              setUserSession({
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                email: data.user.email,
              })
            );
          }
          dispatch(disableLoading());
        });
      })
      .catch((e) => {
        console.log(e);
        dispatch(disableLoading());
      });
  };

  useEffect(() => {
    CheckAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (userLoggedIn) {
    console.log("Please use the reset password page");
    return <Navigate replace to="/home" />;
  } else {
    return (
      <>
        <LoginNav />
        <EmailPasswordModal />
      </>
    );
  }
}

export default ForgotPasswordPage;
