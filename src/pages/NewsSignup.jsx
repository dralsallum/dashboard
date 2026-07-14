import React, { useEffect, useState } from "react";
import {
  Checkout,
  Dashboard,
  Footer,
  NavTech,
  NewsletterSignup,
} from "../components";

const NewsSignup = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavTech />
      <NewsletterSignup />
      <Footer />
    </>
  );
};

export default NewsSignup;
