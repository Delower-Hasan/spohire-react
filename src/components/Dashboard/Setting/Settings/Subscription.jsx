import React, { useState } from "react";
import { useSelector } from "react-redux";
import BuySubscriptionModal from "../../Modal/BuySubscriptionModal";
import { colors } from "../../../../utils/colorsForSubscriptionName";

const Subscription = () => {
  const { user } = useSelector((store) => store.auth);

  const expirationDate = new Date(user?.expirationDate);

  const formattedExpirationDate = expirationDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const color = colors.filter(
    (item) => item.subscriptionName === user.subscriptionName
  );

  return (
    <div className="settings mb-4">
      <h4>Subscription info.</h4>
      <div className="mb-4">
        <p className="label">Current subscritpion status : </p>
        <p style={{ color: color[0].color }} className="answer">
          {user?.subscriptionName} {user?.role}
        </p>
      </div>
      <div className="mb-4">
        <p className="label">Subscritpion expired date : </p>
        <p style={{ color: "#FE6470" }} className="answer">
          {formattedExpirationDate}
        </p>
      </div>
      {/* <div className="mb-4">
        <p className="label">Auto - renewal</p>
      </div> */}

      {user?.subscriptionName !== "Gold" && (
        <button
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          className="subscription_btn"
        >
          Change Subscription
        </button>
      )}

      <BuySubscriptionModal user={user} />
      {/* <button className="subscription_btn">Change Subscription</button> */}
    </div>
  );
};

export default Subscription;
