import { useLocation } from "react-router-dom";
import AddJobOffer from "../AddJobOffer/AddJobOffer";
import { useState } from "react";

const MobileButtons = () => {
  let location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddJobOfferClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mobile_btns">
        {(location.pathname === "/dashboard/players") |
        (location.pathname === "/dashboard/coaches") ? (
          ""
        ) : (
          <div className=" d-flex flex-wrap gap-3  gap-md-5 justify-content-center mt-5">
            <button className="filter_btn1 fs_10">Filter options</button>
            <button
              onClick={() =>
                location.pathname === "/dashboard/jobOffers" &&
                handleAddJobOfferClick()
              }
              className="filter_btn1 fs_10"
            >
              {location.pathname === "/dashboard/jobOffers" && `Add job offer`}
              {location.pathname === "/dashboard/players" && "View Details"}
            </button>
          </div>
        )}
      </div>
      {/* <AddJobOffer
        show={isModalOpen}
        onHide={closeModal}
        isModalOpen={isModalOpen}
        style={{ width: "648px" }}
      /> */}
    </>
  );
};
export default MobileButtons;
