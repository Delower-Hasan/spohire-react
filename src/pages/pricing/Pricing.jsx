import "./Pricing.css";

import AddJobOfferPricing from "../../components/PricingPages/AddJobOfferPricing";
import SubsCriptionPricing from "../../components/PricingPages/SubsCriptionPricing";
import AddToTrandfer from "./AddToTrandfer";
import PriceRange from "./PriceRange";
import PricingBanner from "./PricingBanner";

const Pricing = () => {
  return (
    <div>
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
