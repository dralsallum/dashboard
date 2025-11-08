import React, { useEffect, useState } from "react";
import { Footer, NavTech, Times } from "../components";

const Reservation = () => {
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Trigger a second run
    if (trigger === 0) {
      setTrigger(1);
    }
  }, [trigger]);
  return (
    <>
      <NavTech />
      <Times />
      <Footer />
    </>
  );
};

export default Reservation;
