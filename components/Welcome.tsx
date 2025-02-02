/** @format */

import Tabs from "./Tabs";
import { navTabs } from "@/data";
import Carousel from "@/components/Carousel";

const Welcome = () => {
  return (
    <div className="container">
      <Tabs tabs={navTabs.map((tab) => ({ ...tab, content: "" }))} />
      Welcome
      <Carousel />
    </div>
  );
};

export default Welcome;
