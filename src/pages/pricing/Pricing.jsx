import "./Pricing.css";

import PricingBanner from "./PricingBanner";
import PriceRange from "./PriceRange";
import AddToTrandfer from "./AddToTrandfer";
import SubsCriptionPricing from "../../components/PricingPages/SubsCriptionPricing";
import AddJobOfferPricing from "../../components/PricingPages/AddJobOfferPricing";
const Pricing = () => {
  return (
    <div>
      {/* <button onClick={clickHandler}>Click</button>
      <PageHeader />
      <BestOffer />
      <div className="slider_bg">
        <div>
          <WhatPeopleSay color="#fff" />
        </div>
      </div>
      <GetStarted /> */}

      <PricingBanner />
      <div className="container pricing_bg_wrapper">
        <PriceRange component={<AddToTrandfer />} />
        {/* additional infor */}
        <div className="additional_pricing_wrapper">
          <p>Additional fee for longer advertiser options</p>
        </div>
        <div className="pricing_line"></div>
      </div>

      <div className="container pricing_bg_wrapper">
        <SubsCriptionPricing />
      </div>
      <div className="container pricing_bg_wrapper pb-0">
        <AddJobOfferPricing />
      </div>
    </div>
  );
};

export default Pricing;
