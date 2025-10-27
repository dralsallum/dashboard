import React, { useEffect, useState } from "react";
import { Subscription } from "../components";

const Pay = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Subscription />
    </>
  );
};

export default Pay;
