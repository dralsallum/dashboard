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

const Home = () => {
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

export default Home;
