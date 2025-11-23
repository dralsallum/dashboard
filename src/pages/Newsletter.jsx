import React, { useEffect, useRef } from "react";
import {
  Very,
  Footer,
  NavTech,
  Phone,
  Category,
  Benefits,
  Search,
} from "../components";

const Newsletter = () => {
  const categoryRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavTech />
      <Search />
      <Category ref={categoryRef} />
      <Benefits />
      <Phone />
      <Footer />
    </>
  );
};

export default Newsletter;
