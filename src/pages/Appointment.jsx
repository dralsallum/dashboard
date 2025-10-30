import React, { useEffect, useState } from "react";
import { Website } from "../components";

const Appointment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Website />
    </>
  );
};

export default Appointment;
