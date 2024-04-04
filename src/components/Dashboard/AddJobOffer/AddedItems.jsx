import React, { useState } from "react";
import JobOffers from "./JobOffers";
import MyAnnouncement from "./MyAnnouncements";
import { useDispatch, useSelector } from "react-redux";
import footBallCoachImg from "../../../assets/footballCoach.png";
import {
  useCancleSubscriptionMutation,
  useGetUserReferallsQuery,
} from "../../../features/auth/authApi";
import Swal from "sweetalert2";
import { userLoggedIn } from "../../../features/auth/authSlice";
import ReferallProfiles from "./ReferallProfiles";

const AddedItems = () => {
  const [jobOffersType, setJobOffersType] = useState("player");
  const [active, setActive] = useState("active");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log();

  const [cancleSubscription, { isLoading }] = useCancleSubscriptionMutation();

  const { data } = useGetUserReferallsQuery();

  console.log(data, "fdaftga");

  const handleUndoAddProfile = async () => {
    console.log("dd");
    try {
      const response = await cancleSubscription();
      if (response?.data?.success) {
        const previousUserInfo = JSON.parse(
          localStorage.getItem("spohireAuth")
        );

        const newUserInfo = {
          accessToken: previousUserInfo?.accessToken,
          user: response.data.data,
        };

        dispatch(userLoggedIn(newUserInfo));

        localStorage.setItem("spohireAuth", JSON.stringify(newUserInfo));
        Swal.fire({
          icon: "success",
          title: "Successsful!",
        });
      }
      if (response?.error?.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response?.error?.data?.message}`,
        });
      }

      console.log(response, "ress");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    }
  };

  return (
    <div className="job_offers_wrapper">
      <div className="job_offers_topBtn ">
        <div className="job_offers_topBtn_left d-flex gap-4 mb-4">
          <button
            className={`fs-6 fw-medium text_color_80 ${
              active === "active" && "activeBtn2"
            }`}
            onClick={() => setActive("active")}>
            {/* {user?.role === "Coach" ? "Players" : "Player"} */}
            Active
          </button>

          {user?.role === "Manager" && (
            <button
              className={`fs-6 fw-medium text_color_80 ${
                active === "expired" && "activeBtn2"
              }`}
              onClick={() => setActive("expired")}>
              {/* {user?.role === "Coach" ? "Players" : "Player"} */}
              expired
            </button>
          )}
        </div>

        <div className="job_offers_topBtn_left d-flex gap-4">
          <button
            className={`fs-6 fw-medium text_color_80 ${
              jobOffersType === "player" && "activeBtn"
            }`}
            onClick={() => setJobOffersType("player")}>
            {/* {user?.role === "Coach" ? "Players" : "Player"} */}
            Players
          </button>

          {user?.role === "Manager" && (
            <button
              className={`fs-6 fw-medium text_color_80 ${
                jobOffersType === "coach" && "activeBtn"
              }`}
              onClick={() => setJobOffersType("coach")}>
              {/* {user?.role === "Coach" ? "Players" : "Player"} */}
              Coaches
            </button>
          )}

          {user?.role === "Coach" && (
            <button
              className={`fs-6 fw-medium text_color_80 ${
                jobOffersType === "coach" && "activeBtn"
              }`}
              onClick={() => setJobOffersType("coach")}>
              {/* {user?.role === "Coach" ? "Players" : "Player"} */}
              Coaches
            </button>
          )}

          <button
            className={`fs-6 fw-medium text_color_80 ${
              jobOffersType === "job" && "activeBtn"
            }`}
            onClick={() => setJobOffersType("job")}>
            Job Offers
          </button>
          <button
            className={`fs-6 fw-medium text_color_80 ${
              jobOffersType === "announcement" && "activeBtn"
            }`}
            onClick={() => setJobOffersType("announcement")}>
            Announcements
          </button>
        </div>

        {/* <div className="job_offers_topBtn_right">
    <button className="bg-transparent border-0 text_color_fb">
      Clear All
    </button>
  </div> */}
      </div>

      {jobOffersType === "job" && <JobOffers />}
      {jobOffersType === "announcement" && <MyAnnouncement />}
      {jobOffersType === "coach" && (
        <ReferallProfiles
          data={data?.filter((i) => i.role === "Coach")}
          footBallCoachImg={footBallCoachImg}
          jobOffersType={jobOffersType}
          cancleSubscription={cancleSubscription}
          user={user}
        />
      )}

      {jobOffersType === "player" && (
        <ReferallProfiles
          data={data?.filter((i) => i.role === "Player")}
          footBallCoachImg={footBallCoachImg}
          jobOffersType={jobOffersType}
          cancleSubscription={cancleSubscription}
          user={user}
        />
      )}
    </div>
  );
};

export default AddedItems;
