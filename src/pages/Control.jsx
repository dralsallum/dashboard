import React, { useEffect, useState } from "react";
import { Checkout, Dashboard, Footer, NavTech } from "../components";

const control = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Dashboard />
    </>
  );
};

export default control;
