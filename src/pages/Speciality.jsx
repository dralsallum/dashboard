import React, { useEffect, useRef } from "react";
import { Footer, NavTech, Allcategories } from "../components";

const Speciality = () => {
  const categoryRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavTech />
      <Allcategories />
      <Footer />
    </>
  );
};

export default Speciality;
