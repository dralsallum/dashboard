import React, { useEffect, useState } from "react";
import { ConfirmSubscription, Footer, NavTech } from "../components";

const Confirm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavTech />
      <ConfirmSubscription />
      <Footer />
    </>
  );
};

export default Confirm;
