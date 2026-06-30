import React, { useEffect, useRef } from "react";
import { Contact, Footer, NavTech } from "../components";

const Reach = () => {
  const categoryRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavTech />
      <Contact />
      <Footer />
    </>
  );
};

export default Reach;
