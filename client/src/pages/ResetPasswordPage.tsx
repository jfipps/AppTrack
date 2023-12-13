import React, { useState, useEffect } from "react";
import HomeNav from "../components/home/HomeNav";
import { setUserLoggedIn, setUserSession } from "../store/slices/login";
import { enableLoading, disableLoading } from "../store/slices/toggles";
import "../css/home.scss";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate, Navigate } from "react-router-dom";
import ResetPassword from "../components/password/ResetPassword";

function ResetPasswordPage() {
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
          console.log(data.user.firstName, data.user.lastName, data.user.email);
          dispatch(
            setUserSession({
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              email: data.user.email,
            })
          );
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
    return (
      <>
        <HomeNav></HomeNav>
        <ResetPassword></ResetPassword>
      </>
    );
  } else {
    console.log("User session is not available");
    return <Navigate replace to="/" />;
  }
}

export default ResetPasswordPage;
