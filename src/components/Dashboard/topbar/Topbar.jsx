import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import arrowDown from "../../../assets/arrow_down.svg";
import AvatarImg from "../../../assets/avatar.svg";
import logo from "../../../assets/dashbord-logo.png";
import messageIcon from "../../../assets/message-icon2.svg";
import notificationIcon from "../../../assets/notification_icon.svg";
import silverIcon from "../../../assets/silver_icon.svg";
import AddJobOffer from "../AddJobOffer/AddJobOffer";
import AddAnnouncement from "../Announcements/AddAnnouncement";
import addIcon from "../../../assets/addIcon.svg";
import filterIcon from "../../../assets/filterIcon.svg";
import "./Topbar.css";

const Topbar = () => {
  const [filterAnnouncement, setFilterAnnouncement] = useState(false);
  const [filter, setFilter] = useState(false);
  const [playerFilter, setPlayerFilter] = useState(false);
  const [coachFilter, setCoachFilter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnnouncementModalOpen, setAnnouncementIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

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
  // announcemnet modal fn end--------

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

  return (
    <>
      <div
        className={`${
          isModalOpen | isAnnouncementModalOpen
            ? "position_static"
            : "position-fixed"
        } dashbord_topbar`}>
        <div className="topbar_desk">
          <div className="dashbord_topbar_wrapper d-flex justify-content-between align-items-center">
            <div className="dashbord_topbar_title">
              {(location.pathname == "/dashboard/viewProfile") |
              (location.pathname === "/dashboard/viewDetails") |
              (location.pathname === "/dashboard/coacheDetails") |
              (location.pathname == "/dashboard/coachesProfile") |
              (location.pathname == "/dashboard/messages") |
              (location.pathname === "/dashboard/editAnnouncements") |
              (location.pathname == "/dashboard/editPlayerDetals") ? (
                <button></button>
              ) : (
                // <button className="back_btn fs_10">Back</button>
                <>
                  <h2 className="text_color_36 fs-4 fw-medium text-capitalize pb-1">
                    {location.pathname === "/dashboard" && user?.isSubsCribed
                      ? `Hello ${user?.first_name} ${user?.last_name}`
                      : ""}
                    {location.pathname === "/dashboard/jobOffers" &&
                      "job offer"}
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
                    {location.pathname === "/dashboard/notification" &&
                      "Notifications"}
                    {location.pathname === "/dashboard/billing" &&
                      "Billing history"}
                    {location.pathname === "/dashboard/observed" && "Observed"}
                    {location.pathname === "/dashboard/addedItems" &&
                      "My Added Items"}
                    {location.pathname === "/dashboard/myAppliedJobs" &&
                      "My Applied Jobs"}
                    {location.pathname === "/dashboard/coaches" &&
                      "Coaches List"}
                  </h2>
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
                            }}>
                            <img src={silverIcon} alt="silver-icon" />
                            Silver
                          </p>
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: "500",
                              color: "#949494",
                            }}>
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
                            }}>
                            <img src={silverIcon} alt="silver-icon" />
                            Silver
                          </p>
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: "500",
                              color: "#EBB111",
                            }}>
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
                            }}>
                            <img src={silverIcon} alt="silver-icon" />
                            Silver
                          </p>
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: "500",
                              color: "#CD7F32",
                            }}>
                            Until {formattedExpirationDate}
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text_clr_70 fw-medium">No subscription</p>
                  )}
                </>
              )}
            </div>

            {/* <div>
              {location.pathname === "/dashboard" ? (
                <div className="d-flex gap-5">
                  {user?.role !== "Other" && (
                    <div
                      className="d-flex gap-2 align-items-center"
                      style={{
                        border: "2px dashed #d1d8e4",

                        padding: "3px 15px",
                        borderRadius: "8px",
                      }}>
                      <p className="fs-5 me-3">Transfer Market</p>

                      {user?.role === "Player" && (
                        <button
                          className="px-3 py-2 rounded text-white bg_color_fb"
                          onClick={() => navigate("/addPlayerProfile")}
                          disabled={user?.addedProfile}>
                          {user?.addedProfile ? "Added" : "Add Player"}
                        </button>
                      )}

                      {user?.role === "Coach" && (
                        <button
                          className="px-3 py-2 rounded text-white bg_color_fb"
                          onClick={() => navigate("/addProfilePlayer")}>
                          Add Player
                        </button>
                      )}
                      {user?.role === "Coach" && (
                        <button
                          className="px-3 py-2 rounded text-white bg_color_fb"
                          onClick={() => navigate("/addCoachProfile")}
                          disabled={user?.addedProfile}>
                          {user?.addedProfile ? "Added" : "Add Coach"}
                        </button>
                      )}

                      {user?.role === "Manager" && (
                        <>
                          <button
                            className="px-3 py-2 rounded text-white bg_color_fb"
                            onClick={() => navigate("/addProfilePlayer")}>
                            Add player
                          </button>
                          <button
                            className="px-3 py-2 rounded text-white bg_color_fb"
                            onClick={() => navigate("/addProfileCoach")}>
                            Add coach
                          </button>
                        </>
                      )}
                    </div>
                  )}
                  <div className="d-flex gap-2">
                    <button
                      className="px-3 py-2 rounded text-white bg_color_fb"
                      onClick={() => handleAddJobOfferClick()}>
                      Add Job Offer
                    </button>

                    <button
                      className="px-3 py-2 rounded text-white bg_color_fb"
                      onClick={() => handleAddAnnouncementClick()}>
                      Add Announcement
                    </button>
                  </div>
                </div>
              ) : location.pathname.includes("/dashboard/jobApplicants") ? (
                ""
              ) : (
                <div className="dashbord_topbar_button d-flex gap-4">
                  {location.pathname === "/dashboard/players" && (
                    <button
                      onClick={(event) => handlePlayerFilterModal(event)}
                      className={`${"filter_btn d-flex gap-2 text-decoration-none"} `}>
                      <img src={filterIcon} alt="icon" />
                      <span className="text_color_cb">Filter</span>
                    </button>
                  )}
                  {location.pathname === "/dashboard/coaches" && (
                    <button
                      onClick={(event) => handleCoachFilterModal(event)}
                      className={`${"filter_btn d-flex gap-2 text-decoration-none"} `}>
                      <img src={filterIcon} alt="icon" />
                      <span className="text_color_cb">Filter</span>
                    </button>
                  )}
                  {location.pathname === "/dashboard/jobOffers" && (
                    <button
                      onClick={(event) => handleButtonClick(event)}
                      className={`${"filter_btn d-flex gap-2 text-decoration-none"} `}>
                      <img src={filterIcon} alt="icon" />
                      <span className="text_color_cb">Filter</span>
                    </button>
                  )}
                  {location.pathname === "/dashboard/announcements" && (
                    <button
                      onClick={(event) => handleButtonClick1(event)}
                      className={`${"filter_btn d-flex gap-2 text-decoration-none"} `}>
                      <img src={filterIcon} alt="icon" />
                      <span className="text_color_cb">Filter</span>
                    </button>
                  )}

                  <Link
                    to={`${
                      location.pathname === "/dashboard/jobOffers"
                        ? "/dashboard/jobOffers"
                        : (location.pathname === "/dashboard/coachesProfile") |
                            (location.pathname ==
                              "/dashboard/editCoacheProfile") |
                            (location.pathname ==
                              "/dashboard/editPlayerDetals") &&
                          !user?.subscriptionName
                        ? "/pricing"
                        : location.pathname === "/dashboard/coaches"
                        ? "/dashboard/coachesProfile"
                        : "#"
                    }`}
                    className={`${
                      location.pathname == "/dashboard/observed" ||
                      location.pathname == "/dashboard/viewProfile" ||
                      location.pathname.includes("/dashboard/coacheDetails") ||
                      location.pathname.includes("/dashboard/viewDetails") ||
                      location.pathname.includes("/dashboard/messages") ||
                      location.pathname == "/dashboard/addedItems" ||
                      location.pathname == "/dashboard/myAppliedJobs" ||
                      location.pathname == "/dashboard/messages" ||
                      location.pathname == "/dashboard/password" ||
                      location.pathname == "/dashboard/notification" ||
                      location.pathname == "/dashboard/billing" ||
                      location.pathname == "/dashboard/editAnnouncements" ||
                      location.pathname === "/dashboard/coaches" ||
                      location.pathname === "/dashboard/players" ||
                      location.pathname === "/dashboard/viewDetails" ||
                      location.pathname === "/dashboard/coacheDetails" ||
                      location.pathname === "/dashboard/createAnnouncements" ||
                      (location.pathname === "/dashboard/announcements" &&
                        user.role == "Player") ||
                      (location.pathname === "/dashboard/jobOffers" &&
                        user.role == "Player")
                        ? "d-none"
                        : "add_btn d-flex gap-2 text-decoration-none bg_color_fb"
                    } `}
                    onClick={() =>
                      location.pathname === "/dashboard/jobOffers"
                        ? handleAddJobOfferClick()
                        : location.pathname === "/dashboard/announcements"
                        ? handleAddAnnouncementClick()
                        : undefined
                    }>
                    {(location.pathname === "/dashboard/jobOffers") |
                    (location.pathname === "/dashboard/announcements") |
                    (location.pathname == "/dashboard/basicinfo") ? (
                      <img src={addIcon} alt="icon" />
                    ) : (
                      ""
                    )}
                    <span
                      className={`${
                        (location.pathname == "/dashboard/observed") |
                        (location.pathname == "/dashboard/messages") |
                        (location.pathname === "/dashboard/editAnnouncements") |
                        (location.pathname === "/dashboard/players")
                          ? " d-none"
                          : "text-white"
                      } `}>
                      {(location.pathname === "/dashboard/jobOffers") |
                      (location.pathname === "/dashboard/basicinfo")
                        ? "Add Job Offer"
                        : location.pathname === "/dashboard"
                        ? "View Details"
                        : (location.pathname === "/dashboard/coachesProfile") |
                          (location.pathname ===
                            "/dashboard/editCoacheProfile" &&
                            !user?.subscriptionName)
                        ? "Click here to upgrade your current package"
                        : location.pathname === "/dashboard/announcements"
                        ? "Create Announcement"
                        : location.pathname === "/dashboard/viewProfile" &&
                          !user?.subscriptionName
                        ? "Click here to upgrade your current package"
                        : location.pathname === "/dashboard/editPlayerDetals" &&
                          !user?.subscriptionName
                        ? "Click here to upgrade your current package"
                        : ""}
                    </span>
                  </Link>
                </div>
              )}

              {filter && <FilterModal myDivRef={myDivRef} />}
              {filterAnnouncement && (
                <FilteAnnouncementModal myDivRef1={myDivRef1} />
              )}
              {playerFilter && <PlayerFilterModal playerRef={playerRef} />}
              {coachFilter && <CoachFilterModal playerRef={coachRef} />}


            </div> */}

            {location.pathname === "/dashboard" ? (
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

                <div className="userprofile d-flex gap-3 align-items-center">
                  <div className="userImg">
                    <img src={AvatarImg} alt="" />
                  </div>

                  <div className="user_info">
                    <button className="user_name bg-none d-flex align-items-center gap-2 ">
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
                </div>
              </div>
            ) : location.pathname === "/dashboard/players" ? (
              <div className="d-flex justify-content-between align-items-center gap-4">
                <div className="search_item">
                  <input id="search_input" type="text" placeholder="Search" />
                </div>

                <button className="addPlayer bg-none d-inline-flex align-items-center gap-2">
                  <div className="add_icon">
                    <img src={addIcon} alt="add-icon" />
                  </div>
                  Add Player
                </button>

                <button
                  onClick={handleFilterModal}
                  className="addPlayer bg-none d-inline-flex align-items-center gap-2">
                  <div
                    className="add_icon"
                    style={{ backgroundColor: "#05cd9914" }}>
                    <img src={filterIcon} alt="add-icon" />
                  </div>
                  Filters
                </button>
              </div>
            ) : location.pathname === "/dashboard/jobOffers" ? (
              <div className="d-flex justify-content-between align-items-center gap-4">
                <button
                  onClick={handleAddJobOfferClick}
                  className="addPlayer bg-none d-inline-flex align-items-center gap-2">
                  <div className="add_icon">
                    <img src={addIcon} alt="add-icon" />
                  </div>
                  Add Job Offer
                </button>

                <button
                  onClick={handleFilterModal}
                  className="addPlayer bg-none d-inline-flex align-items-center gap-2">
                  <div
                    className="add_icon"
                    style={{ backgroundColor: "#05cd9914" }}>
                    <img src={filterIcon} alt="add-icon" />
                  </div>
                  Filters
                </button>
              </div>
            ) : location.pathname === "/dashboard/announcements" ? (
              <div className="d-flex justify-content-between align-items-center gap-4">
                <button
                  onClick={handleButtonClick1}
                  className="addPlayer bg-none d-inline-flex align-items-center gap-2">
                  <div className="add_icon">
                    <img src={addIcon} alt="add-icon" />
                  </div>
                  Create Announcement
                </button>

                <button
                  onClick={handleFilterModal}
                  className="addPlayer bg-none d-inline-flex align-items-center gap-2">
                  <div
                    className="add_icon"
                    style={{ backgroundColor: "#05cd9914" }}>
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
              <h2>Dominant hand </h2>
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
