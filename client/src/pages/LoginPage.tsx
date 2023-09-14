import React, { useState, useEffect } from "react";
import LoginNav from "../components/login/LoginNav";
import LoginModal from "../components/login/LoginModal";
import "../css/login.scss";

export default function LoginPage() {
  return (
    <section className="LoginPage">
      <LoginNav />
      <LoginModal />
    </section>
  );
}
