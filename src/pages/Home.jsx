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
  StickyPriceBar,
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
      <StickyPriceBar
        price="٧٢٠ ر.س"
        description="فحص، تحليل، 37+ مؤشراً حيوياً"
        buttonText="ابدأ فحصك"
        onButtonClick={() => navigate("/waitlist")}
      />
    </>
  );
};

export default Home;
