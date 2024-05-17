import "./WhyWe.css";
import BasketPerson from "../../assets/why-we.png";
import { Link } from "react-router-dom";

const WhyWe = () => {
  return (
    <section id="whyWe">
      <div className="container">
        <div className="row align-items-center why_we_mobile">
          <div className="col-lg-6">
            <div className=" d-lg-block d-none left_img">
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
                  Spohire has truly changed the game for me.{" "}
                  <br className="d-block d-md-none" /> Finding a new team was
                  never this easy!
                </p>
              </div>
              <ul className="mb-2 md-mb-5 p-3 WhyWeList">
                <li className="md-fs_18   mb-3" style={{ color: "#ffffff6e" }}>
                  At Spohire, our mission is to revolutionize the way sports
                  professionals connect and thrive. We believe that every
                  athlete, coach, and sports enthusiast deserves a platform that
                  empowers them to pursue their passions with ease.
                </li>

                <li className="fs_18 mb-3" style={{ color: "#ffffff6e" }}>
                  Our journey began with a simple yet powerful idea: to bridge
                  the gap between talent and opportunities in the sports
                  industry.
                </li>

                <li className="fs_18  mb-3" style={{ color: "#ffffff6e" }}>
                  With Spohire, we aim to create a global community where
                  football players, basketball players, volleyball players,
                  handball players, and coaches can find their perfect teams.
                </li>
                <li className="fs_18  mb-3" style={{ color: "#ffffff6e" }}>
                  We strive to provide a seamless experience where clubs can
                  effortlessly recruit top performers. Our commitment to
                  innovation, inclusivity, and excellence drives us to
                  continuously enhance the Spohire experience. Join us in
                  shaping the future of sports networking and empowerment.
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
