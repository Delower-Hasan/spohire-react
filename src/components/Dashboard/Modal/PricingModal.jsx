import React from "react";
import AddJobOfferPricing from "../../PricingPages/AddJobOfferPricing";
import SubsCriptionPricing from "../../PricingPages/SubsCriptionPricing";
import useClickOutside from "../../../hooks/useClickOutside";

const PricingModal = ({ setShowPricing }) => {
  const wrapperRef = useClickOutside(() => setShowPricing(false));
  return (
    <div className="">
      <div className="">
        <SubsCriptionPricing />
        <AddJobOfferPricing />
      </div>
    </div>
  );
};

export default PricingModal;
