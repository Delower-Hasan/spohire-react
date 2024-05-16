import { useEffect, useRef, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import profile from "../../assets/PROFILE.png";
import dropdown from "../../assets/dropdownicon.png";
import Logo from "../../assets/logo.png";
import TransfarMarket from "../../assets/modal-market-img.png";
import Logosm from "../../assets/responsive-logo.png";
import { userLoggedOut } from "../../features/auth/authSlice";
import "./Header.css";

const Header = () => {
  const navigate = useLocation();
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const myDivRef = useRef(null);

  const handleFilterModal = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
    handleFilterModal();
  };

  const handleLoggout = () => {
    localStorage.removeItem("spohireAuth");
    dispatch(userLoggedOut());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target)) {
        setIsDropdownActive(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownActive]);

  const handleUnlockClick = () => {
    navigate.pathname = "/login";
  };



  return (
    <header
      className={`${!user && "pt-4 pb-4"} ${navigate.pathname === "/"
        ? "header_position position-absolute w-100"
        : ""
        }`}
    >
      <Navbar expand="lg" className="navbar navbar-expand-lg">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <Link className="navbar-brand" to="/">
              <img className="d-none d-md-block" src={Logo} alt="Logo" />
              <img className="d-block d-md-none" src={Logosm} alt="Logo" />
            </Link>
          </Navbar.Brand>
          <div className=" nav_toggle d-flex align-items-center">
            <Navbar.Toggle aria-controls="basic-navbar-nav">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="16" viewBox="0 0 28 16" fill="none">
                <path d="M0.666016 0H27.3327V2.66667H0.666016V0ZM7.33268 6.66667H27.3327V9.33333H7.33268V6.66667ZM15.666 13.3333H27.3327V16H15.666V13.3333Z" fill="white" />
              </svg>
            </Navbar.Toggle>
            {user ? (
              <div>
                <Link to="/dashboard/viewProfile">
                  <img
                    className=""
                    src={
                      user?.image
                        ? `${process.env.NODE_ENV !== "production"
                          ? import.meta.env.VITE_LOCAL_API_URL
                          : import.meta.env.VITE_LIVE_API_URL
                        }/api/v1/uploads/${user?.image}`
                        : profile
                    }
                    alt=""
                  />
                </Link>

                <Link
                  to="/dashboard/jobOffers"
                  type="submit"
                  className="text-decoration-none ms-3 profilename"
                >
                  {user.firstName}
                </Link>

              </div>
            ) : (
              <>
                <div className="d-none">
                  <button className="logIn visibility-lg-hidden visually-visible">
                    Log in
                  </button>
                  <Link
                    to="/signup"
                    type="submit"
                    className="text-decoration-none"
                  >
                    <button className="authBtn btnNone visibility-lg-hidden visually-visible">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              {/* {user ? (
                <Nav.Link href="#home">
                  <Link to="/dashboard" className="nav-link">
                    Transfer Market
                  </Link>
                </Nav.Link>
              ) : (
                <button
                  className="modal_link "
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Transfer Market
                </button>
              )} */}
              {/* transfer market modal */}
              <div
                className="modal fade"
                id="staticBackdrop"
                // data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <h2>
                        Unlock the Gateway to
                        <span>
                          Endless <br /> Excitement
                        </span>
                      </h2>
                      <p>
                        Log in and Dive into a World of Sports Thrills and
                        Exclusive Content!
                      </p>

                      <div style={{ marginBottom: "70px" }}>
                        <img src={TransfarMarket} alt="TransfarMarket" />
                      </div>
                      {/* login */}
                      <Link
                        to={"/pricing"}
                        className="btn unlock_btn d-inline-flex align-items-center justify-content-center"
                      >
                        unlock now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* modal hbe */}
              <Nav.Link href="/jobOffer">
                <Link
                  to="/jobOffer"
                  className={`nav-link ${navigate.pathname === "/jobOffer" && "active"
                    }`}
                >
                  Job Offers
                </Link>
              </Nav.Link>
              <Nav.Link href="/announcements">
                <Link
                  to="/announcements"
                  className={`nav-link ${navigate.pathname === "/announcements" && "active"
                    }`}
                >
                  Announcements
                </Link>
              </Nav.Link>
              <Nav.Link href="/pricing">
                <Link
                  to="/pricing"
                  className={`nav-link ${navigate.pathname === "/pricing" && "active"
                    }`}
                >
                  Pricing
                </Link>
              </Nav.Link>

              <Nav.Link href="/news">
                <Link
                  to="/news"
                  className={`nav-link ${navigate.pathname === "/news" && "active"
                    }`}
                >
                  News
                </Link>
              </Nav.Link>
              <div className="d-lg-none d-flex flex-column justify-content-center align-items-center ">
                <Link to="/login">         <button className="logIn visibility-lg-hidden visually-visible" style={{ color: "#9d99a3" }}>
                  Log in
                </button></Link>
                <Link
                  to="/signup"
                  type="submit"
                  className="text-decoration-none"
                >
                  <button className="authBtn btnNone visibility-lg-hidden visually-visible">
                    Sign Up
                  </button>
                </Link>
              </div>
            </Nav>
            {user ? (
              <div>
                <div
                  type="button"
                  onClick={(event) => handleButtonClick(event)}
                  className="d-flex  flex-lg-row flex-column align-items-center  p-2 profile_drop_mobilepadding position-relative"
                >
                  <Link to="/dashboard/viewProfile">
                    <img
                      className="profile_picture d-lg-block d-none"
                      src={
                        user?.image
                          ? `${process.env.NODE_ENV !== "production"
                            ? import.meta.env.VITE_LOCAL_API_URL
                            : import.meta.env.VITE_LIVE_API_URL
                          }/api/v1/uploads/${user?.image}`
                          : profile
                      }
                      alt=""
                      style={{
                        width: "52px",
                        height: "52px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </Link>
                  <div className="profile_dropdown" ref={myDivRef}>
                    <div className="position-relative">
                      <div className="profile_name">
                        <h5>{user?.first_name}</h5>

                        <img
                          src={dropdown}
                          className={`${isDropdownActive ? "" : "rotate_arrow"
                            }`}
                          alt="dropdown"
                        />
                      </div>
                      {isDropdownActive && (
                        <>
                          <p onClick={handleLoggout}>Log out</p>
                          {/* <hr className="m-0" /> */}
                          {/* <p>Admin</p> */}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form className="d-flex flex-column flex-lg-row align-items-center gap-2 nav_form_small d-none d-md-block">
                <Link to="/login" className="logIn">
                  Log in
                </Link>
                <Link
                  to="/signup"
                  type="submit"
                  className="text-decoration-none"
                >
                  <button className="authBtn btnNone">
                    <span> Sign Up</span>
                  </button>
                </Link>
              </form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
