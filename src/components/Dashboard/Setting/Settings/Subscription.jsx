import React, { useState } from "react";

const Subscription = () => {
  return (
    <div className="settings mb-4">
      <h4>Subscription info.</h4>
      <div className="mb-4">
        <p className="label">Current subscritpion status : </p>
        <p style={{ color: "#CD7F32" }} className="answer">
          Bronze Players
        </p>
      </div>
      <div className="mb-4">
        <p className="label">Subscritpion expired date : </p>
        <p style={{ color: "#FE6470" }} className="answer">
          25.05.2024
        </p>
      </div>
      <div className="mb-4">
        <p className="label">Auto - renewal</p>
      </div>
      <button className="subscription_btn">Change Subscription</button>
    </div>
  );
};

export default Subscription;
