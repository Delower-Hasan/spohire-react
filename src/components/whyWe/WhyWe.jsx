import "./WhyWe.css";
import BasketPerson from "../../assets/why-we.png";
import { Link } from "react-router-dom";

const WhyWe = () => {
  return (
    <section id="whyWe">
      <div className="container">
        <div className="row align-items-center why_we_mobile">
          <div className="col-lg-6">
            <div className="left_img">
              <img
                className="img-fluid"
                src={BasketPerson}
                alt="baskert-person"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="right_content_wrapper">
              <div className="top_content mb-3">
                <h1 className="fs_82 fw-bold text-white mb-4">
                  Why we <br /> made Spohire
                </h1>
                <p className="we_aimed">
                  We aimed to simplify the process of finding{" "}
                  <br className="d-block d-md-none" /> a club for the player and
                  coach.
                </p>
              </div>
              <ul className="mb-2 md-mb-5 p-3 WhyWeList">
                <li className="md-fs_18   mb-3" style={{ color: "#ffffff6e" }}>
                  I can tell you first hand, ChainGPT is absolutely amazing.
                  They have helped me and my team speed up our working process
                  by 125%. The access to blockchain information was never
                  easier.
                </li>

                <li className="fs_18 mb-3" style={{ color: "#ffffff6e" }}>
                  I can tell you first hand, ChainGPT is absolutely amazing.
                  They have helped me and my team speed up our working process
                  by 125%. The access to blockchain information was never
                  easier.
                </li>

                <li className="fs_18  mb-3" style={{ color: "#ffffff6e" }}>
                  I can tell you first hand, ChainGPT is absolutely amazing.
                  They have helped me and my team speed up our working process
                  by 125%. The access to blockchain information was never
                  easier.
                </li>
              </ul>

              <div className="common_btn">
                <Link to="/signup" className="text-decoration-none">
                  Get Started Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWe;
