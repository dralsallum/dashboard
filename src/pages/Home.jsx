import React, { useEffect, useRef } from "react";
import {
  Very,
  Footer,
  NavTech,
  Phone,
  Category,
  Benefits,
  Search,
  Therapy,
  Medication,
  Onemedical,
  Article,
  Health,
  Monitor,
} from "../components";

const Home = () => {
  const categoryRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavTech />
      <Very />
      <Health />
      <Monitor />
      <Benefits />
      <Phone />
      <Footer />
    </>
  );
};

export default Home;
