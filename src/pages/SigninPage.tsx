import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { CookiesProvider } from "react-cookie";
import { Signin, Header, NavbarComp, Footer } from "../components/index";

const SigninPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  useEffect(() => {
    removeCookie("token", { path: "/" });
  }, []);
  return (
    <div>
      <Header />
      <NavbarComp />
      <Signin />
      <Footer />
    </div>
  );
};

export default SigninPage;
