import { useEffect } from "react";
import { Footer, NavTech, News } from "../components";

const Knowledge = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavTech />
      <News />
      <Footer />
    </>
  );
};

export default Knowledge;
