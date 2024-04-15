import React from "react";
import uploadImg from "../../../assets/upload_img.png";
import { FaLink } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import bronze from "../../../assets/bronze.png";
import facebook from "../../../assets/facebook.png";
import gold from "../../../assets/gold.png";
import instagram from "../../../assets/instagram.png";
import nationalityImg from "../../../assets/nationality_flag.png";
import profileImage from "../../../assets/profile_avatar.png";
import silver from "../../../assets/silver1.png";


const AddPlayerModal = () => {
  const { user } = useSelector((state) => state.auth);
    const convertAge = (dateString) => {
      const dob = new Date(dateString);
      const currentDate = new Date();
      const timeDiff = currentDate - dob;
      const age = Math.floor(timeDiff / (365.25 * 24 * 60 * 60 * 1000));
      return age;
    };

  return (
    <div className="addplayer_modal ">
      <div className="inner">
        <div className="modal_heading">
          <h2>Add Player</h2>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="upload_photo">
              <p className="mb-4 text-center">Upload Main Photo</p>

              <div className="upload_thumbnail d-flex align-items-center justify-content-center">
                <img src={uploadImg} alt="upload-img" />
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="row">
              <div className="col-lg-6">
                <div className="input_form pb-4">
                  <label htmlFor="name" className="d-block label_name mb-2">
                    Name *
                  </label>
                  <input id="name" type="text" placeholder="Enter Your Name" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="input_form pb-4">
                  <label htmlFor="name" className="d-block label_name mb-2">
                    Last Name *
                  </label>
                  <input id="name" type="text" placeholder="Enter Your Name" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="input_form pb-4">
                  <label htmlFor="name" className="d-block label_name mb-2">
                    Gender *
                  </label>
                  <input id="name" type="text" placeholder="Select here" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="input_form pb-4">
                  <label htmlFor="name" className="d-block label_name mb-2">
                    Date of birth *
                  </label>
                  <input id="name" type="text" placeholder="DD - MM - YYYY" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="input_form pb-4">
                  <label htmlFor="name" className="d-block label_name mb-2">
                    Nationality *
                  </label>
                  <input id="name" type="text" placeholder="Select here" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="input_form pb-4">
                  <label htmlFor="name" className="d-block label_name mb-2">
                    Country of residence *
                  </label>
                  <input id="name" type="text" placeholder="Select here" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="input_form pb-4">
              <label htmlFor="name" className="d-block label_name mb-2">
                E-mail *
              </label>
              <input id="name" type="text" placeholder="Type here" />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="input_form pb-4">
              <label htmlFor="name" className="d-block label_name mb-2">
                Phone number *
              </label>
              <input id="name" type="text" placeholder="Phone number" />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="input_form pb-4">
              <label htmlFor="name" className="d-block label_name mb-2">
                City of residence *
              </label>
              <input id="name" type="text" placeholder="City of residence " />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="input_form pb-4">
              <label htmlFor="name" className="d-block label_name mb-2">
                Weight
              </label>
              <input id="name" type="text" placeholder="Weight" />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="input_form pb-4">
              <label htmlFor="name" className="d-block label_name mb-2">
                Height
              </label>
              <input id="name" type="text" placeholder="Height" />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="input_form pb-4">
              <label htmlFor="name" className="d-block label_name mb-2">
                Dominant Hand *
              </label>
              <input id="name" type="text" placeholder="Dominant Hand" />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="input_form pb-4">
              <label htmlFor="name" className="d-block label_name mb-2">
                Main position *
              </label>
              <input id="name" type="text" placeholder="Select here" />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="input_form pb-4">
              <label htmlFor="name" className="d-block label_name mb-2">
                Alternative position
              </label>
              <input id="name" type="text" placeholder="Select here" />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="input_form pb-4">
              <label htmlFor="name" className="d-block label_name mb-2">
                Additional passport
              </label>
              <input id="name" type="text" placeholder="Select here" />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="input_form pb-4">
              <label htmlFor="name" className="d-block label_name mb-2">
                Do you currently belong to a club? *
              </label>
              <div className="btn_group d-flex gap-3">
                <button className="yes">Yes</button>
                <button className="no">No</button>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="input_form pb-4">
              <label htmlFor="name" className="d-block label_name mb-2">
                Club name
              </label>
              <input id="name" type="text" placeholder="Club name" />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="View_details container p-0 overflow-hidden bg-white">
              <div className="experience_information d-flex justify-content-between mb-5">
                <div className="ei_left" style={{ width: "500px" }}>
                  <p className="f_sfPro text_color_36 fs-4 mb-4">
                    Personal Information
                  </p>

                  <div className="d-flex flex-column align-items-start gap-3">
                    <div className="d-flex" style={{ gap: "145px" }}>
                      <div>
                        <span className="user_name">Name</span>
                        <p className="user_data_info fs-6">
                          {user?.first_name} {user?.last_name}
                        </p>
                      </div>

                      <div>
                        <span className="fuser_name user_name">Age</span>
                        <p className="user_data_info fs-6">
                          {convertAge(user?.date_of_birth)}
                        </p>
                      </div>
                    </div>

                    <div className="d-flex" style={{ gap: "78px" }}>
                      <div>
                        <span className="user_name">Nationality-Passport</span>
                        <p className="user_data_info fs-6">
                          {user?.nationality}
                        </p>
                      </div>

                      <div>
                        <span className="user_name">Position</span>
                        <p className="user_data_info fs-6">
                          {user?.position ? user?.position : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <ViewDetailsMobile user={user} /> */}
              {/* <Gallary gallary={user?.gallary} /> */}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="View_details container p-0 overflow-hidden bg-white">
              <div className="experience_information d-flex justify-content-between mb-5">



                  <div className="ei_right" style={{ width: "500px" }}>
                    <div>
                      <p className="f_sfPro mb-2 experience">Experience</p>
                      <div className="d-flex flex-column flex-lg-row align-items-start gap-5">
                        <div>
                          {user?.experience?.length > 0 &&
                            user?.experience.map((item, idx) => (
                              <p
                                className="f_sfPro text_color_36 fs_18"
                                key={idx}>
                                {item?.start_year}-{item?.end_year}{" "}
                                {item?.club_name}
                              </p>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

              </div>
              {/* <ViewDetailsMobile user={user} /> */}
              {/* <Gallary gallary={user?.gallary} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlayerModal;
