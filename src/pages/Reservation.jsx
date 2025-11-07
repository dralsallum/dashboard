import React, { useEffect, useState } from "react";
import { Footer, NavTech, Times } from "../components";

const Reservation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavTech />
      <Times />
      <Footer />
    </>
  );
};

export default Reservation;
