import React from "react";
import "../../css/home.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function HomeMain() {
  const darkModeEnabled = useAppSelector(
    (state) => state.toggles.darkModeEnabled
  );

  return (
    <>
      <div
        className={
          darkModeEnabled ? "HomeMain Home-UI-Dark" : "HomeMain Home-UI-Light"
        }
      >
        Home Page
      </div>
    </>
  );
}