import React from "react";

import { IPageArgs } from "configs";
import { HomeScreen } from "screens";

const Home = ({ t }: IPageArgs) => {
  return <HomeScreen t={t} />;
};

export default Home;
