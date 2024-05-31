import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import addIcon from "../../../assets/addIcon.svg";
import arrowDown from "../../../assets/arrow_down.svg";
import AvatarImg from "../../../assets/avatar.svg";
import billingIcon from "../../../assets/billing_icon.svg";
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
import goldIcon from "../../../assets/gold_icon.png";
import subscriptionIcon from "../../../assets/subcription_icon.svg";
import { userLoggedOut } from "../../../features/auth/authSlice";
import useClickOutside from "../../../hooks/useClickOutside";
import AddJobOffer from "../AddJobOffer/AddJobOffer";
import AddAnnouncement from "../Announcements/AddAnnouncement";
import AddCoachModal from "../Modal/AddCoachModal";
import AddPlayerModal from "../Modal/AddPlayerModal";
import "./Topbar.css";
import { useGetFilteredUsersQuery } from "../../../features/auth/authApi";
import PlayerFilter from "./PlayerFilter";
import CoachFilter from "./CoachFilter";
import AnouncementFilter from "./AnouncementFilter";
import JobOfferFilter from "./JobOfferFilter";

const Topbar = ({ onClose }) => {
  let location = useLocation();
  const [filterAnnouncement, setFilterAnnouncement] = useState(false);
  const [filter, setFilter] = useState(false);
  const [playerFilter, setPlayerFilter] = useState(false);
  const [coachFilter, setCoachFilter] = useState(false);
  const [addJobOffer, setAddJobOffer] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isAnnouncementModalOpen, setAnnouncementIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [addPlayerModal, setAddPlayerModal] = useState(false);
  const [addCoachModal, setAddCoachModal] = useState(false);
  const [modalOpen, isModalOpen] = useState(false);
  const myDivRef1 = useRef(null);
  const myDivRef = useRef(null);
  const playerRef = useRef(null);
  const coachRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wrapperRef = useClickOutside(() => setIsDropDownOpen(false));
  const filterRef = useClickOutside(() => setFilter(false));
  const { data: players } = useGetFilteredUsersQuery("");
  const allowedPlans =
    user?.subscriptionName === "Gold"
      ? ["Gold", "Silver", "Bronze"]
      : user?.subscriptionName === "Silver"
      ? ["Silver", "Bronze"]
      : user?.subscriptionName === "Bronze"
      ? ["Bronze"]
      : [];

  const filteredDataForSearchs =
    players?.filter(
      (player) =>
        player?.subscriptionName &&
        allowedPlans.includes(player?.subscriptionName) &&
        user?.sports === player?.sports &&
        player?.isActive
    ) || [];

  // function searchByName(data, query) {
  //   const results = [];
  //   for (let i = 0; i < data.length; i++) {
  //     const fullName = `${data[i].firstName} ${data[i].lastName}`;
  //     if (fullName.toLowerCase().includes(query.toLowerCase())) {
  //       results.push(data[i]);
  //     }
  //   }
  //   return results;
  // }

  function searchByName(data, query) {
    if (!query.trim()) {
      return [];
    }

    const results = [];
    for (let i = 0; i < data.length; i++) {
      const fullName = `${data[i].firstName} ${data[i].lastName}`;
      if (fullName.toLowerCase().includes(query.toLowerCase())) {
        results.push(data[i]);
      }
    }
    return results;
  }

  // Example usage:
  const [searchResultDatas, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    const searchResults = searchByName(filteredDataForSearchs, query);
    setSearchResults(searchResults);
  };

  const handleAddPlayerModal = () => {
    setAddPlayerModal(true);
  };

  const handleCoachModal = () => {
    setAddCoachModal(true);
  };

  const handleIsDropDownOpen = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleFilterModal = () => {
    console.log("Filter");
    setFilter(!filter);
  };

  const handleAddJobOfferClick = () => {
    setAddJobOffer(true);
  };

  const handleAddAnnouncementClick = () => {
    setAnnouncementIsModalOpen(true);
  };

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
    // {
    //   icon: subscriptionIcon,
    //   onHover: hoverBuy,
    //   menuName: "Buy Subscription",
    //   link: "#",
    // },
    {
      icon: settingsIcon,
      onHover: hoverSettings,
      menuName: "Settings",
      link: "/dashboard/settings",
    },
    {
      icon: helpIcon,
      onHover: hoverHelp,
      menuName: "Help",
      link: "/dashboard/help-and-support",
    },
    {
      icon: billingIcon,
      onHover: hoverBilling,
      menuName: "Billing",
      link: "/dashboard/billing",
    },
  ];

  const handleLoggout = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("spohireAuth");
    navigate("/login");
  };

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
              {location.pathname === "/dashboard/coacheDetails" ||
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

                  {/* view_details */}
                  {location.pathname.startsWith("/dashboard/viewDetails") && (
                    <button
                      className="view_details"
                      onClick={() => window.history.back()}
                    >
                      Back
                    </button>
                  )}

                  {location.pathname.startsWith("/dashboard/coacheDetails") && (
                    <button
                      className="view_details"
                      onClick={() => window.history.back()}
                    >
                      Back
                    </button>
                  )}

                  {location.pathname === "/dashboard" ||
                  location.pathname === "/dashboard/viewProfile" ||
                  location.pathname == "/dashboard/editPlayerDetals" ? (
                    <>
                      {user?.isSubsCribed ? (
                        <>
                          {user?.subscriptionName === "Silver" && (
                            <div className="d-flex align-items-center gap-2 text-uppercase">
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
                                {user?.subscriptionName}
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
                            <div className="d-flex align-items-center gap-2 text-uppercase">
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
                                <img src={goldIcon} alt="silver-icon" />
                                {user?.subscriptionName}
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
                            <div className="d-flex align-items-center gap-2 text-uppercase">
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
                                {user?.subscriptionName}
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
                        <p className="text_clr_70 fw-medium">
                          {user?.role === "Other"
                            ? "No subscription"
                            : "Welcome to the platform"}
                        </p>
                      )}
                    </>
                  ) : null}
                </>
              )}
            </div>
            {location.pathname === "/dashboard" ||
            location.pathname === "/dashboard/viewProfile" ||
            location.pathname === "/dashboard/editPlayerDetals" ? (
              <div className="right_searchItem d-flex justify-content-between align-items-center gap-4">
                <div className="search_item position-relative">
                  <input
                    id="search_input"
                    onChange={handleSearch}
                    type="text"
                    placeholder="Search"
                  />
                  {searchResultDatas?.length > 0 && (
                    <ul
                      className="position-absolute bg-dark-subtle p-3 rounded-1 overflow-scrool"
                      style={{
                        listStyle: "none",
                        left: "10px",
                        top: "100%",
                        width: "90%",
                      }}
                    >
                      <div
                        className="position-absolute"
                        style={{
                          right: "10px",
                          top: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => setSearchResults([])}
                      >
                        X
                      </div>
                      {searchResultDatas?.map((item, index) => (
                        <li key={index}>
                          <Link
                            to={`${
                              item.role === "Coach"
                                ? `/dashboard/coacheDetails/${item._id}`
                                : `/dashboard/viewDetails/${item._id}`
                            }`}
                          >{`${item?.firstName} ${item?.lastName}`}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Message Icon */}
                <Link
                  to={"/dashboard/messages"}
                  className="message_icon bg-none"
                >
                  <img src={messageIcon} alt="message-icon" />
                </Link>

                <Link
                  to={"/dashboard/notification"}
                  className="notification_icon bg-none"
                >
                  <img src={notificationIcon} alt="notification-icon" />
                </Link>

                <div className="userprofile d-flex gap-3 align-items-center position-relative">
                  <div className="userImg">
                    <img
                      style={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "100%",
                      }}
                      src={`${
                        process.env.NODE_ENV !== "production"
                          ? import.meta.env.VITE_LOCAL_API_URL
                          : import.meta.env.VITE_LIVE_API_URL
                      }/api/v1/uploads/${user?.image}`}
                      alt=""
                    />
                  </div>
                  <div className="user_info">
                    {/* drop down here */}
                    <button
                      onClick={handleIsDropDownOpen}
                      className="user_name bg-none d-flex align-items-center gap-2 "
                    >
                      <h2 className="">
                        {`${user?.first_name} ${user?.last_name}`}
                      </h2>
                      <img src={arrowDown} alt="arrow-down" />
                    </button>

                    <div className="user_designation">
                      <p>{`${user?.sports}/${user?.role}`}</p>
                    </div>
                  </div>
                  {/* Dropdown here */}
                  {isDropDownOpen && (
                    <div
                      ref={wrapperRef}
                      className="position-absolute dropdown_menu"
                    >
                      <ul className="p-0 m-0 list-unstyled">
                        {profileMenu.map((dropdownItem, index) => (
                          <li key={index} className="py-3 px-3">
                            <Link
                              to={dropdownItem.link}
                              className="d-flex align-items-center gap-2 text-capitalize"
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

                              {dropdownItem.menuName}
                            </Link>
                          </li>
                        ))}
                        <li className="py-3 px-3 d-flex flex-grow-0 gap-2 align-items-center pointer border-top">
                          <button
                            onClick={handleLoggout}
                            className="d-inline-flex align-items-center gap-2 text-capitalize bg-transparent"
                            style={{ color: "#FE6470" }}
                          >
                            <div className="menus_item">
                              <img className="" src={logoutIcon} alt="icon" />
                            </div>
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : location.pathname === "/dashboard/players" ? (
              <div className="d-flex justify-content-between align-items-center gap-4">
                <div className="search_item">
                  <div className="search_item position-relative">
                    <input
                      id="search_input"
                      onChange={handleSearch}
                      type="text"
                      placeholder="Search"
                    />
                    {searchResultDatas?.length > 0 && (
                      <ul
                        className="position-absolute bg-dark-subtle p-3 rounded-1 overflow-scrool"
                        style={{
                          listStyle: "none",
                          left: "10px",
                          top: "100%",
                          width: "90%",
                        }}
                      >
                        <div
                          className="position-absolute"
                          style={{
                            right: "10px",
                            top: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => setSearchResults([])}
                        >
                          X
                        </div>
                        {searchResultDatas?.map((item, index) => (
                          <li key={index}>
                            <Link
                              to={`${
                                item.role === "Coach"
                                  ? `/dashboard/coacheDetails/${item._id}`
                                  : `/dashboard/viewDetails/${item._id}`
                              }`}
                            >{`${item?.firstName} ${item?.lastName}`}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* add player */}

                <button
                  onClick={handleAddPlayerModal}
                  className="addPlayer bg-none d-inline-flex align-items-center gap-2"
                >
                  <div className="add_icon">
                    <img src={addIcon} alt="add-icon" />
                  </div>
                  Add Player
                </button>

                {/* add player -/ end */}

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
            ) : location.pathname === "/dashboard/coaches" ? (
              <div className="d-flex justify-content-between align-items-center gap-4">
                <div className="search_item position-relative">
                  <input
                    id="search_input"
                    onChange={handleSearch}
                    type="text"
                    placeholder="Search"
                  />
                  {searchResultDatas?.length > 0 && (
                    <ul
                      className="position-absolute bg-dark-subtle p-3 rounded-1 overflow-scrool"
                      style={{
                        listStyle: "none",
                        left: "10px",
                        top: "100%",
                        width: "90%",
                      }}
                    >
                      <div
                        className="position-absolute"
                        style={{
                          right: "10px",
                          top: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => setSearchResults([])}
                      >
                        X
                      </div>
                      {searchResultDatas?.map((item, index) => (
                        <li key={index}>
                          <Link
                            to={`${
                              item.role === "Coach"
                                ? `/dashboard/coacheDetails/${item._id}`
                                : `/dashboard/viewDetails/${item._id}`
                            }`}
                          >{`${item?.firstName} ${item?.lastName}`}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* add coach */}

                <button
                  onClick={handleCoachModal}
                  className="addPlayer bg-none d-inline-flex align-items-center gap-2"
                >
                  <div className="add_icon">
                    <img src={addIcon} alt="add-icon" />
                  </div>
                  Add Coach
                </button>

                {/* add player -/ end */}

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
          <div ref={filterRef} className="filter_wrapper">
            {location.pathname === "/dashboard/coaches" ? (
              <CoachFilter />
            ) : location.pathname === "/dashboard/announcements" ? (
              <>
                <AnouncementFilter />
              </>
            ) : location.pathname === "/dashboard/players" ? (
              <PlayerFilter />
            ) : location.pathname === "/dashboard/jobOffers" ? (
              <JobOfferFilter />
            ) : null}
          </div>
        )}

        {/* mobile */}
        <div className="topbar_mobile">
          <div className="d-flex justify-content-between align-items-center">
            <button className="back_btn fs_10">Back</button>
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
      </div>

      {/* Add Plyer Modal */}
      {addPlayerModal && (
        <AddPlayerModal
          addPlayerModal={addPlayerModal}
          setAddPlayerModal={setAddPlayerModal}
        />
      )}

      {addCoachModal && (
        <AddCoachModal
          addCoachModal={addCoachModal}
          setAddCoachModal={setAddCoachModal}
        />
      )}

      {/* modals */}
      {addJobOffer && (
        <AddJobOffer
          addJobOffer={addJobOffer}
          setAddJobOffer={setAddJobOffer}
        />
      )}

      {isAnnouncementModalOpen && (
        <AddAnnouncement
          setAnnouncementIsModalOpen={setAnnouncementIsModalOpen}
        />
      )}
    </>
  );
};

export default Topbar;
