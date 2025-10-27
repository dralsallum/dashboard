import React, { useEffect } from "react";
import { QuotaDetail } from "../components";

const Quota = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <QuotaDetail />
    </>
  );
};

export default Quota;
