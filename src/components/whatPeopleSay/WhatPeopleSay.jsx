/* eslint-disable react/prop-types */
import "./WhatPeopleSay.css";
import Start from "../../assets/star.png";
import ProfoleImg from "../../assets/profoleimg.png";
import GoogleImg from "../../assets/google.png";
import Googlesm from "../../assets/googlesm.png";
import { Carousel } from "react-bootstrap";
import CaousalHeader from "./CaousalHeader";

const WhatPeopleSay = ({ color }) => {
  return (
    <section>
      <div className="container say_container all_mb">
        <CaousalHeader color={color} />

        <Carousel data-bs-theme="dark">
          <Carousel.Item>
            <Carousel.Caption>
              <div className="row gy-3">
                <div className="col-12 col-lg-6">
                  <div className="sayInnerBox sayLeftbox">
                    <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                      <img
                        className="profoleImg"
                        src={ProfoleImg}
                        alt="Profile"
                      />
                      <div>
                        <p>John Mott</p>
                        <span>Fotball Coach</span>
                      </div>
                    </div>
                    <h5 className="mb-3 mb-lg-5">
                      “Their commitment to innovation is evident in every aspect
                      of their platform. Can't wait to see what they come up
                      with next!”
                    </h5>
                    <div className="d-flex  flex-md-row justify-content-start align-items-center gap-1 gap-lg-3 google_mobile">
                      <img
                        className="d-none d-lg-block"
                        src={GoogleImg}
                        alt="Logo"
                      />
                      <img
                        className="d-block d-lg-none"
                        src={Googlesm}
                        alt="Logo"
                      />
                      <div className="g_review d-flex flex-wrap flex-lg-row justify-content-start align-items-start align-items-lg-center gap-1">
                        <span>A 5.00</span>
                        <div className="d-flex align-items-center gap-1 star_design">
                          <img src={Start} alt="star" />
                          <img src={Start} alt="star" />
                          <img src={Start} alt="star" />
                          <img src={Start} alt="star" />
                          <img src={Start} alt="star" />
                        </div>
                        <span>previews from Elia Joe</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-6">
                  <div className="sayInnerBox sayRightbox">
                    <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                      <img
                        className="profoleImg"
                        src={ProfoleImg}
                        alt="Profile"
                      />
                      <div>
                        <p>Giovanni Rossi</p>
                        <span>Volleyball Player</span>
                      </div>
                    </div>
                    <h5 className="mb-3 mb-lg-5">
                      “Spohire has truly changed the game for me. Finding a new
                      team was never this easy!”
                    </h5>
                    <div className="d-flex flex-md-row justify-content-start align-items-center gap-1 gap-lg-3 google_mobile">
                      <img
                        className="d-none d-lg-block"
                        src={GoogleImg}
                        alt="Logo"
                      />
                      <img
                        className="d-block d-lg-none"
                        src={Googlesm}
                        alt="Logo"
                      />
                      <div className="g_review d-flex flex-wrap flex-lg-row justify-content-start align-items-start align-items-lg-center gap-1">
                        <span>A 5.00</span>
                        <div className="d-flex align-items-center gap-1 star_design">
                          <img src={Start} alt="star" />
                          <img src={Start} alt="star" />
                          <img src={Start} alt="star" />
                          <img src={Start} alt="star" />
                          <img src={Start} alt="star" />
                        </div>
                        <span>previews from Elia Joe</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          {/* <Carousel.Item>
            <Carousel.Caption>
              <div className="row gy-3">
                <div className="col-12 col-lg-6">
                  <div className="sayInnerBox sayLeftbox">
                    <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                      <img
                        className="profoleImg"
                        src={ProfoleImg}
                        alt="Profile"
                      />
                      <div>
                        <p>Joe Elia</p>
                        <span>User Interface Design</span>
                      </div>
                    </div>
                    <h5 className="mb-3 mb-lg-5">
                      “In urna, non nisl tincidunt gravida elementum turpis.
                      Risus, ac ultrices tincie quam arcu odio volutpat.”
                    </h5>
                    <div className="d-flex  flex-md-row justify-content-start align-items-center gap-1 gap-lg-3 google_mobile">
                      <img
                        className="d-none d-lg-block"
                        src={GoogleImg}
                        alt="Logo"
                      />
                      <img
                        className="d-block d-lg-none"
                        src={Googlesm}
                        alt="Logo"
                      />
                      <div className="g_review d-flex flex-wrap flex-lg-row justify-content-start align-items-start align-items-lg-center gap-1">
                        <span>A 5.00</span>
                        <div className="d-flex align-items-center gap-1 star_design">
                          <img src={Start} alt="star" />
                          <img src={Start} alt="star" />
                          <img src={Start} alt="star" />
                          <img src={Start} alt="star" />
                          <img src={Start} alt="star" />
                        </div>
                        <span>previews from Elia Joe</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-6">
                  <div className="sayInnerBox sayRightbox">
                    <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                      <img
                        className="profoleImg"
                        src={ProfoleImg}
                        alt="Profile"
                      />
                      <div>
                        <p>Joe Elia</p>
                        <span>User Interface Design</span>
                      </div>
                    </div>
                    <h5 className="mb-3 mb-lg-5">
                      “In urna, non nisl tincidunt gravida elementum turpis.
                      Risus, ac ultrices tincie quam arcu odio volutpat.”
                    </h5>
                    <div className="d-flex flex-md-row justify-content-start align-items-center gap-1 gap-lg-3 google_mobile">
                      <img
                        className="d-none d-lg-block"
                        src={GoogleImg}
                        alt="Logo"
                      />
                      <img
                        className="d-block d-lg-none"
                        src={Googlesm}
                        alt="Logo"
                      />
                      <div className="g_review d-flex flex-wrap  flex-lg-row justify-content-start align-items-start align-items-lg-center gap-1">
                        <span>A 5.00</span>
                        <div className="d-flex align-items-center gap-1 star_design">
                          <img src={Start} alt="star" />
                          <img src={Start} alt="star" />
                          <img src={Start} alt="star" />
                          <img src={Start} alt="star" />
                          <img src={Start} alt="star" />
                        </div>
                        <span>previews from Elia Joe</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item> */}
        </Carousel>
      </div>
    </section>
  );
};

export default WhatPeopleSay;
