/* eslint-disable no-unused-vars */
import React from "react";
import Feature from "../components/Feature/Feature";
import Banner from "../components/banner/Banner";
import FaqAccordion from "../components/faqAccordion/FaqAccordion";
import MobileFooter from "../components/footer/MobileFooter";
import HowItWorks from "../components/howItWorks/HowItWorks";
import MarqueeSlider from "../components/marqueeSlider/MarqueeSlider";
import MobileMarqueeSlider from "../components/marqueeSlider/MobileMarqueeSlider";
import Trusted from "../components/trusted/Trusted";
import WhatPeopleSay from "../components/whatPeopleSay/WhatPeopleSay";
import WhyWe from "../components/whyWe/WhyWe";
import video from "../assets/spohire_2d_video.mp4";
const Home = () => {
  return (
    <>
      <main>
        <Banner />
        <MarqueeSlider />
        <MobileMarqueeSlider />
        <Feature />
        {/* <HowItWorks /> */}
        <div className="container mb-5">
          <div className="row justify-content-center mb-5">
            <video autoPlay muted height="500">
              <source type="video/mp4" src={video} />
            </video>
          </div>
        </div>
        <WhatPeopleSay color="#2D2D2D" />
        <Trusted />
        <WhyWe />
        <FaqAccordion />
      </main>
      <MobileFooter />
    </>
  );
};

export default Home;
