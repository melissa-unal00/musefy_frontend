import axios from "axios";
import React, { useEffect, useState } from "react";
import { Footer, Header, NavbarComp, Trending } from "../components";

const TrendingPage = () => {
  return (
    <div>
      <NavbarComp />
      <Header />
      <Trending />
      <Footer />
    </div>
  );
};

export default TrendingPage;
