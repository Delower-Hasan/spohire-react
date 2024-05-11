/* eslint-disable no-unused-vars */
import React from "react";
import FooterLogo from "../../assets/footerLogo.png";
import Ig from "../../assets/ig.png";
import Fb from "../../assets/fb.png";
import LinkeDin from "../../assets/linkedin.png";
import Twitter from "../../assets/twitter.png";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="deskFooter">
      <div className="container">
        <div className="row gy-5">
          <div className="col-12 col-xl-3 text-center">
            <Link to="/">
              <img className="mx-auto" src={FooterLogo} alt="LOGO" />
            </Link>
          </div>
          <div className="col-12 col-lg-3 col-xl-3">
            <ul className="text-center text-lg-start list-unstyled">
              <li>Info</li>
              <li>
                <Link to="#">How it works</Link>
              </li>
              <li>
                <Link to="#"> About us</Link>
              </li>
              <li>
                <Link to="/articles">Articles</Link>
              </li>
            </ul>
          </div>

          <div className="col-12 col-lg-3 col-xl-2">
            <ul className="text-center text-lg-start list-unstyled">
              <li>Contact</li>
              <li>
                <Link to="mailto:contact@spohire.com">contact@spohire.com</Link>
              </li>
              <li>
                <Link to="#">+48 565 25 654</Link>
              </li>
              <li>
                <Link to="#">+12 485 54684</Link>
              </li>
            </ul>
          </div>

          <div className="col-12 col-lg-6 col-xl-4">
            <div></div>
            <div className="followBox d-flex flex-md-row justify-content-between align-items-center gap-3">
              <p>Follow us</p>
              <Link to="#">
                <img src={Ig} alt="Instagram" />
              </Link>
              <Link to="#">
                <img src={Fb} alt="FaceBook" />
              </Link>
              <Link to="#">
                <img src={LinkeDin} alt="LinkedIn" />
              </Link>
              <Link to="#">
                <img src={Twitter} alt="Twitter" />
              </Link>
            </div>
          </div>
        </div>
        <hr />
        <div className="fooBottom d-flex  flex-lg-row justify-content-center align-items-center gap-3 gap-lg-5">
          <Link to="#">Privacy policy</Link>
          <Link to="/terms-condition">Terms & condition</Link>
          <Link to="#">AMSL All Right Reserved</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
