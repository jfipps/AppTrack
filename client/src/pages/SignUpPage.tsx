import React, { useState, useEffect } from "react";
import LoginNav from "../components/login/LoginNav";
import SignUpModal from "../components/signup/SignUpModal";
import "../css/signup.scss";

export default function SignUpPage() {
  return (
    <section className="SignUpPage">
      <LoginNav />
      <SignUpModal />
    </section>
  );
}
