import React, { useEffect } from "react";
import { Footer, Help, NavTech, Website } from "../components";

const Support = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavTech />
      <Help />
      <Footer />
    </>
  );
};

export default Support;
