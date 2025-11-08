import React, { useEffect } from "react";
import { NavTech, SignForm } from "../components";
const SignUp = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <NavTech />
      <SignForm />
    </>
  );
};

export default SignUp;
