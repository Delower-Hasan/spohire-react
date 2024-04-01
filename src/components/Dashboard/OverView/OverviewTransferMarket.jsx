import React from "react";
import { useSelector } from "react-redux";
import add2icon from "../../../assets/add2icon.png";
import add3icon from "../../../assets/add3icon.png";
import addpicon from "../../../assets/addpicon.png";
import PriceRange from "../../../pages/pricing/PriceRange";
import "../../../pages/pricing/Pricing.css";
import BuySubscriptionModalContent from "../../PricingPages/BuySubscriptionModalContent";
import AnnouncementOverview from "./AnnouncementOverview";
import JobOfferOverview from "./JobOfferOverview";
import MessagesOverview from "./MessagesOverview";
import PlayerOverview from "./PlayerOverview";
import RecentlyObserved from "./RecentlyObserved";

const OverviewTransferMarket = () => {
  const { user } = useSelector((state) => state.auth);

  // console.log("user role detect", user);

  return (
    <>
      <div className="over_tm_wrapper">
        <p className="transfer_title text-end">Monday, February 26, 2024</p>
        <p className="transfer_title">Transfer Market</p>
        <div className="buttons_design">
          {user?.isSubsCribed ? (
            <>
              <button>
                <img src={addpicon} alt="addpicon" />
                <span>Add Player</span>
              </button>

              <button>
                <img src={addpicon} alt="addpicon" />
                <span>Add Coach</span>
              </button>

              <button>
                <img src={add2icon} alt="addpicon" />
                <span>Add Job Offer</span>
              </button>

              <button>
                <img src={add2icon} alt="addpicon" />
                <span>Add Announcement</span>
              </button>

              <button
                className="modal_link"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <img src={add3icon} alt="addpicon" />{" "}
                <span>Upgrade Subscription</span>{" "}
              </button>
            </>
          ) : (
            <>
              <button>
                <img src={addpicon} alt="addpicon" />
                <span>Add Player</span>
              </button>

              <button>
                <img src={addpicon} alt="addpicon" />
                <span>Add Coach</span>
              </button>

              <button>
                <img src={add2icon} alt="addpicon" />
                <span>Add Job Offer</span>
              </button>

              <button>
                <img src={add2icon} alt="addpicon" />
                <span>Add Announcement</span>
              </button>

              <button
                className="modal_link"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
                <img src={add3icon} alt="addpicon" />
                <span>Buy Subscription</span>
              </button>
            </>
          )}

          {/* {user.role == "Coach" && <button className="modal_link"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop" > <img src={add3icon} alt="addpicon" /> <span>Buy dfdsfSubscription</span> </button>
          } */}
        </div>
        {/* buy subscription coatch */}
        <BuySubscriptionModal user={user} />
        {/* buy subscription coatch */}

        {user?.role === "Manager" ? (
          <PlayerOverview user={user} />
        ) : (
          <PlayerOverview />
        )}

        <div className="container">
          <div className="row mt-4 ps-0">
            <div className="col-lg-4 ps-0 pe-lg-3 pe-0">
              <JobOfferOverview />
            </div>
            <div className="col-lg-8 mt-lg-0 mt-4 pe-0 ps-lg-3 ps-0">
              <AnnouncementOverview />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-8 ps-0 pe-lg-3 pe-0">
              <RecentlyObserved />
            </div>
            <div className="col-lg-4 mt-lg-0 mt-4 mb-lg-0 mb-5 pe-0 ps-lg-3 ps-0 ">
              {user?.role !== "Other" && <MessagesOverview />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewTransferMarket;

function BuySubscriptionModal({ user }) {
  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div style={{ paddingBottom: "150px" }}>
                <PriceRange
                  component={<BuySubscriptionModalContent user={user} />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
