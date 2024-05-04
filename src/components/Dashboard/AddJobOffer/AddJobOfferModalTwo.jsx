import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import credit from "../../../assets/creditcard.png";
import paypal from "../../../assets/paypal.svg";
import { STRIPE_PK } from "../../../config/config.js";
import PaymentFormTwo from "../../../pages/pricing/PaymentFormTwo.jsx";

const AddJobOfferModalTwo = ({
  handleSubmit,
  addingJob,
  selectedSubscription,
  setSelectedSubscription,
  closeModal,
  setNextOption,
  setAddJobOffer,
}) => {
  const stripePromise = loadStripe(STRIPE_PK);

  const [selectedOption, setSelectedOption] = useState("card");

  const subscriptions = [
    { duration: "1 months", price: 0, month: 1 },
    { duration: "2 months", price: 10, month: 2 },
    { duration: "3 months", price: 20, month: 3 },
  ];

  const handleSubscriptionClick = (index) => {
    setSelectedSubscription(subscriptions[index]);
    setTotal(subscriptions[index].price);
  };

  return (
    <>
      <div className="text-start fs-4 fw-bold">Payment Process</div>
      <div className="step_number d-flex justify-content-end">
        <p>
          <span style={{ color: "#0095FF" }}>Step 2</span> of 2
        </p>
      </div>
      <div className="stepBorder2"></div>
      <div className="d-flex gap-4">
        <div className="payment_process_left flex-grow-1">
          <p className="text-start text-black fs-5 fw-medium pb-4">
            How long will the add be active?
          </p>
          <div>
            <div
              className={
                "subscription_wrapper d-flex flex-lg-nowrap flex-wrap justify-content-between mb-4 gap-4"
              }>
              {subscriptions.map((sub, index) => (
                <div
                  key={index}
                  className={
                    "subs_item pointer mb-4 mb-lg-0 " +
                    (selectedSubscription?.price === sub?.price
                      ? "bg_clr_99"
                      : "border bg-white")
                  }
                  onClick={() => setSelectedSubscription(sub)}>
                  <h4
                    className={
                      "fs-6 fw-bold " +
                      (selectedSubscription?.price === sub?.price
                        ? "text-white"
                        : "text-black")
                    }>
                    {" "}
                    {sub.duration}
                  </h4>
                  <p
                    className={
                      "fs-4 fw-normal mb-0" +
                      (selectedSubscription?.price === sub?.price
                        ? " text-white"
                        : "")
                    }>
                    ${sub.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="payment_process">
            <p className={"mb-0 text-start fs-6 text-black"}>
              Select payment option
            </p>

            <div className="all_payments_system mb-4">
              <div className="card_wrapper">
                <div className={"card_item d-flex gap-2 align-items-center"}>
                  {/* <div className="form-check-two">
                    <input
                      className=""
                      type="radio"
                      name="card"
                      id="card"
                      checked={selectedOption === "card"}
                    />
                  </div> */}
                  <button
                    className={`${
                      selectedOption === "card"
                        ? "bg_clr_ff border-transparant"
                        : null
                    } card_btn`}
                    onClick={() => setSelectedOption("card")}>
                    <img className={"mt-0"} src={credit} alt="credit card" />
                    <span
                      className={`${
                        selectedOption === "card" ? "text-white" : "text-black"
                      }`}>
                      Card
                    </span>
                  </button>
                </div>

                <div className={"card_item d-flex gap-2 align-items-center"}>
                  {/* <div className="form-check"> */}
                  {/* <input className="" type="radio" name="card" id="card" checked={selectedOption === "paypal"}
                  /> */}
                  {/* </div> */}
                  {/* <button
                    className={`${
                      selectedOption === "paypal"
                        ? "bg_clr_ff border-transparant"
                        : null
                    } card_btn`}
                    onClick={() => setSelectedOption("paypal")}
                  >
                    <img className={"mt-0"} src={paypal} alt="credit card" />{" "}
                    <span
                      className={`${
                        selectedOption === "paypal"
                          ? "text-white"
                          : "text-black"
                      }`}
                    >
                      Pay pal
                    </span>
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          <div className={"selected_subs"}>
            {/* <div className="sub_total d-flex justify-content-between mb-4">
              <p className="fs-6 text-black fw-normal mb-0">Sub Total</p>
              <p className={"fs-6 text-black fw-normal mb-0"}>
                ${selectedSubscription?.price}
              </p>
            </div> */}
            {/*
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
            </div> */}

            {/* <div className="sub_total d-flex justify-content-between mb-4">
              <p className="fs-6 text-black fw-normal mb-0 text_clr_99">
                Voucher
              </p>
              <p className={"fs-6 text-black fw-normal mb-0 text_clr_99"}>
                ${selectedSubscription?.price}
              </p>
            </div> */}

            <div className="sub_total d-flex justify-content-between">
              <p className="fs-5 text-black fw-normal mb-0">Total</p>
              <p className={"fs-5 text-black fw-normal mb-0"}>
                ${selectedSubscription?.price}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-grow-1">
          <div>
            {selectedOption === "card" ? (
              <Elements stripe={stripePromise}>
                <PaymentFormTwo
                  handleSubmit={handleSubmit}
                  addingJob={addingJob}
                  selectedSubscription={selectedSubscription}
                  closeModal={closeModal}
                  setNextOption={setNextOption}
                  setAddJobOfferClose={setAddJobOffer}
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

export default AddJobOfferModalTwo;
