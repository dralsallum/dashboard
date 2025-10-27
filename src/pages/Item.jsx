import React, { useEffect } from "react";
import { Commodity } from "../components";

const Item = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Commodity />
    </>
  );
};

export default Item;
