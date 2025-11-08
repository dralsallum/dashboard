import React, { useEffect } from "react";

import { NavTech, SignLog } from "../components";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavTech />
      <SignLog />
    </>
  );
};

export default Login;
