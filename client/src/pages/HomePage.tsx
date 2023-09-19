import React, { useState, useEffect } from "react";
import HomeNav from "../components/home/HomeNav";
import {
  updateEmail,
  updatePassword,
  setUserSession,
} from "../store/slices/login";
import { enableLoading, disableLoading } from "../store/slices/loading";
import "../css/home.scss";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate, Navigate } from "react-router-dom";

export default function HomePage() {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.loading.isLoading);

  const userSession = useAppSelector((state) => state.login.user);

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
          dispatch(setUserSession(data.loggedIn));
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

  console.log(isLoading, userSession);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (userSession) {
    return <>LoggedIn</>;
  } else {
    console.log("User session is not available");
    return <Navigate replace to="/" />;
  }
}
