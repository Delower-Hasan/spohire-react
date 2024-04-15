import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import addIcon from "../../../assets/addIcon.svg";
import arrowDown from "../../../assets/arrow_down.svg";
import AvatarImg from "../../../assets/avatar.svg";
import billingIcon from "../../../assets/billing_icon.svg";
import logo from "../../../assets/dashbord-logo.png";
import filterIcon from "../../../assets/filterIcon.svg";
import helpIcon from "../../../assets/help_icon.svg";
import hoverBilling from "../../../assets/hover-billing.svg";
import hoverBuy from "../../../assets/hover-buy.svg";
import hoverHelp from "../../../assets/hover-help.svg";
import hoverProfile from "../../../assets/hover-profile.svg";
import hoverSettings from "../../../assets/hover-settings.png";
import logoutIcon from "../../../assets/logout_icon.svg";
import messageIcon from "../../../assets/message-icon2.svg";
import notificationIcon from "../../../assets/notification_icon.svg";
import profileIcon from "../../../assets/profile_icon.svg";
import settingsIcon from "../../../assets/setting_icon.png";
import silverIcon from "../../../assets/silver_icon.svg";
import subscriptionIcon from "../../../assets/subcription_icon.svg";
import AddJobOffer from "../AddJobOffer/AddJobOffer";
import AddAnnouncement from "../Announcements/AddAnnouncement";
import "./Topbar.css";

const Topbar = () => {
  const [filterAnnouncement, setFilterAnnouncement] = useState(false);
  const [filter, setFilter] = useState(false);
  const [playerFilter, setPlayerFilter] = useState(false);
  const [coachFilter, setCoachFilter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isAnnouncementModalOpen, setAnnouncementIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [addPlayerModal, setAddPlayerModal] = useState(false);

  console.log("user", user);

  let location = useLocation();

  // announcement state
  const myDivRef1 = useRef(null);
  const handleFilterAnnouncementModal = () => {
    setFilterAnnouncement(!filterAnnouncement);
  };
  const handleButtonClick1 = (event) => {
    event.stopPropagation();
    handleFilterAnnouncementModal();
  };

  // addplayer modal
  const handleAddPlayerClick = () => {
    setAddPlayerModal(!addPlayerModal);
  };
  // addplyer modal -/end

  // announcemnet modal fn end--------

  const handleIsDropDownOpen = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  // joboffer modal--------------
  const myDivRef = useRef(null);

  const handleFilterModal = () => {
    console.log("Filter");
    setFilter(!filter);
  };

  // const handleButtonClick = (event) => {
  //   event.stopPropagation();
  //   handleFilterModal();
  // };
  // joboffer modal-------------

  // player modal ----
  const playerRef = useRef(null);

  const handlePlayerFilterModal = (event) => {
    event.stopPropagation();
    setPlayerFilter(!playerFilter);
  };

  // player modal ----

  // coach modal ----
  const coachRef = useRef(null);

  const handleCoachFilterModal = (event) => {
    event.stopPropagation();
    setCoachFilter(!coachFilter);
  };

  // coach modal ----

  // outside close ------------------

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (myDivRef.current && !myDivRef.current.contains(event.target)) ||
        (myDivRef1.current && !myDivRef1.current.contains(event.target)) ||
        (playerRef.current && !playerRef.current.contains(event.target)) ||
        (coachRef.current && !coachRef.current.contains(event.target))
      ) {
        setFilter(false);
        setFilterAnnouncement(false);
        setPlayerFilter(false);
        setCoachFilter(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // add job offer modal

  const handleAddJobOfferClick = () => {
    setIsModalOpen(true);
  };

  // close modalo
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // announcement modal start

  const handleAddAnnouncementClick = () => {
    // navigate("/dashboard/createAnnouncements");
    setAnnouncementIsModalOpen(true);
  };
  const closeAnnouncementModal = () => {
    setAnnouncementIsModalOpen(false);
  };

  const expirationDate = new Date(user?.expirationDate);
  const formattedExpirationDate = expirationDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const profileMenu = [
    {
      icon: profileIcon,
      onHover: hoverProfile,
      menuName: "profile",
      link: "/dashboard/viewProfile",
    },
    {
      icon: subscriptionIcon,
      onHover: hoverBuy,
      menuName: "Buy Subscription",
      link: "#",
    },
    {
      icon: settingsIcon,
      onHover: hoverSettings,
      menuName: "Settings",
      link: "#",
    },
    {
      icon: helpIcon,
      onHover: hoverHelp,
      menuName: "Help",
      link: "#",
    },
    {
      icon: billingIcon,
      onHover: hoverBilling,
      menuName: "Billing",
      link: "/dashboard/viewProfile",
    },
  ];

  return (
    <>
      <div
        className={`${
          isModalOpen | isAnnouncementModalOpen
            ? "position_static"
            : "position-fixed"
        } dashbord_topbar`}
      >
        <div className="topbar_desk">
          <div className="dashbord_topbar_wrapper d-flex justify-content-between align-items-center">
            <div className="dashbord_topbar_title">
              {location.pathname === "/dashboard/viewDetails" ||
              location.pathname === "/dashboard/coacheDetails" ||
              location.pathname == "/dashboard/coachesProfile" ||
              location.pathname == "/dashboard/messages" ||
              location.pathname === "/dashboard/editAnnouncements" ? (
                <button></button>
              ) : (
                <>
                  <h2 className="text_color_36 fs-4 fw-medium text-capitalize pb-1">
                    {location.pathname === "/dashboard" && user?.isSubsCribed
                      ? `Hello ${user?.first_name} ${user?.last_name} `
                      : ""}

                    {location.pathname === "/dashboard/jobOffers" &&
                      "job offer"}

                    {location.pathname.startsWith("/dashboard/jobDetails") &&
                      "job description"}

                    {location.pathname === "/dashboard/basicinfo" &&
                      "job offer"}

                    {location.pathname.includes("/dashboard/jobApplicants") &&
                      "Applicants"}

                    {location.pathname === "/dashboard/players" &&
                      "Players List"}

                    {location.pathname === "/dashboard/createAnnouncements" &&
                      "Create Announcements"}

                    {location.pathname === "/dashboard/announcements" &&
                      "Announcements"}

                    {location.pathname === "/dashboard/password" && "Password"}
                    {location.pathname === "/dashboard/settings" && "Settings"}
                    {location.pathname === "/dashboard/help-and-support" &&
                      "Help and Support"}

                    {location.pathname === "/dashboard/notification" &&
                      "Notifications"}

                    {location.pathname === "/dashboard/billing" &&
                      "Billing history"}

                    {location.pathname === "/dashboard/observed" && "Observed"}

                    {location.pathname === "/dashboard/addedItems" &&
                      "My Added Items"}

                    {location.pathname === "/dashboard/viewProfile" &&
                    user?.isSubsCribed
                      ? `Hello ${user?.first_name} ${user?.last_name} `
                      : ""}

                    {location.pathname == "/dashboard/editPlayerDetals" &&
                    user?.isSubsCribed
                      ? `Hello ${user?.first_name} ${user?.last_name} `
                      : ""}

                    {location.pathname === "/dashboard/myAppliedJobs" &&
                      "My Applied Jobs"}

                    {location.pathname === "/dashboard/coaches" &&
                      "Coaches List"}

                    {location.pathname.startsWith("/dashboard/messages") &&
                      "Messages"}
                  </h2>

                  {location.pathname === "/dashboard" ||
                  location.pathname === "/dashboard/viewProfile" ||
                  location.pathname == "/dashboard/editPlayerDetals" ? (
                    <>
                      {user?.isSubsCribed ? (
                        <>
                          {user?.subscriptionName === "Silver" && (
                            <div className="d-flex align-items-center gap-2">
                              <p
                                className="font-bold d-inline-flex gap-2"
                                style={{
                                  fontSize: "10px",
                                  color: "#8A8988",
                                  border: "1px solid #8A8988",
                                  padding: "5px 10px",
                                  borderRadius: "28px",
                                }}
                              >
                                <img src={silverIcon} alt="silver-icon" />
                                Silver
                              </p>
                              <span
                                style={{
                                  fontSize: "12px",
                                  fontWeight: "500",
                                  color: "#949494",
                                }}
                              >
                                Until {formattedExpirationDate}
                              </span>
                            </div>
                          )}

                          {user?.subscriptionName === "Gold" && (
                            <div className="d-flex align-items-center gap-2">
                              <p
                                className="font-bold d-inline-flex gap-2"
                                style={{
                                  fontSize: "10px",
                                  color: "#EBB111",
                                  border: "1px solid #FFD029",
                                  padding: "5px 10px",
                                  borderRadius: "28px",
                                }}
                              >
                                <img src={silverIcon} alt="silver-icon" />
                                Silver
                              </p>
                              <span
                                style={{
                                  fontSize: "12px",
                                  fontWeight: "500",
                                  color: "#EBB111",
                                }}
                              >
                                Until {formattedExpirationDate}
                              </span>
                            </div>
                          )}

                          {user?.subscriptionName === "Bronze" && (
                            <div className="d-flex align-items-center gap-2">
                              <p
                                className="font-bold d-inline-flex gap-2"
                                style={{
                                  fontSize: "10px",
                                  color: "#CD7F32",
                                  border: "1px solid #CD7F32",
                                  padding: "5px 10px",
                                  borderRadius: "28px",
                                }}
                              >
                                <img src={silverIcon} alt="silver-icon" />
                                Silver
                              </p>
                              <span
                                style={{
                                  fontSize: "12px",
                                  fontWeight: "500",
                                  color: "#CD7F32",
                                }}
                              >
                                Until {formattedExpirationDate}
                              </span>
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text_clr_70 fw-medium">No subscription</p>
                      )}
                    </>
                  ) : null}
                </>
              )}
            </div>

            {location.pathname === "/dashboard" ||
            location.pathname === "/dashboard/viewProfile" ||
            location.pathname == "/dashboard/editPlayerDetals" ? (
              <div className="right_searchItem d-flex justify-content-between align-items-center gap-4">
                <div className="search_item">
                  <input id="search_input" type="text" placeholder="Search" />
                </div>

                <button className="message_icon bg-none">
                  <img src={messageIcon} alt="message-icon" />
                </button>

                <button className="notification_icon bg-none">
                  <img src={notificationIcon} alt="notification-icon" />
                </button>

                <div className="userprofile d-flex gap-3 align-items-center position-relative">
                  <div className="userImg">
                    <img src={AvatarImg} alt="" />
                  </div>
                  <div className="user_info">
                    {/* drop down here */}
                    <button
                      onClick={handleIsDropDownOpen}
                      className="user_name bg-none d-flex align-items-center gap-2 "
                    >
                      <h2 className="">
                        {user?.isSubsCribed
                          ? `${user?.first_name} ${user?.last_name}`
                          : "Jhon Doe"}
                      </h2>
                      <img src={arrowDown} alt="arrow-down" />
                    </button>

                    <div className="user_designation">
                      <p>
                        {user?.isSubsCribed
                          ? `${user?.role}`
                          : "Basketball / Manager"}
                      </p>
                    </div>
                  </div>
                  {/* Dropdown here */}
                  {isDropDownOpen && (
                    <div className="position-absolute dropdown_menu">
                      <ul className="p-0 m-0 list-unstyled">
                        {profileMenu.map((dropdownItem, index) => (
                          <li
                            key={index}
                            className="py-3 px-3 d-flex flex-grow-0 gap-2 align-items-center pointer"
                          >
                            <div className="menus_item">
                              <img
                                className="hover_icon d-none"
                                src={dropdownItem.onHover}
                                alt="icon"
                              />
                              <img
                                className="nonHover_icon"
                                src={dropdownItem.icon}
                                alt="icon"
                              />
                            </div>
                            <Link
                              to={dropdownItem.link}
                              className="d-inline-block text-capitalize"
                            >
                              {dropdownItem.menuName}
                            </Link>
                          </li>
                        ))}
                        <li className="py-3 px-3 d-flex flex-grow-0 gap-2 align-items-center pointer border-top">
                          <Link
                            className="d-inline-flex align-items-center gap-2 text-capitalize"
                            style={{ color: "#FE6470" }}
                          >
                            <div className="menus_item">
                              <img className="" src={logoutIcon} alt="icon" />
                            </div>
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : location.pathname === "/dashboard/players" ? (
              <div className="d-flex justify-content-between align-items-center gap-4">
                <div className="search_item">
                  <input id="search_input" type="text" placeholder="Search" />
                </div>

                {/* add player */}
                <button
                  onClick={handleAddPlayerClick}
                  className="addPlayer bg-none d-inline-flex align-items-center gap-2"
                >
                  <div className="add_icon">
                    <img src={addIcon} alt="add-icon" />
                  </div>
                  Add Player
                </button>

                <button
                  onClick={handleFilterModal}
                  className="addPlayer bg-none d-inline-flex align-items-center gap-2"
                >
                  <div
                    className="add_icon"
                    style={{ backgroundColor: "#05cd9914" }}
                  >
                    <img src={filterIcon} alt="add-icon" />
                  </div>
                  Filters
                </button>
              </div>
            ) : location.pathname === "/dashboard/jobOffers" ? (
              <div className="d-flex justify-content-between align-items-center gap-4">
                <button
                  onClick={handleAddJobOfferClick}
                  className="addPlayer bg-none d-inline-flex align-items-center gap-2"
                >
                  <div className="add_icon">
                    <img src={addIcon} alt="add-icon" />
                  </div>
                  Add Job Offer
                </button>

                <button
                  onClick={handleFilterModal}
                  className="addPlayer bg-none d-inline-flex align-items-center gap-2"
                >
                  <div
                    className="add_icon"
                    style={{ backgroundColor: "#05cd9914" }}
                  >
                    <img src={filterIcon} alt="add-icon" />
                  </div>
                  Filters
                </button>
              </div>
            ) : location.pathname === "/dashboard/announcements" ? (
              <div className="d-flex justify-content-between align-items-center gap-4">
                <button
                  onClick={handleAddAnnouncementClick}
                  className="addPlayer bg-none d-inline-flex align-items-center gap-2"
                >
                  <div className="add_icon">
                    <img src={addIcon} alt="add-icon" />
                  </div>
                  Create Announcement
                </button>

                <button
                  onClick={handleFilterModal}
                  className="addPlayer bg-none d-inline-flex align-items-center gap-2"
                >
                  <div
                    className="add_icon"
                    style={{ backgroundColor: "#05cd9914" }}
                  >
                    <img src={filterIcon} alt="add-icon" />
                  </div>
                  Filters
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {filter && (
          <div className="filter_wrapper ">
            <div className="postion_wrapper pb-4">
              <h2>Position</h2>
              <div className="position_btn_wrapper">
                <button>All</button>
                <button>Goalkeeper</button>
                <button>Defender</button>
                <button>Midfielder</button>
                <button>Forward</button>
              </div>
            </div>

            <div className="postion_wrapper pb-4">
              <h2>Status</h2>
              <div className="position_btn_wrapper status">
                <button>Bronze</button>
                <button>Silver</button>
                <button>Gold</button>
              </div>
            </div>

            <div className="postion_wrapper pb-4">
              <h2>Location</h2>
              <div className="position_btn_wrapper location">
                <select class="form-select" aria-label="Default select example">
                  <option selected>Select</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>

            <div className="postion_wrapper pb-4">
              <h2>Nationality</h2>
              <div className="position_btn_wrapper location">
                <select class="form-select" aria-label="Default select example">
                  <option selected>Select</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>

            <div className="postion_wrapper pb-4">
              <h2>Gender</h2>
              <div className="position_btn_wrapper location">
                <select class="form-select" aria-label="Default select example">
                  <option selected>Select</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </select>
              </div>
            </div>

            <div className="postion_wrapper pb-4">
              <h2>Age</h2>
              <div className="position_btn_wrapper age d-flex">
                <input type="number" placeholder="Min" />
                <input type="number" placeholder="Max" />
                <button>Apply</button>
              </div>
            </div>

            <div className="postion_wrapper pb-4">
              <h2>Height</h2>
              <div className="position_btn_wrapper age d-flex">
                <input type="number" placeholder="Min" />
                <input type="number" placeholder="Max" />
                <button>Apply</button>
              </div>
            </div>

            <div className="postion_wrapper pb-4">
              <h2>Dominant hand</h2>
              <div className="position_btn_wrapper location">
                <select class="form-select" aria-label="Default select example">
                  <option selected>Select</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* mobile */}
        <div className="topbar_mobile">
          <div className="d-flex justify-content-between align-items-center">
            <button className="back_btn fs_10">Back</button>
            <div style={{ marginRight: "50px" }}>
              <img src={logo} alt="" />
            </div>
            <p></p>
          </div>
          <h2 className="text_color_36 job_title_mobile fs-4 fw-medium text-capitalize">
            {location.pathname === "/dashboard/jobOffers" && "job offer"}
            {location.pathname === "/dashboard/players" && "Players"}
            {location.pathname === "/dashboard/coaches" && "Coaches"}
            {location.pathname === "/dashboard/createAnnouncements" &&
              "Create Announcements"}
            {location.pathname === "/dashboard/announcements" &&
              "Announcements"}
          </h2>
        </div>
      </div>

      {/* modals */}
      <AddJobOffer
        show={isModalOpen}
        onHide={closeModal}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        style={{ width: "648px" }}
      />

      <AddAnnouncement
        show={isAnnouncementModalOpen}
        onHide={closeAnnouncementModal}
        isModalOpen={isAnnouncementModalOpen}
        style={{ width: "648px" }}
        closeModal={closeAnnouncementModal}
      />
    </>
  );
};

export default Topbar;
