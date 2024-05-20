/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Stripe from "stripe";
import Swal from "sweetalert2";
import v1 from "../../assets/v1.png";
import v2 from "../../assets/v2.png";
import v3 from "../../assets/v3.png";
import v4 from "../../assets/v4.png";
import { STRIPE_SK } from "../../config/config";
import { useCreatePaymentMutation } from "../../features/payment/paymentApi";

const PaymentFormTwo = ({
  handleSubmit,
  addingJob,
  selectedSubscription,
  closeModal,
  setAddJobOfferClose,
  setNextOption,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        color: "#000",
        fontSize: "16px",
      },
      fontWeight: 400,
      width: "100%",

      invalid: {
        iconColor: "#ffc7ee",
        color: "#f00101",
      },
    },
  };
  const [selectedOption, setSelectedOption] = useState("card");

  const { packageInfo } = useSelector((state) => state.payment);
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [createPayment, { isLoading: paymentCreating }] =
    useCreatePaymentMutation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nationality: "",
    zip: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePayment = async () => {
    setIsLoading(true);

    if (!stripe) {
      setIsLoading(false);
      return;
    }

    // const adding = await handleSubmit();

    // if (!adding) {
    //   setIsLoading(false);
    //   return;
    // }

    try {
      const clientSecret = await createPaymentIntent(
        selectedSubscription?.price * 100,
        "usd"
      );

      const cardElement = elements.getElement(CardNumberElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            type: "card",
            card: cardElement,
            billing_details: {
              name: `${user?.first_name + " " + user?.last_name}`,
              address: {
                country: formData?.nationality,
                postal_code: formData?.zip,
              },
            },
          },
        }
      );

      if (error) {
        setIsLoading(false);
        // Swal.fire({
        //   position: "center",
        //   icon: "error",
        //   title: `${error?.message}`,
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        setErrorMessage(error?.message);
      } else if (paymentIntent.status === "succeeded") {
        setIsLoading(false);
        const createPaymentData = {
          transactionId: paymentIntent?.id,
          userId: user?._id,
          amount: selectedSubscription?.price,
          purpose: "Add Job",
        };
        await createPayment(createPaymentData);
        setErrorMessage("");
        await handleSubmit();
      }
    } catch (error) {
      setIsLoading(false);
      // Swal.fire({
      //   position: "center",
      //   icon: "error",
      //   title: `${error?.message}`,
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
      setErrorMessage(error?.message);
    }
  };
  const [countryNames, setCountryNames] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json"
      )
      .then(function (response) {
        setCountryNames(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="container mb-2 pb-5">
        <div className="payment_process_wrapper">
          <div className="payment_card">
            <p className="text-start text-black fs-5 fw-normal pb-4">
              Payment Details
            </p>

            {/* <div className="d-flex justify-content-between align-items-center mb-5">
              <p className="text-black">Use saved card</p>
              <div className="payment_country_select">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="select_card">
                  <option disabled selected>
                    Mastercard ending 234
                  </option>
                  <option>Mastercard ending 234</option>
                </select>
              </div>
            </div> */}

            <div className="card_holder mb-4">
              <label htmlFor="" className="mb-2">
                Name on card
              </label>
              <input
                type="text"
                className="payment_input"
                placeholder="Card name"
              />
            </div>

            <div className="card_holder mb-4">
              <label htmlFor="" className="mb-2">
                Card number
              </label>
              <CardNumberElement
                className="payment_input"
                options={{
                  ...CARD_OPTIONS,
                  placeholder: "Enter card number",
                }}
              />
              <div className="card_img">
                <img src={v1} alt="card" />
                <img src={v2} alt="card" />
                <img src={v3} alt="card" />
                <img src={v4} alt="card" />
              </div>
            </div>
          </div>
          {/* Expiration */}
          <div className="row mt-4">
            <div className="col-lg-6">
              <div className="card_holder mb-4">
                <label htmlFor="" className="mb-2">
                  Expiration
                </label>
                <CardExpiryElement
                  options={CARD_OPTIONS}
                  className="payment_input"
                />
              </div>
            </div>

            <div className="col-lg-6 mt-lg-0 mt-4">
              <div className="payment_card">
                <div className="card_holder mb-4">
                  <label htmlFor="" className="mb-2">
                    CVC
                  </label>
                  <CardCvcElement
                    options={CARD_OPTIONS}
                    className="payment_input"
                  />
                  <div className="card_img1">
                    <img src={v4} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-6">
              <div className="">
                <label htmlFor="" className="mb-2">
                  Country
                </label>
                <div className="payment_country_select">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleInputChange}
                    name="nationality"
                  >
                    <option disabled selected>
                      {" "}
                      Select country
                    </option>
                    {countryNames.map((name, index) => (
                      <option value={name.code} key={index}>
                        {name.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-lg-0 mt-4">
              <label htmlFor="" className="mb-2">
                Zip Code
              </label>
              <div className="payment_card">
                <input
                  type="text"
                  className="payment_input"
                  placeholder="ZIP"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>
            {errorMessage && <p className="my-2 text-danger">{errorMessage}</p>}
          </div>
        </div>
      </div>

      <div className="d-flex gap-4 justify-content-end">
        <button
          onClick={() => setAddJobOfferClose(false)}
          className="bg-none mt-0 text_clr_bc"
        >
          Cancel order
        </button>

        <button
          onClick={handlePayment}
          className="pay_nowbtn_two mt-0"
          disabled={isLoading || paymentCreating || !stripe || addingJob}
        >
          {isLoading || addingJob ? (
            <>
              <div
                className="spinner-border spinner-border-sm me-2"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              Loading...
            </>
          ) : (
            "Pay now"
          )}
        </button>
      </div>
    </>
  );
};

export default PaymentFormTwo;

const createPaymentIntent = async (amountInCents, currency) => {
  const stripe = Stripe(STRIPE_SK);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency,
    });

    return paymentIntent.client_secret;
  } catch (error) {
    console.error("Error on createPayment intent", error);
    throw new Error("Failed to create PaymentIntent");
  }
};
