import { useEffect, useState } from "react";
import AnnouncementOverview from "./AnnouncementOverview";
import JobOfferOverview from "./JobOfferOverview";
import MessagesOverview from "./MessagesOverview";
import "./OverView.css";
import PlayerOverview from "./PlayerOverview";
import RecentlyObserved from "./RecentlyObserved";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const OverView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 86400000);
    return () => clearInterval(intervalId);
  }, []);
  // Extract individual components
  const dayOfMonth = currentDate.getDate();
  const month = currentDate.toLocaleDateString("en-US", { month: "long" });
  const year = currentDate.getFullYear();
  const dayOfWeek = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <>
      <div className="overview_wrapper">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex">
            <h1>
              Hello {user?.first_name} {user?.last_name}!
            </h1>
            {/* {!user?.isCreatedProfile && ( */}
            <p className="ms-4 createProFIleButton ">
              {" "}
              <Link
                className="text-white"
                style={{
                  fontSize: "12px",
                  textTransform: "capitalize",
                  letterSpacing: "2px",
                  fontWeight: "400",
                }}
                to="/dashboard/editPlayerDetals"
              >
                Update profile
              </Link>
              {/* if you are looking for clubs */}
            </p>
            {/* )} */}
          </div>
          <div className="date">
            <h3>{dayOfWeek}</h3>
            <p>
              {dayOfMonth} {month} {year}
            </p>
          </div>
        </div>
        {user?.role === "Manager" && <PlayerOverview user={user} />}
        {user?.role === "Coach" && <PlayerOverview user={user} />}
        <div className="container">
          <div className="row mt-4 ps-0">
            <div className="col-lg-6 ps-0 pe-lg-3 pe-0">
              <JobOfferOverview />
            </div>
            <div className="col-lg-6 mt-lg-0 mt-4 pe-0 ps-lg-3 ps-0">
              <AnnouncementOverview />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-6 ps-0 pe-lg-3 pe-0">
              <RecentlyObserved />
            </div>
            <div className="col-lg-6 mt-lg-0 mt-4 mb-lg-0 mb-5 pe-0 ps-lg-3 ps-0 ">
              {user?.role !== "Other" && <MessagesOverview />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverView;
