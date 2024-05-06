import { Accordion } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import appliedJobsIcon from "../../../assets/AppliedIcon.svg";
import billing from "../../../assets/BILLING.png";
import activesidebarbottomshape from "../../../assets/activesidebarbottomshape.svg";
import announcementOffer from "../../../assets/announcementOffer-icon.svg";
import basketBallIcon from "../../../assets/basketBall-icon.svg";
import coach from "../../../assets/coach.png";
import coachesIcon from "../../../assets/coaches-icon.svg";
import DashbordLogo from "../../../assets/dashbord-logo.png";
import jobOfferIcon from "../../../assets/joboffer-icon.svg";
import logoutIcon from "../../../assets/logout-icon.svg";
import messageIcon from "../../../assets/messages-icon.svg";
import notificationIcon from "../../../assets/notification-icon.svg";
import observedIcon from "../../../assets/observed-icon.svg";
import overviewIcon from "../../../assets/overview-icon.svg";
import rightArrow from "../../../assets/rightClosemenuicon.svg";
import settingsIcon from "../../../assets/settings-icon.svg";
import transfarIcon from "../../../assets/transfar-icon.svg";
import "./DashbordSidebar.css";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../features/auth/authSlice";
import {
  useGetMyNotificationsQuery,
  useUpdateNotificationMutation,
} from "../../../features/notification/notificationApi";

// eslint-disable-next-line react/prop-types
const DashbordSidebar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useGetMyNotificationsQuery();
  const [updateNotification] = useUpdateNotificationMutation();

  const unseenNotifications = data?.filter((i) => i.isSeen === false) || [];

  const handleNotification = async () => {
    await updateNotification();
    navigate("/dashboard/notification");
  };

  const handleLoggout = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("spohireAuth");
    navigate("/login");
  };
  console.log(user?.role, "user");
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // State to track accordion open/close status
  const [isAccordionOpen1, setIsAccordionOpen1] = useState(false); // State to track accordion open/close status

  const handleAccordionToggle = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleAccordionToggle1 = () => {
    setIsAccordionOpen1(!isAccordionOpen1);
  };

  return (
    <div className="dashbord_sidebar">
      <div className="text-center sidebar_logo">
        <Link to="/dashboard">
          <img src={DashbordLogo} alt="logo" />
        </Link>
      </div>

      <div className="dashbord_sidebar_content d-flex flex-column justify-content-between">
        <div className="top">
          <div className="menu_link">
            <ul className="menu_wrapper_one list-unstyled m-0">
              <li className="overview">
                <Link
                  to="/dashboard"
                  className="text-decoration-none d-flex align-items-center gap-4">
                  <img src={overviewIcon} alt="icon" />
                  <span to={"#"} className="text_color_E3 text-capitalize fs-6">
                    overview
                  </span>
                </Link>
              </li>

              <Accordion className="nav_item">
                <Accordion.Item eventKey="0" className="border-0">
                  {user?.role !== "Player" && (
                    <Accordion.Header
                      className="p-0"
                      onClick={handleAccordionToggle1}>
                      <li
                        className="d-flex align-items-center"
                        style={{ gap: "12px" }}>
                        <Link
                          to={"#"}
                          className="text-decoration-none d-flex align-items-center gap-4">
                          <img src={transfarIcon} alt="icon" />
                          <span
                            to={"#"}
                            className="text_color_E3 text-capitalize fs-6">
                            Transfer Market
                          </span>
                        </Link>
                        <img
                          className="mt-1"
                          src={
                            isAccordionOpen1
                              ? activesidebarbottomshape
                              : rightArrow
                          }
                          alt="rightArrow"
                        />
                      </li>
                    </Accordion.Header>
                  )}

                  <Accordion.Body className="pb-0">
                    <ul
                      className="list-unstyled"
                      style={{ paddingLeft: "30px" }}>
                      {user?.role !== "Player" && (
                        <li className="nav_item">
                          <Link
                            to={"/dashboard/players"}
                            className="text-decoration-none d-flex align-items-center gap-3">
                            <img src={basketBallIcon} alt="icon" />
                            <span
                              to={"#"}
                              className="text_color_E3 text-capitalize fs-6">
                              Players
                            </span>
                          </Link>
                        </li>
                      )}

                      {user?.role !== "Coach" && user?.role !== "Player" && (
                        <li className="">
                          <Link
                            to="/dashboard/coaches"
                            className="text-decoration-none d-flex align-items-center gap-3">
                            <img src={coachesIcon} alt="icon" />
                            <span
                              to={"#"}
                              className="text_color_E3 text-capitalize fs-6">
                              Coaches
                            </span>
                          </Link>
                        </li>
                      )}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <li className="nav_item">
                <Link
                  to={"/dashboard/jobOffers"}
                  className="text-decoration-none d-flex align-items-center gap-4">
                  <img src={jobOfferIcon} alt="icon" />
                  <span className="text_color_E3 text-capitalize fs-6">
                    Job Offers
                  </span>
                </Link>
              </li>

              <li className="nav_item">
                <Link
                  to="/dashboard/announcements"
                  className="text-decoration-none d-flex align-items-center gap-4">
                  <img src={announcementOffer} alt="icon" />
                  <span to={"#"} className="text_color_E3 text-capitalize fs-6">
                    Announcements
                  </span>
                </Link>
              </li>
            </ul>

            <ul className="menu_wrapper_two list-unstyled m-0">
              <Accordion className="border-0">
                <Accordion.Item eventKey="1" className="border-0">
                  <Accordion.Header
                    className="p-0 w-100"
                    onClick={handleAccordionToggle}>
                    <li
                      className="d-flex align-content-center"
                      style={{ gap: "12px" }}>
                      <Link
                        to={"#"}
                        className="text-decoration-none d-flex align-items-center gap-4">
                        <img src={settingsIcon} alt="icon" />
                        <span
                          to={"#"}
                          className="text_color_E3 text-capitalize fs-6">
                          My Activity
                        </span>
                      </Link>
                      <img
                        className="mt-1"
                        src={
                          isAccordionOpen
                            ? activesidebarbottomshape
                            : rightArrow
                        }
                        alt="rightArrow"
                      />
                    </li>
                  </Accordion.Header>
                  <Accordion.Body className="pb-0">
                    <ul
                      className="list-unstyled"
                      style={{ paddingLeft: "30px" }}>
                      <li className="nav_item">
                        <Link
                          to="/dashboard/addedItems"
                          className="text-decoration-none d-flex align-items-center gap-3">
                          <img src={settingsIcon} alt="icon" />
                          <span
                            to={"#"}
                            className="text_color_E3 text-capitalize fs-6">
                            Added
                          </span>
                        </Link>
                      </li>

                      <li className="nav_item">
                        <Link
                          to={"/dashboard/myAppliedJobs"}
                          className="text-decoration-none d-flex align-items-center gap-3">
                          <img src={appliedJobsIcon} alt="icon" />
                          <span className="text_color_E3 text-capitalize fs-6">
                            Applied job
                          </span>
                        </Link>
                      </li>

                      <li className="nav_item">
                        <Link
                          to="/dashboard/observed"
                          className="text-decoration-none d-flex align-items-center gap-3">
                          <img src={observedIcon} alt="icon" />
                          <span
                            to={"#"}
                            className="text_color_E3 text-capitalize fs-6">
                            Observed
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </ul>
          </div>

          <ul className="menu_wrapper_two list-unstyled m-0">
            {user?.role !== "Other" && (
              <li className="nav_item">
                <Link
                  to="/dashboard/messages"
                  className="text-decoration-none d-flex align-items-center gap-4">
                  <img src={messageIcon} alt="icon" />
                  <span className="text_color_E3 text-capitalize fs-6">
                    Messages
                  </span>
                </Link>
              </li>
            )}
            <li className="nav_item">
              <Link
                // to="/dashboard/notification"
                className="text-decoration-none d-flex align-items-center gap-4"
                style={{ cursor: "pointer" }}
                onClick={handleNotification}>
                <img src={notificationIcon} alt="icon" />
                <span
                  className="text_color_E3 text-capitalize fs-6"
                  style={{ position: "relative" }}>
                  Notifications
                  {unseenNotifications?.length > 0 && (
                    <span
                      class="position-absolute top-0  translate-middle badge rounded-circle bg-primary"
                      style={{ right: -30 }}>
                      {unseenNotifications?.length}
                    </span>
                  )}
                </span>
              </Link>
            </li>

            <Accordion className="">
              <Accordion.Item eventKey="3" className="border-0">
                <Accordion.Header className="p-0">
                  <li
                    className="d-flex align-content-center"
                    style={{ gap: "12px" }}>
                    <Link
                      to={"#"}
                      className="text-decoration-none d-flex align-items-center gap-4">
                      <img src={settingsIcon} alt="icon" />
                      <span className="text_color_E3 text-capitalize fs-6">
                        {" "}
                        Settings{" "}
                      </span>
                    </Link>
                    <img
                      className="mt-1"
                      src={
                        isAccordionOpen1 ? activesidebarbottomshape : rightArrow
                      }
                      alt="rightArrow"
                    />
                  </li>
                </Accordion.Header>

                <Accordion.Body className="pb-0">
                  <ul className="list-unstyled">
                    <li className="nav_item">
                      <Link
                        to="/dashboard/settings"
                        className="text-decoration-none d-flex align-items-center gap-3">
                        <img src={coach} alt="icon" />
                        <span className="text_color_E3 text-capitalize fs-6">
                          Settings
                        </span>
                      </Link>
                    </li>
                    <li className="nav_item">
                      <Link
                        to="/dashboard/password"
                        className="text-decoration-none d-flex align-items-center gap-3">
                        <img src={coach} alt="icon" />
                        <span className="text_color_E3 text-capitalize fs-6">
                          Password
                        </span>
                      </Link>
                    </li>
                    {/* <li className="nav_item">
                        <Link
                          to="/dashboard/notification"
                          className="text-decoration-none d-flex align-items-center gap-3"
                        >
                          <img src={notification} alt="icon" />
                          <span
                            to={"#"}
                            className="text_color_E3 text-capitalize fs-6"
                          >
                            Notification
                          </span>
                        </Link>
                      </li> */}
                    <li className="nav_item">
                      <Link
                        to="/dashboard/billing"
                        className="text-decoration-none d-flex align-items-center gap-3">
                        <img src={billing} alt="icon" />
                        <span
                          to={"#"}
                          className="text_color_E3 text-capitalize fs-6">
                          Billing
                        </span>
                      </Link>
                    </li>
                    <li className="nav_item">
                      <Link
                        to="/dashboard/help-and-support"
                        className="text-decoration-none d-flex align-items-center gap-3">
                        <img src={billing} alt="icon" />
                        <span
                          to={"#"}
                          className="text_color_E3 text-capitalize fs-6">
                          Help and Support
                        </span>
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </ul>
        </div>

        {/* unsed accodiron */}
        <div>
          <Accordion className="border-0">
            <Accordion.Item eventKey="1" className="border-0"></Accordion.Item>
          </Accordion>
        </div>
        {/* unsed accodiron */}

        <div className="bottom">
          <div className="logout">
            <button
              type="button"
              className="text-decoration-none d-flex align-items-center gap-4 bg-none text_clr_70"
              onClick={handleLoggout}>
              <img src={logoutIcon} alt="icon" className="text_clr_70" />
              <span to={"#"} className="text_clr_70 text-capitalize fs-6">
                logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashbordSidebar;
