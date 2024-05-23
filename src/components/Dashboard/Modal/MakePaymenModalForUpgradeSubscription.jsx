import React, { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import bronze from "../../../assets/bronze.svg";
import checkActive from "../../../assets/white-check.svg";
import PlayerCoachAddPayment from "../../../pages/pricing/PlayerCoachAddPayment";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PK } from "../../../config/config";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import BuySubscriptionAddPayment from "../../../pages/pricing/BuySubscriptionAddPayment";
import { useGetCouponsQuery } from "../../../features/coupon/apiSlice";

const MakePaymenModalForUpgradeSubscription = ({ modalRef, closeModal }) => {
  const options = [
    "All analytics features",
    "Up to 250,000 tracked visits",
    "Normal support",
    "Up to 3 team members",
  ];
  const stripePromise = loadStripe(STRIPE_PK);

  const { subscriptions, subscriptionTimeline } = useSelector(
    (state) => state.auth
  );

  // coupons
  const { data: coupons } = useGetCouponsQuery();
  const [coupon, setCoupon] = useState("");

  const [price, setPrice] = useState(10);

  useEffect(() => {
    setPrice(subscriptions?.price);
    setCouponUsed(false);
  }, [subscriptions?.price]);

  const isCouponFound = coupons?.data.filter(
    (item) =>
      item.code.toLowerCase().trim() === coupon?.toLowerCase()?.trim() &&
      item.status === true
  );

  const [isCouponUsed, setCouponUsed] = useState(false);

  const upDatePriceHandler = () => {
    if (!isCouponUsed) {
      // Assuming isCouponFound is defined and contains the coupon details
      const discount = isCouponFound[0]?.discount;
      if (discount) {
        setPrice((prev) => prev - prev * (discount / 100));
        setCouponUsed(true);
      } else {
        console.error("Coupon details not found!");
      }
    } else {
      // Inform the user that the coupon has already been used
      alert("Coupon has already been used.");
    }
  };

  return (
    <div className="">
      <div className="">
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
                        {subscriptions.subscriptionName}
                      </p>
                    </div>

                    <p className={` mb-3 mpl_price_length`}>
                      {subscriptionTimeline}
                    </p>
                    <h3 className="text-start mpl_price mb-3">
                      ${subscriptions?.price}
                    </h3>

                    <p className={`active_include`}>What's included</p>

                    <div className="d-flex flex-column gap-4 pt-3 pb-5">
                      {options.map((option, index) => (
                        <div
                          key={index}
                          className="d-flex align-items-center gap-2"
                          // key={index}
                        >
                          <img className="mt-0" src={checkActive} alt="" />
                          <p className={"active_color"}>{option}</p>
                        </div>
                      ))}
                    </div>

                    {/* <div
                      className="d-flex justify-content-end"
                   
                    >
                      <p className="modify_price">Modify</p>
                    </div> */}
                  </div>
                </div>

                {/* <div className="auto_renewal">
                  <p className="text-start py-2">Auto - renewal</p>
                </div> */}
                <div className="terms_conditions">
                  <p className="py-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley .
                  </p>

                  <Link to={"#"}>Terms and conditions</Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="make_payment_right">
                <div className="heading mb-5">
                  <h3>Make the payment</h3>
                </div>

                {/* <div className="sub_total py-4">
                  <p>Sub total</p>
                  <p>${subscriptions?.price}</p>
                </div> */}

                <div className="gift_voucher d-flex align-items-center gap-4">
                  <div className="input_form pb-4">
                    <label htmlFor="name" className="d-block label_name mb-2">
                      Gift Card / Voucher code
                    </label>
                    <input
                      id="name"
                      onChange={(e) => setCoupon(e.target.value)}
                      type="text"
                      placeholder="Enter code number"
                    />
                  </div>

                  <button className="yes" onClick={upDatePriceHandler}>
                    Yes
                  </button>
                </div>

                <div className="voucher d-flex justify-content-between pb-4">
                  <p>Voucher</p>
                  {isCouponFound && isCouponFound.length > 0 ? (
                    <p className={"fs-6 text-black fw-normal mb-0 text_clr_99"}>
                      {isCouponFound[0].discount}%
                    </p>
                  ) : (
                    <p className={"fs-6 text-black fw-normal mb-0 text_clr_99"}>
                      $0.00
                    </p>
                  )}
                </div>

                <div className="total d-flex justify-content-between">
                  <p>Total</p>
                  <p>${price.toFixed(2)}</p>
                </div>

                <div className="payment_details pt-5">
                  {/* <div className="heading pb-4">
                    <h4>Payment Details</h4>
                  </div> */}

                  {/* <div className="saved_card d-flex align-items-center justify-content-between pb-4">
                    <p>Use saved card</p>
                    <select class="form-select w-50">
                      <option selected>Select</option>
                      <option value="1">Mastercard ending 234</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div> */}
                </div>

                <Elements stripe={stripePromise}>
                  <BuySubscriptionAddPayment
                    modalRef={modalRef}
                    closeModal={closeModal}
                    price={price.toFixed(2)}
                  />
                </Elements>

                {/* <div className="card_number">
                  <div className="input_form pb-4">
                    <label htmlFor="name" className="d-block label_name mb-2">
                      Card number
                    </label>
                    <input id="name" type="number" placeholder="Card number" />
                  </div>
                </div>

                <div className="card_expiration d-flex">
                  <div className="input_form pb-4">
                    <label htmlFor="name" className="d-block label_name mb-2">
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
                    <label htmlFor="name" className="d-block label_name mb-2">
                      CVC
                    </label>
                    <input id="name" type="number" placeholder="CVC" />
                  </div>
                </div>

                <div className="loation d-flex justify-content-between">
                  <div className="country">
                    <div className="input_form pb-4">
                      <label htmlFor="name" className="d-block label_name mb-2">
                        Country
                      </label>
                      <input id="name" type="text" placeholder="Country" />
                    </div>
                  </div>

                  <div className="zip_code">
                    <div className="input_form pb-4">
                      <label htmlFor="name" className="d-block label_name mb-2">
                        Zip code
                      </label>
                      <input id="name" type="text" placeholder="Zip code" />
                    </div>
                  </div>
                </div> */}
              </div>

              {/* <div className="d-flex justify-content-end py-4">
                <div className="action_btn d-flex gap-4">
                  <button onClick={() => setMakePaymentClose(false)}>
                    Cancel
                  </button>
                  <button className="addplayer_btn">Pay now</button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePaymenModalForUpgradeSubscription;
