import React from "react";
import PriceRange from "../../pages/pricing/PriceRange";
import AddToSubscription from "./AddToSubscription";

const SubsCriptionPricing = () => {
  return (
    <div
      style={{
        paddingBottom:
          location.pathname === "/dashboard/players" || "/dashboard"
            ? "0px"
            : "150px",
      }}
    >
      <PriceRange component={<AddToSubscription />} />
    </div>
  );
};

export default SubsCriptionPricing;
