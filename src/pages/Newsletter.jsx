import React, { useEffect, useRef } from "react";
import { Footer, Last, NavTech, Publish } from "../components";

const Newsletter = () => {
  const categoryRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavTech />
      <Publish />
      <Last />
      <Footer />
    </>
  );
};

export default Newsletter;
