import React from "react";
import AddJobOfferPricing from "../../PricingPages/AddJobOfferPricing";
import SubsCriptionPricing from "../../PricingPages/SubsCriptionPricing";
import useClickOutside from "../../../hooks/useClickOutside";

const PricingModal = ({ setShowPricing, setSelectedPackages }) => {
  const wrapperRef = useClickOutside(() => setShowPricing(false));
  return (
    <div className="">
      <div className="">
        <SubsCriptionPricing />
        <AddJobOfferPricing setSelectedPackages={setSelectedPackages} />
      </div>
    </div>
  );
};

export default PricingModal;
