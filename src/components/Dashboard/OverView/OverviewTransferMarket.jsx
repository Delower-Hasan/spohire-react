import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import add2icon from "../../../assets/add2icon.png";
import add3icon from "../../../assets/add3icon.png";
import addpicon from "../../../assets/addpicon.png";
import "../../../pages/pricing/Pricing.css";
import AddJobOffer from "../AddJobOffer/AddJobOffer";
import AddAnnouncement from "../Announcements/AddAnnouncement";
import AddCoachModal from "../Modal/AddCoachModal";
import AddPlayerModal from "../Modal/AddPlayerModal";
import BuySubscriptionModal from "../Modal/BuySubscriptionModal";
import AnnouncementOverview from "./AnnouncementOverview";
import JobOfferOverview from "./JobOfferOverview";
import MessagesOverview from "./MessagesOverview";
import PlayerOverview from "./PlayerOverview";
import RecentlyObserved from "./RecentlyObserved";

const OverviewTransferMarket = () => {
  const { user } = useSelector((state) => state.auth);
  const [isAddPlayer, setIsAddPlayer] = useState(false);
  const [isAddCoach, setIsAddCoach] = useState(false);
  const [isJobOffer, setIsJobOffer] = useState(false);
  const [isAnnouncementModalOpen, setAnnouncementIsModalOpen] = useState(false);

  const handleAddPlayerModal = () => {
    setIsAddPlayer(!isAddPlayer);
  };

  const handleAddCoach = () => {
    setIsAddCoach(!isAddCoach);
  };

  const handleJobOffer = () => {
    setIsJobOffer(!isJobOffer);
  };

  const handleAddAnnouncementClick = () => {
    setAnnouncementIsModalOpen(!isAnnouncementModalOpen);
  };

  const today = moment().format("dddd, MMMM D, YYYY");

  return (
    <>
      <div className="over_tm_wrapper">
        <p className="transfer_title text-end">{today}</p>
        <p className="transfer_title">Transfer Market</p>

        <div className="buttons_design">
          {user?.isSubsCribed ? (
            <>
              <button onClick={handleAddPlayerModal}>
                <img src={addpicon} alt="addpicon" />
                <span>Add Player</span>
              </button>

              {user?.role !== "Player" && (
                <button onClick={handleAddCoach}>
                  <img src={addpicon} alt="addpicon" />
                  <span>Add Coach</span>
                </button>
              )}

              <button onClick={handleJobOffer}>
                <img src={add2icon} alt="addpicon" />
                <span>Add Job Offer</span>
              </button>

              <button onClick={handleAddAnnouncementClick}>
                <img src={add2icon} alt="addpicon" />
                <span>Add Announcement</span>
              </button>

              {user?.subscriptionName !== "Gold" && (
                <button
                  className="modal_link"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop">
                  <img src={add3icon} alt="addpicon" />
                  <span>Upgrade Subscription</span>
                </button>
              )}
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
        </div>

        {/* buy subscription coatch */}
        <BuySubscriptionModal user={user} />
        {/* buy subscription coatch */}

        {user?.role !== "Player" && user?.isActive && (
          <PlayerOverview user={user} />
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

        {isAddPlayer && <AddPlayerModal setAddPlayerModal={setIsAddPlayer} />}

        {isAddCoach && <AddCoachModal setAddCoachModal={setIsAddCoach} />}

        {/* modals */}

        {isJobOffer && <AddJobOffer setAddJobOffer={setIsJobOffer} />}

        {isAnnouncementModalOpen && (
          <AddAnnouncement
            setAnnouncementIsModalOpen={setAnnouncementIsModalOpen}
          />
        )}
      </div>
    </>
  );
};

export default OverviewTransferMarket;
