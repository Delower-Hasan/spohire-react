import React from "react";
import FaqAccordion from "../../../faqAccordion/FaqAccordion";
import Contact from "./Contact";

const HelpSupport = () => {
  return (
    <div>
      <div className="bg-white mb-5">
        <FaqAccordion />
      </div>
      <Contact />
    </div>
  );
};

export default HelpSupport;
