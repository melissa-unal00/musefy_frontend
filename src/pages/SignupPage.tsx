import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Signup, Header, NavbarComp, Footer } from "../components/index";

const SignupPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  useEffect(() => {
    removeCookie("token", { path: "/" });
  }, []);
  return (
    <div>
      <Header />
      <NavbarComp />
      <Signup />
      <Footer />
    </div>
  );
};

export default SignupPage;
