import FooterLogo from "../../assets/mobile_footer_logo.png";
import Ig from "../../assets/ig.png";
import Fb from "../../assets/fb.png";
import LinkeDin from "../../assets/linkedin.png";
import Twitter from "../../assets/twitter.png";
import { Link } from "react-router-dom";
const MobileFooter = () => {
  return (
    <footer className="mobile_footer">
      <div className="container">
        <div className="row gy-2">
          <div className="col-12 col-xl-3 text-center">
            <Link to="/">
              <img className="mx-auto" src={FooterLogo} alt="LOGO" />
            </Link>
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
          <div
            className="d-flex justify-content-between "
            style={{
              paddingLeft: "64.5px",
              paddingRight: "65.4px",
              marginTop: "24px",
              marginBottom: "24px",
            }}
          >
            <div className="">
              <ul className="text-center text-lg-start list-unstyled">
                <li>Info</li>
                <li>
                  <Link to="#">How it works</Link>
                </li>
                <li>
                  <Link to="#"> About us</Link>
                </li>
              </ul>
            </div>

            <div className="">
              <ul className="text-center text-lg-start list-unstyled">
                <li>Contact</li>
                <li>
                  <Link to="mailto:contact@spohire.com">
                    contact@spohire.com
                  </Link>
                </li>
                <li>
                  <Link to="#">+48 565 25 654</Link>
                </li>
                <li>
                  <Link to="#">+12 485 54684</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <div className="fooBottom d-flex justify-content-center align-items-center gap-3 gap-lg-5">
          <Link to="#">Privacy policy</Link>
          <Link to="#">Terms & condition</Link>
          <Link to="#">AMSL All Right Reserved</Link>
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;
