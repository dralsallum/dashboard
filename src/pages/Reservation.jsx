import React, { useEffect, useState } from "react";
import { NavTech, Times } from "../components";

const Reservation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavTech />
      <Times />
    </>
  );
};

export default Reservation;
