import React, { useEffect } from "react";
import {
  Very,
  Footer,
  NavTech,
  Phone,
  Category,
  Benefits,
} from "../components";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavTech />
      <Very />
      <Category />
      <Benefits />
      <Phone />
      <Footer />
    </>
  );
};

export default Home;
