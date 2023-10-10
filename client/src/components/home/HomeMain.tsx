import React, { useRef } from "react";
import "../../css/home.scss";
import HomeContent from "./HomeContent";
import AddJob from "./AddJob";
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
        <HomeContent></HomeContent>
        <AddJob></AddJob>
      </div>
    </>
  );
}
