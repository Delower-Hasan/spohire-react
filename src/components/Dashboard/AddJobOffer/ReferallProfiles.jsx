import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import deleteIcon from "../../../assets/deleteIcon.png";
import locationIcon from "../../../assets/location-icon.svg";
import {
  useDeletePlayerMutation,
  useDeleteUserMutation,
} from "../../../features/auth/authApi";
import Swal from "sweetalert2";
import { userLoggedIn } from "../../../features/auth/authSlice";
import { formatDate } from "../../../utils/formateChatTIme";

const ReferallProfiles = ({
  data,
  footBallCoachImg,
  jobOffersType,
  cancleSubscription,
  user,
}) => {
  console.log(user, "usersdsdd");

  // const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const [deletePlayer, { isLoading }] = useDeletePlayerMutation();
  const handleDelete = async (item, e) => {
    e.stopPropagation();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deletePlayer(item?._id);
        console.log(res, "ddd");
        if (res?.data?.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          if (item?.fullName === `${user?.first_name} ${user?.last_name}`) {
            const response = await cancleSubscription();
          }
        }
      }
    });
  };
  return (
    <div className="job_offers_wrapper">
      <div className="job_offer_items_wrapper">
        {data && data?.length > 0 ? (
          data
            // .slice(startIndex, endIndex)
            .map((item, index) => (
              <SingleJob
                key={index}
                item={item}
                handleDelete={handleDelete}
                jobOffersType={jobOffersType}
              />
            ))
        ) : (
          <div
            className="d-flex justify-content-center align-items-center fs-4"
            style={{ height: "70vh" }}
          >
            {/* No Coaches found */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferallProfiles;

function SingleJob({ item, handleDelete, jobOffersType }) {
  const [bookmark, setBookmark] = useState(false);

  console.log(item, "jkj");
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const handleCLick = () => {
    navigate(
      `${
        jobOffersType === "coach"
          ? "/dashboard/coacheDetails"
          : "/dashboard/viewDetails"
      }/${item?._id}`
    );
  };

  return (
    <>
      <div className="job_offers_item p-3" onClick={handleCLick}>
        <div className="job_offers_item_content d-flex justify-content-between align-items-center">
          <div className="left d-flex align-items-center gap-3">
            <div className="job_offer_item_img">
              <img
                src={
                  item?.image
                    ? `${
                        process.env.NODE_ENV !== "production"
                          ? import.meta.env.VITE_LOCAL_API_URL
                          : import.meta.env.VITE_LIVE_API_URL
                      }/api/v1/uploads/${item?.image}`
                    : footBallCoachImg
                }
                alt="img"
                style={{
                  height: "81px",
                  width: "81px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>

            <div className="job_offer_item_content">
              <div className="job_offer_nameDesignation">
                <h5
                  className="fw-medium fs-6 text_color_36 mb-1"
                  //   onClick={() => handleCLick(item)}
                  style={{ cursor: "pointer" }}
                >
                  {/* {item?.first_name} {item?.last_name} */}
                  {item?.fullName}
                </h5>

                <p className="fs-14 fw-normal text_color_80 mb-1">
                  {item?.subscriptionName}
                </p>
              </div>

              <div className="job_offerItem_address flex-wrap d-flex align-items-center gap-2 gap-md-4">
                <div className="job_offer_location  d-flex align-items-center gap-1">
                  <img src={locationIcon} alt="icon" />
                  <span className="fs-14 fw-normal text_color_80">
                    {item?.nationality}
                  </span>
                </div>

                <div className="job_offer_flag d-flex align-items-center gap-1">
                  {/* <img src={dollarIcon} alt="icon" /> */}
                  <span className="fs-14 fw-normal text_color_80">
                    {item?.email}
                  </span>
                </div>
                <div className="job_offer_flag d-flex align-items-center gap-1">
                  {/* <img src={dollarIcon} alt="icon" /> */}
                  <span className="fs-14 fw-normal text_color_80">
                    Expire Date: {formatDate(item?.expirationDate) ?? "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right d-flex flex-column gap-2">
            <button className="bg-none" onClick={(e) => handleDelete(item, e)}>
              <img src={deleteIcon} alt="" />
            </button>
            {!item?.isSubsCribed && (
              <button
                className="btn btn-primary btn-sm rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/pricingAddProfile/${item?._id}`);
                }}
              >
                Buy subscription
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
