import React, { useEffect, useState } from "react";
import { Desktop, NavTech } from "../components";

const PostHog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Desktop />
    </>
  );
};

export default PostHog;
