import React, { useState } from "react";
import PaymentForm from "../../../pages/pricing/PaymentForm.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PK } from "../../../config/config.js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentFormTwo from "../../../pages/pricing/PaymentFormTwo.jsx";
import PaymentFormTwoAnnounement from "../../../pages/pricing/PaymentFormTwoAnnouncement.jsx";

import credit from "../../../assets/creditcard.png";
import paypal from "../../../assets/paypal.svg";

import personImg from "../../../assets/person.png";


const PaymentProcess = ({
  handleSubmit,
  addingAnnounement,
  closeModal,
  addingJob,
}) => {
  const stripePromise = loadStripe(STRIPE_PK);
  const [selectedSubscription, setSelectedSubscription] = useState(1);
  const [total, setTotal] = useState(20);
  const [selectedOption, setSelectedOption] = useState("card");
  const subscriptions = [
    { duration: "1 months", price: 0 },
    { duration: "2 months", price: 20 },
    { duration: "3 months", price: 30 },
  ];

  const handleSubscriptionClick = (index) => {
    setSelectedSubscription(index);
    setTotal(subscriptions[index].price);
  };
  return (
    <>
      <div className="d-flex gap-4">
        <div className="gift">
          <div className={"selected_subs"}>
            <div className="sub_total mb-4">
              <p className="fs-6 text-black text-start fw-normal mb-2">
                Gift Card / Voucher code
              </p>
              <div className="d-flex gap-2 justify-content-start">
                <input
                  style={{ backgroundColor: "#F3F7FF", width: "240px" }}
                  className=""
                  type="text"
                  placeholder="Enter code number"
                />

                <button className="bg_clr_99 px-4 rounded-1 text-white">
                  Apply
                </button>
              </div>
            </div>

            <div className="sub_total d-flex justify-content-between mb-4">
              <p className="fs-6 text-black fw-normal mb-0 text_clr_99">
                Voucher
              </p>
              <p className={"fs-6 text-black fw-normal mb-0 text_clr_99"}>
                ${selectedSubscription?.price}
              </p>
            </div>

            <div className="sub_total d-flex justify-content-between bg_clr_ff px-4 py-2 rounded">
              <p className="fs-5 text-white fw-normal mb-0">Total</p>
              <p className={"fs-5 text-white fw-normal mb-0"}>
                ${selectedSubscription?.price}
              </p>
            </div>
          </div>

          <div className="person_img">
            <img className="mt-4" src={personImg} alt="" />
          </div>
        </div>

        <div>
          <div>
            {selectedOption === "card" ? (
              <Elements stripe={stripePromise}>
                <PaymentFormTwo
                  handleSubmit={handleSubmit}
                  addingJob={addingJob}
                  selectedSubscription={selectedSubscription}
                  closeModal={closeModal}
                />
              </Elements>
            ) : (
              <p style={{ width: "590px" }}>Paypal</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentProcess;
