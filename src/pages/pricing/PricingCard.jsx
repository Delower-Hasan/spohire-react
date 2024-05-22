import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import bronze from "../../assets/bronze.svg";
import gold from "../../assets/gold.svg";
import check from "../../assets/indigo-check.svg";
import silver from "../../assets/silver.svg";
import MakePaymenModalForUpgradeSubscription from "../../components/Dashboard/Modal/MakePaymenModalForUpgradeSubscription";
import { setSubscription } from "../../features/auth/authSlice";

const priceOptions = [
  {
    pic: bronze,
    title: "BRONZE",
    price: 10,
    color: "#CD7F32",
  },
  {
    pic: silver,
    title: "SILVER",
    price: 20,
    color: "#C5CDE7",
  },
  {
    pic: gold,
    title: "GOLD",
    price: 30,
    color: "#FFD029",
  },
];

const options = [
  "All analytics features",
  "Up to 250,000 tracked visits",
  "Normal support",
  "Up to 3 team members",
];

const PricingCard = () => {
  const isPricingPage = location.pathname === "/pricing";
  const dispatch = useDispatch();
  const [activeCard, setActiveCard] = useState(isPricingPage ? 1 : 0);
  const [modalOpen, setModalOpen] = useState(false);

  const modalRef = useRef(null);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleCardClick = (index) => {
    setActiveCard(index);
    dispatch(setSubscription(index));
  };

  const route = useLocation();

  return (
    <div>
      <div className="row g-4">
        {priceOptions.map((data, index) => (
          <div
            key={index}
            className={`col-lg-4 ${modalOpen ? "d-none" : ""}`}
            onClick={() => {
              handleCardClick(index);
            }}
          >
            <div
              className={`price_card ${activeCard === index ? "active" : ""}`}
            >
              <div className="d-flex align-items-center gap-4 mb-5">
                <div className="model">
                  <img className="mt-0" src={data.pic} alt="" />
                </div>
                <p style={{ color: `${data.color}` }} className="title">
                  {data.title}
                </p>
              </div>

              <p
                className={` mb-3 ${
                  activeCard === index ? "active_price" : "price"
                }`}
              >
                ${data.price}{" "}
                {location.pathname === "/dashboard" ||
                location.pathname === "/dashboard/coaches" ||
                location.pathname === "/dashboard/players" ? (
                  ""
                ) : (
                  <span>/month</span>
                )}
              </p>

              <p
                className={` ${
                  activeCard === index ? "active_include" : "include"
                }`}
              >
                What's included
              </p>

              <div className="d-flex flex-column gap-4 pb-4">
                {options.map((option, idx) => (
                  <div className="d-flex align-items-center gap-2" key={idx}>
                    <img
                      className="mt-0"
                      src={activeCard === index ? check : check}
                      alt=""
                    />
                    <p
                      style={{ fontSize: "18px" }}
                      className={`${
                        activeCard === index ? "active_color" : "active_color2"
                      }`}
                    >
                      {option}
                    </p>
                  </div>
                ))}
              </div>

              {!isPricingPage && (
                <div className="d-flex">
                  <button
                    // disabled={location.pathname === "/pricing"}
                    onClick={() => {
                      isPricingPage ? null : openModal();
                    }}
                    className="d-inline-flex"
                    style={{
                      padding: "17px 66px",
                      borderRadius: "96px",
                      backgroundColor: `${
                        activeCard === index ? "#fff" : "#2B3674"
                      }`,
                      color: `${activeCard === index ? "#2B3674" : "#FFFFFF"}`,
                      fontWeight: "500",
                      fontSize: "20px",
                    }}
                  >
                    {location.pathname === "/dashboard" ||
                    location.pathname === "/dashboard/coaches" ||
                    location.pathname === "/dashboard/players"
                      ? "Choose"
                      : "Subscribe"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="model" ref={modalRef}>
          <MakePaymenModalForUpgradeSubscription
            modalRef={modalRef}
            closeModal={closeModal}
            
          />
        </div>
      )}
    </div>
  );
};

export default PricingCard;
