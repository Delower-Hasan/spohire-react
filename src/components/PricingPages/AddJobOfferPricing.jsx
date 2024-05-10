import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import bronze from "../../assets/bronze.svg";
import checkActive from "../../assets/white-check.svg";
import "./PricingPages.css";
import useClickOutside from "../../hooks/useClickOutside";
import { useSelector } from "react-redux";

const AddJobOfferPricing = ({ setSelectedPackages }) => {
  const [activeCard, setActiveCard] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState(15);
  const [nextPaymentModal, setNextPaymentModal] = useState(false);
  const wrapperRef = useClickOutside(() => setNextPaymentModal(false));
  const { subscriptions } = useSelector((store) => store.auth);
  const packages = [
    { duration: "1 months", price: 10, month: 1 },
    { duration: "2 months", price: 15, month: 2 },
    { duration: "3 months", price: 20, month: 3 },
  ];

  const handleCardClick = (index, price) => {
    setActiveCard(index);
    setSelectedPrice(price);
    setSelectedPackages(packages[index]);
  };

  const handleNextPaymentModal = () => {
    setNextPaymentModal(!nextPaymentModal);
  };

  return (
    <div
      style={{
        padding:
          location.pathname === "/dashboard/players" ||
          location.pathname === "/dashboard"
            ? "15px"
            : null,
      }}
      className={`addjoboffer_pricing_wrapper`}
    >
      {location.pathname === "/pricing" ? (
        <h2>
          add job offer <br />
          period of active job offer
        </h2>
      ) : (
        <h3 className="pb-4">Longer advertiser options</h3>
      )}

      <div
        className={`d-flex flex-lg-row flex-column justify-content-center align-items-center`}
        style={{
          gap: "30px",
          marginBottom:
            location.pathname === "/dashboard/players" || "/dashboard"
              ? "50px"
              : "128px",
        }}
      >
        <div
          className={`monthly_cards ${activeCard === 0 ? "active" : ""}`}
          onClick={() => handleCardClick(0, 10)}
        >
          <div>
            <h3>
              $10 <span>/ 1 month</span>
            </h3>
          </div>
        </div>
        <div
          className={`monthly_cards ${activeCard === 1 ? "active" : ""}`}
          onClick={() => handleCardClick(1, 15)}
        >
          <div>
            <h3>
              $15 <span>/ 2 month</span>
            </h3>
          </div>
        </div>
        <div
          className={`monthly_cards ${activeCard === 2 ? "active" : ""}`}
          onClick={() => handleCardClick(2, 20)}
        >
          <div>
            <h3>
              $20 <span>/ 3 month</span>
            </h3>
          </div>
        </div>
      </div>

      <div
        className={`${
          location.pathname === "/dashboard/players"
            ? "d-flex justify-content-end pb-4"
            : ""
        }`}
      >
        {location.pathname === "/pricing" ? (
          <h2>price of announcement</h2>
        ) : null}

        <div className="d-flex justify-content-center">
          <div
            className={`${
              location.pathname === "/pricing" ? "monthly_cards" : null
            } active`}
            style={{
              maxWidth: `${
                location.pathname === "/dashboard/players" ? "0" : "723px"
              }`,

              width: `${
                location.pathname === "/dashboard/players" ? "100%" : "100%"
              }`,

              justifyContent: `${
                location.pathname === "/dashboard/players" ? "end" : "center"
              }`,
            }}
          >
            {location.pathname === "/pricing" ? (
              <div>
                <h3>$15</h3>
              </div>
            ) : null}
          </div>
        </div>

        {location.pathname === "/pricing" ? null : (
          <div>
            <h3
              style={{ color: "#2B3674", fontSize: "36px", fontWeight: "700" }}
              className="d-flex justify-content-end"
            >
              Total : {subscriptions.price + selectedPrice}$
            </h3>
          </div>
        )}
      </div>

      {/* {location.pathname === "/dashboard/players" ? (
        <div className="d-flex justify-content-end py-4">
          <div className="action_btn d-flex gap-4">
            <button>Cancel</button>
            <button className="addplayer_btn" onClick={handleNextPaymentModal}>
              Next
            </button>
          </div>
        </div>
      ) : null} */}

      {/* {nextPaymentModal && (
        <div className="addplayer_modal">
          <div ref={wrapperRef} className="inner position-relative">
            <div className="icon position-absolute top-0">
              <button>
                <IoMdCloseCircleOutline
                  style={{ color: "#C5CDE7", fontSize: "26px" }}
                />
              </button>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="make_payment_left">
                    <div className="selected_subscription mb-4">
                      <div className={`price_card active`}>
                        <div className="d-flex align-items-center gap-4 mb-5">
                          <div className="model">
                            <img className="mt-0" src={bronze} alt="" />
                          </div>
                          <p style={{ color: "#CD7F32" }} className="title">
                            BRONZE
                          </p>
                        </div>

                        <p className={` mb-3 mpl_price_length`}>1 months</p>
                        <h3 className="text-start mpl_price mb-3">$30</h3>

                        <p className={`active_include`}>What's included</p>

                        <div className="d-flex flex-column gap-4 pt-3 pb-5">
                          {options.map((option) => (
                            <div
                              className="d-flex align-items-center gap-2"
                              // key={index}
                            >
                              <img className="mt-0" src={checkActive} alt="" />
                              <p className={"active_color"}>{option}</p>
                            </div>
                          ))}
                        </div>

                        <div className="d-flex justify-content-end">
                          <p className="modify_price">Modify</p>
                        </div>
                      </div>
                    </div>

                    <div className="auto_renewal">
                      <p className="text-start py-2">Auto - renewal</p>
                    </div>
                    <div className="terms_conditions">
                      <p className="py-4">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley .
                      </p>

                      <Link to={"#"}>Terms and conditions</Link>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="make_payment_right">
                    <div className="heading">
                      <h3>Make the payment</h3>
                    </div>

                    <div className="sub_total py-4">
                      <p>Sub total</p>
                      <p>$20.00</p>
                    </div>

                    <div className="gift_voucher d-flex align-items-center gap-4">
                      <div className="input_form pb-4">
                        <label
                          htmlFor="name"
                          className="d-block label_name mb-2">
                          Gift Card / Voucher code
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Enter code number"
                        />
                      </div>

                      <button className="yes">Yes</button>
                    </div>

                    <div className="voucher d-flex justify-content-between pb-4">
                      <p>Voucher</p>
                      <p>$0.00</p>
                    </div>

                    <div className="total d-flex justify-content-between">
                      <p>Total</p>
                      <p>$20.00</p>
                    </div>

                    <div className="payment_details pt-5">
                      <div className="heading pb-4">
                        <h4>Payment Details</h4>
                      </div>

                      <div className="saved_card d-flex align-items-center justify-content-between pb-4">
                        <p>Use saved card</p>
                        <select class="form-select w-50">
                          <option selected>Select</option>
                          <option value="1">Mastercard ending 234</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                    </div>

                    <div className="card_name">
                      <div className="input_form pb-4">
                        <label
                          htmlFor="name"
                          className="d-block label_name mb-2">
                          Name on card
                        </label>
                        <input id="name" type="text" placeholder="Card name" />
                      </div>
                    </div>

                    <div className="card_number">
                      <div className="input_form pb-4">
                        <label
                          htmlFor="name"
                          className="d-block label_name mb-2">
                          Card number
                        </label>
                        <input
                          id="name"
                          type="number"
                          placeholder="Card number"
                        />
                      </div>
                    </div>

                    <div className="card_expiration d-flex">
                      <div className="input_form pb-4">
                        <label
                          htmlFor="name"
                          className="d-block label_name mb-2">
                          Expiration
                        </label>
                        <span className="d-flex gap-2">
                          <input
                            className="w-25"
                            id="name"
                            type="number"
                            placeholder="08"
                          />
                          /
                          <input
                            className="w-25"
                            id="name"
                            type="number"
                            placeholder="26"
                          />
                        </span>
                      </div>

                      <div className="input_form pb-4">
                        <label
                          htmlFor="name"
                          className="d-block label_name mb-2">
                          CVC
                        </label>
                        <input id="name" type="number" placeholder="CVC" />
                      </div>
                    </div>

                    <div className="loation d-flex justify-content-between">
                      <div className="country">
                        <div className="input_form pb-4">
                          <label
                            htmlFor="name"
                            className="d-block label_name mb-2">
                            Country
                          </label>
                          <input id="name" type="text" placeholder="Country" />
                        </div>
                      </div>

                      <div className="zip_code">
                        <div className="input_form pb-4">
                          <label
                            htmlFor="name"
                            className="d-block label_name mb-2">
                            Zip code
                          </label>
                          <input id="name" type="text" placeholder="Zip code" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end py-4">
                    <div className="action_btn d-flex gap-4">
                      <button>Cancel</button>
                      <button className="addplayer_btn">Pay now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default AddJobOfferPricing;
