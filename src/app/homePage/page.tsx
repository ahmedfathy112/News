import React from "react";
import HeroSec from "./HeroSec";
import ClientsSec from "./Clients";
import ManageSec from "./ManageSec";
import FourthSec from "./FourthSec";
import LatestNews from "./LatestNews";

const HomePage = () => {
  return (
    <div>
      <HeroSec />
      <ClientsSec />
      <LatestNews />
      <ManageSec />
      <FourthSec />
    </div>
  );
};

export default HomePage;
