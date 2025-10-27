import React, { useEffect } from "react";
import { Setting } from "../components";

const Preference = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Setting />
    </>
  );
};

export default Preference;
