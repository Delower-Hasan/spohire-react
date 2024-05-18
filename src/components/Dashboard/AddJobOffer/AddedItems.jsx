import React, { useCallback, useEffect, useState } from "react";
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
  const [jobOffersType, setJobOffersType] = useState("Manager");
  const [active, setActive] = useState("active");
  const { user } = useSelector((state) => state.auth);
  const [filterData, setFilterData] = useState([]);

  const [cancleSubscription] = useCancleSubscriptionMutation();

  const { data } = useGetUserReferallsQuery();

  useEffect(() => {
    const filtered =
      active === "expired"
        ? data?.filter((u) => u.isActive === false)
        : data?.filter((u) => u.isActive);

    setFilterData(filtered);
  }, [active]);

  useEffect(() => {
    const filteredDatas = data?.filter((u) => u.isActive);
    setFilterData(filteredDatas);
  }, [data]);

  return (
    <div className="job_offers_wrapper">
      <div className="job_offers_topBtn ">
        <div className="job_offers_topBtn_left d-flex gap-4 mb-4">
          <button
            className={`fs-6 fw-medium text_color_80 ${
              active === "active" && "activeBtn2"
            }`}
            onClick={() => setActive("active")}
          >
            {/* {user?.role === "Coach" ? "Players" : "Player"} */}
            Active
          </button>

          <button
            className={`fs-6 fw-medium text_color_80 ${
              active === "expired" && "activeBtn2"
            }`}
            onClick={() => setActive("expired")}
          >
            expired
          </button>
        </div>

        <div className="job_offers_topBtn_left d-flex gap-4">
          <button
            className={`fs-6 fw-medium text_color_80 ${
              jobOffersType === "player" && "activeBtn"
            }`}
            onClick={() => setJobOffersType("player")}
          >
            Players
          </button>

          {user?.role === "Manager" && (
            <button
              className={`fs-6 fw-medium text_color_80 ${
                jobOffersType === "coach" && "activeBtn"
              }`}
              onClick={() => setJobOffersType("coach")}
            >
              Coaches
            </button>
          )}

          {user?.role === "Coach" && (
            <button
              className={`fs-6 fw-medium text_color_80 ${
                jobOffersType === "coach" && "activeBtn"
              }`}
              onClick={() => setJobOffersType("coach")}
            >
              {/* {user?.role === "Coach" ? "Players" : "Player"} */}
              Coaches
            </button>
          )}

          <button
            className={`fs-6 fw-medium text_color_80 ${
              jobOffersType === "job" && "activeBtn"
            }`}
            onClick={() => setJobOffersType("job")}
          >
            Job Offers
          </button>
          <button
            className={`fs-6 fw-medium text_color_80 ${
              jobOffersType === "announcement" && "activeBtn"
            }`}
            onClick={() => setJobOffersType("announcement")}
          >
            Announcements
          </button>
        </div>
      </div>

      {jobOffersType === "job" && <JobOffers isActive={active} />}
      {jobOffersType === "announcement" && <MyAnnouncement isActive={active} />}

      {jobOffersType === "coach" && (
        <ReferallProfiles
          data={filterData?.filter((i) => i.role === "Coach")}
          jobOffersType={jobOffersType}
          cancleSubscription={cancleSubscription}
          user={user}
        />
      )}

      {jobOffersType === "player" && (
        <ReferallProfiles
          data={filterData?.filter((i) => i.role === "Player")}
          jobOffersType={jobOffersType}
          cancleSubscription={cancleSubscription}
          user={user}
        />
      )}
    </div>
  );
};

export default AddedItems;
