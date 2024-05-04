import credit from "../../assets/creditcard.png";
import v1 from "../../assets/v1.png";
import v2 from "../../assets/v2.png";
import v3 from "../../assets/v3.png";
import v4 from "../../assets/v4.png";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { STRIPE_SK } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  useCreatePaymentMutation,
  useUpdatePaymentStatusMutation,
} from "../../features/payment/paymentApi";
import axios from "axios";
import {
  useAddPlayerMutation,
  useBuySubscriptionForPlayerMutation,
} from "../../features/auth/authApi";
import { setExpireDate } from "../../utils/setExpireDate";
import { userLoggedIn } from "../../features/auth/authSlice";

const AddPlayerPaymentFormOwn = ({ gallaryImage, experience, socials }) => {
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

  const dispatch = useDispatch();

  const { addPlayerPackage } = useSelector((state) => state.payment);
  const { user, addPlayerInfo } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  ;

  const [addPlayer, { isLoading: adding }] = useAddPlayerMutation();

  const [createPayment, { isLoading: paymentCreating }] =
    useCreatePaymentMutation();

  const [buySubscriptionForPlayer, { isLoading: buying }] =
    useBuySubscriptionForPlayerMutation();

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

    const date = new Date();

    const playerData = {
      ...addPlayerInfo,
      experience: experience,
      social_media: socials,
      isSubsCribed: true,
      subscriptionName: addPlayerPackage?.name,
      isCreatedProfile: true,
      subscriptionDate: date,
      expirationDate: setExpireDate(addPlayerPackage?.month),
    };

    const formData = new FormData();

    Object.keys(playerData).forEach((key) => {
      const propertyValue = playerData[key];

      if (Array.isArray(propertyValue)) {
        propertyValue.forEach((element, index) => {
          if (typeof element === "object") {
            Object.keys(element).forEach((elementKey) => {
              const elementValue = element[elementKey];
              formData.append(`${key}[${index}][${elementKey}]`, elementValue);
            });
          } else {
            formData.append(`${key}[]`, element);
          }
        });
      } else {
        formData.append(key, propertyValue);
      }
    });

    gallaryImage?.forEach((img, index) => {
      formData.append(`gallery`, img);
    });

    const paymentRes = await addPlayer(formData);
    console.log(paymentRes, "pafkljfkld");
    if (paymentRes?.error?.data?.message) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${paymentRes?.error?.data?.message}`,
      });
      setIsLoading(false);
      return;
    }

    try {
      const clientSecret = await createPaymentIntent(
        addPlayerPackage?.price * 100,
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
        console.error("error", error);
        setIsLoading(false);

        Swal.fire({
          position: "center",
          icon: "error",
          title: `${error?.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (paymentIntent.status === "succeeded") {
        setIsLoading(false);

        console.log(paymentIntent, "payyyy");

        // createing payment
        const createPaymentData = {
          transactionId: paymentIntent?.id,
          userId: user?._id,
          planName: addPlayerPackage?.name,
          amount: addPlayerPackage?.price,
        };
        const createPaymentRes = await createPayment(createPaymentData);
        // console.log(createPaymentRes, "kfjalkfred");

        const paymentRes = await buySubscriptionForPlayer({
          id: user?._id,
        });

        const infoUser = JSON.parse(localStorage.getItem("spohireAuth"));
        localStorage.setItem(
          "spohireAuth",
          JSON.stringify({ ...infoUser, user: paymentRes?.data?.data })
        );

        dispatch(
          userLoggedIn({
            ...infoUser,
            user: paymentRes?.data?.data,
          })
        );

        // navigation
        navigate("/dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${error?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoading(false);
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
        <h2 className="payment_title">
          Payment <span>Process</span>
        </h2>
        <div className="payment_process_wrapper">
          <p>Select payment option</p>
          <div className="all_payments_system">
            <div className="card_wrapper">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="card"
                  id="card"
                  checked={selectedOption === "card"}
                />
              </div>
              <button
                className="card_btn"
                onClick={() => handleButtonClick("card")}
              >
                {" "}
                <img src={credit} alt="credit card" /> <span>Card</span>
              </button>
            </div>
            {/* <div className="card_wrapper">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paypal"
                  id="paypal"
                  checked={selectedOption === "paypal"}
                />
              </div>
              <button
                className="card_btn"
                onClick={() => handleButtonClick("paypal")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <g clipPath="url(#clip0_1198_1487)">
                    <path d="M12.1573 2.90057C11.9846 2.73612 11.7697 2.62271 11.5365 2.57291C11.3032 2.5231 11.0607 2.53886 10.8359 2.61842C10.7723 2.63967 10.7158 2.67808 10.6727 2.72941C10.6296 2.78075 10.6015 2.843 10.5915 2.9093L10.4897 3.60892C10.3353 4.66563 9.43117 5.45041 8.36325 5.45467H6.90874C6.82763 5.45469 6.74885 5.48182 6.68494 5.53176C6.62103 5.58171 6.57565 5.65158 6.55602 5.73029L5.46515 10.0938C5.45179 10.1473 5.45081 10.2033 5.46228 10.2573C5.47376 10.3113 5.49739 10.362 5.53139 10.4056C5.56538 10.4491 5.60884 10.4843 5.65848 10.5085C5.70811 10.5328 5.76261 10.5454 5.81784 10.5454H7.63594C7.71706 10.5454 7.79583 10.5182 7.85975 10.4683C7.92366 10.4183 7.96904 10.3485 7.98867 10.2698L8.64684 7.63641H10.065C11.1536 7.64002 12.1033 6.89803 12.363 5.84084L12.6314 4.76524C12.7242 4.44026 12.7292 4.0965 12.6459 3.76895C12.5627 3.4414 12.3941 3.14177 12.1573 2.90057Z" fill="#03A9F4" />
                    <path d="M0.363532 14.9089C0.16271 14.9088 -6.81578e-05 14.746 2.14097e-08 14.5452C2.14097e-08 14.5155 0.00364761 14.486 0.0108064 14.4573L0.37444 13.0101V12.9948L0.738074 11.5483C0.757702 11.4696 0.803082 11.3997 0.866996 11.3498C0.93091 11.2999 1.00969 11.2727 1.0908 11.2727H2.01586C2.51793 11.2726 2.92499 11.6795 2.92513 12.1816C2.92513 12.2559 2.91603 12.33 2.89803 12.4021L2.80711 12.7658C2.70597 13.1706 2.34223 13.4545 1.92497 13.4545H1.01151L0.716973 14.6333C0.697297 14.7121 0.651804 14.7821 0.587746 14.832C0.523689 14.882 0.444756 14.909 0.363532 14.9089ZM1.19331 12.7271H1.9249C1.96544 12.727 2.00478 12.7134 2.03667 12.6883C2.06856 12.6633 2.09117 12.6283 2.10091 12.589L2.19183 12.2253C2.19872 12.1985 2.19938 12.1705 2.19375 12.1434C2.18812 12.1163 2.17636 12.0909 2.15936 12.069C2.14237 12.0472 2.12059 12.0295 2.09571 12.0174C2.07082 12.0053 2.04349 11.9991 2.01582 11.9992H1.37511L1.19331 12.7271ZM4.2521 14.9089H3.73431C3.17763 14.909 2.72625 14.4578 2.72611 13.9012C2.72609 13.8187 2.73619 13.7366 2.75618 13.6566L2.80418 13.4631C2.9118 13.0289 3.3023 12.7247 3.74959 12.7264H4.26737C4.82406 12.7273 5.27455 13.1794 5.2736 13.7361C5.27346 13.8181 5.26331 13.8998 5.24336 13.9794L5.19536 14.1729C5.08764 14.606 4.69837 14.9097 4.2521 14.9089ZM3.46231 13.8333C3.45205 13.8746 3.45132 13.9177 3.46018 13.9594C3.46905 14.001 3.48728 14.0401 3.51349 14.0737C3.53969 14.1073 3.5732 14.1344 3.61146 14.1531C3.64971 14.1718 3.69173 14.1816 3.73431 14.1816H4.2521C4.30659 14.1818 4.35955 14.1637 4.40253 14.1302C4.44551 14.0967 4.47602 14.0498 4.48919 13.9969L4.53719 13.8035C4.54746 13.7621 4.54819 13.719 4.53932 13.6773C4.53046 13.6357 4.51223 13.5966 4.48602 13.563C4.45981 13.5295 4.42631 13.5023 4.38805 13.4836C4.34979 13.4649 4.30778 13.4552 4.26519 13.4551H3.7474C3.69292 13.4549 3.63996 13.4731 3.59698 13.5065C3.554 13.54 3.52348 13.587 3.51031 13.6398L3.46231 13.8333Z" fill="#283593" />
                    <path d="M4.72706 14.9089C4.67182 14.9089 4.61732 14.8963 4.56768 14.8721C4.51804 14.8478 4.47457 14.8126 4.44058 14.7691C4.40658 14.7256 4.38294 14.6749 4.37146 14.6208C4.35999 14.5668 4.36097 14.5109 4.37433 14.4573L4.73796 13.0028C4.78658 12.8078 4.98402 12.6891 5.17905 12.7377C5.37404 12.7863 5.49274 12.9838 5.44413 13.1788L5.0805 14.6333C5.06084 14.7121 5.01535 14.7821 4.95129 14.832C4.88723 14.882 4.80829 14.909 4.72706 14.9089Z" fill="#283593" />
                    <path d="M9.09058 14.9089C9.03535 14.9089 8.98084 14.8963 8.93121 14.8721C8.88157 14.8478 8.8381 14.8126 8.8041 14.7691C8.7701 14.7256 8.74647 14.6749 8.73499 14.6208C8.72351 14.5668 8.72449 14.5109 8.73786 14.4573L9.10149 13.0101V12.9948L9.46512 11.5483C9.48475 11.4696 9.53013 11.3997 9.59405 11.3498C9.65796 11.2999 9.73674 11.2727 9.81785 11.2727H10.7429C11.245 11.2726 11.652 11.6795 11.6522 12.1816C11.6522 12.2559 11.6431 12.33 11.6251 12.4021L11.5342 12.7658C11.433 13.1706 11.0693 13.4545 10.652 13.4545H9.73859L9.44406 14.6333C9.42437 14.7121 9.37888 14.7821 9.31481 14.832C9.25075 14.882 9.17181 14.909 9.09058 14.9089ZM9.92036 12.7272H10.6527C10.6932 12.7271 10.7326 12.7134 10.7645 12.6884C10.7964 12.6633 10.819 12.6284 10.8287 12.589L10.9196 12.2254C10.9265 12.1986 10.9272 12.1706 10.9215 12.1435C10.9159 12.1164 10.9041 12.0909 10.8871 12.0691C10.8702 12.0473 10.8484 12.0296 10.8235 12.0175C10.7986 12.0054 10.7713 11.9991 10.7436 11.9992H10.1022L9.92036 12.7272ZM12.9792 14.9089H12.4614C11.9047 14.909 11.4533 14.4579 11.4532 13.9012C11.4531 13.8187 11.4632 13.7366 11.4832 13.6566L11.5312 13.4631C11.6388 13.029 12.0293 12.7247 12.4766 12.7264H12.9944C13.5511 12.7263 14.0025 13.1775 14.0026 13.7341C14.0026 13.8166 13.9925 13.8987 13.9726 13.9787L13.9246 14.1722C13.8169 14.6064 13.4264 14.9106 12.9792 14.9089ZM12.1894 13.8333C12.1791 13.8746 12.1784 13.9178 12.1872 13.9594C12.1961 14.0011 12.2143 14.0402 12.2405 14.0737C12.2667 14.1073 12.3002 14.1345 12.3385 14.1532C12.3768 14.1719 12.4188 14.1816 12.4614 14.1817H12.9792C13.0336 14.1818 13.0866 14.1637 13.1296 14.1302C13.1726 14.0967 13.2031 14.0498 13.2162 13.9969L13.2642 13.8035C13.2745 13.7622 13.2752 13.719 13.2664 13.6774C13.2575 13.6357 13.2393 13.5966 13.2131 13.5631C13.1869 13.5295 13.1534 13.5023 13.1151 13.4836C13.0768 13.4649 13.0348 13.4552 12.9922 13.4551H12.4745C12.42 13.455 12.367 13.4731 12.324 13.5066C12.281 13.5401 12.2505 13.587 12.2374 13.6399L12.1894 13.8333Z" fill="#03A9F4" />
                    <path d="M13.4539 14.9089C13.3986 14.9089 13.3441 14.8963 13.2945 14.8721C13.2448 14.8478 13.2014 14.8126 13.1674 14.7691C13.1334 14.7256 13.1097 14.6749 13.0983 14.6208C13.0868 14.5668 13.0878 14.5109 13.1011 14.4573L13.4648 13.0028C13.5134 12.8078 13.7108 12.6891 13.9059 12.7377C14.1008 12.7863 14.2195 12.9838 14.1709 13.1788L13.8073 14.6333C13.7876 14.7121 13.7422 14.7821 13.6781 14.832C13.614 14.882 13.5351 14.909 13.4539 14.9089Z" fill="#03A9F4" />
                    <path d="M6.90883 14.5454C6.84895 14.5453 6.79 14.5305 6.73722 14.5022C6.68444 14.4739 6.63947 14.4331 6.60629 14.3832L5.87905 13.2923C5.76758 13.1253 5.81268 12.8995 5.97979 12.788C6.1469 12.6765 6.37267 12.7216 6.48414 12.8887L7.21138 13.9796C7.32302 14.1465 7.27823 14.3723 7.11133 14.484C7.05139 14.5241 6.98092 14.5454 6.90883 14.5454Z" fill="#283593" />
                    <path d="M6.18137 15.6361C5.98055 15.636 5.8178 15.4731 5.81787 15.2723C5.8179 15.1873 5.84771 15.105 5.90211 15.0397L7.72021 12.858C7.84893 12.7038 8.07832 12.6831 8.23254 12.8118C8.38676 12.9405 8.40745 13.1699 8.27873 13.3241L6.46063 15.5059C6.42646 15.5467 6.38374 15.5795 6.33548 15.602C6.28722 15.6245 6.23461 15.6361 6.18137 15.6361Z" fill="#283593" />
                    <path d="M14.9085 14.9088C14.8532 14.9088 14.7987 14.8962 14.7491 14.8719C14.6994 14.8477 14.656 14.8125 14.622 14.769C14.588 14.7254 14.5643 14.6747 14.5529 14.6207C14.5414 14.5667 14.5424 14.5108 14.5557 14.4572L15.283 11.5482C15.3316 11.3532 15.529 11.2345 15.724 11.2831C15.919 11.3317 16.0377 11.5292 15.9891 11.7242L15.2619 14.6332C15.2422 14.712 15.1968 14.782 15.1327 14.8319C15.0686 14.8819 14.9897 14.9089 14.9085 14.9088Z" fill="#03A9F4" />
                    <path d="M10.9565 0.99307C10.7838 0.795279 10.5707 0.63679 10.3316 0.52828C10.0925 0.41977 9.83296 0.363757 9.57039 0.364015H5.45417C5.36895 0.364013 5.28645 0.393939 5.22105 0.448568C5.15566 0.503198 5.11152 0.579061 5.09636 0.662912L3.64186 8.66259C3.6061 8.86021 3.73734 9.04937 3.93496 9.08513C3.9563 9.08898 3.97798 9.09092 3.99966 9.09092H6.1814C6.26251 9.09091 6.34129 9.06377 6.4052 9.01383C6.46912 8.96389 6.5145 8.89401 6.53413 8.81531L7.19301 6.18195H8.36314C9.79347 6.17633 11.0043 5.12477 11.2103 3.70933L11.3921 2.46646C11.4291 2.204 11.4094 1.93665 11.3343 1.68247C11.2591 1.42828 11.1303 1.19319 10.9565 0.99307Z" fill="#283593" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1198_1487">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span>Paypal</span>
              </button>
            </div> */}
          </div>

          <div className="payment_card">
            <p className="mb_20">payment_process_wrapper</p>
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
          {/* Expiration */}
          <div className="row mt-4">
            <div className="col-lg-6">
              <CardExpiryElement
                options={CARD_OPTIONS}
                className="payment_input"
              />
            </div>
            <div className="col-lg-6 mt-lg-0 mt-4">
              <div className="payment_card">
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

          <div className="row mt-4">
            <div className="col-lg-6">
              <div className="">
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
          </div>
          <div className="d-flex justify-content-center">
            <button
              onClick={handlePayment}
              className="pay_nowbtn"
              disabled={isLoading || adding || paymentCreating || !stripe}
            >
              {isLoading ? (
                <>
                  <div
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>{" "}
                  Loading...
                </>
              ) : (
                "Pay Now"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPlayerPaymentFormOwn;

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
