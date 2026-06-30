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
  Work,
} from "../components";

const HowItWorks = () => {
  const categoryRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavTech />
      <Work />
      <Footer />
    </>
  );
};

export default HowItWorks;
