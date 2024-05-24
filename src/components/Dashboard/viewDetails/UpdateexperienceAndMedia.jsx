/* eslint-disable react/prop-types */
import fb from "../../../assets/fb1.png";
import insta from "../../../assets/insta1.png";
import plus from "../../../assets/plus3.png";
import Twitter from "../../../assets/twiter1.png";
import youtubeIcon from "../../../assets/youtube.png";

const UpdateexperienceAndMedia = ({
  userInfo,
  exp,
  handleAddMore,
  handleExperienceChange,
  handleInputChange,
  handleRemove,
}) => {
  return (
    <>
      <div className="container">
        <div className="experience_wrapper">
          <div className="row personal_info_edit_wrapper">
            <div className="col-lg-6 mb-lg-0 mb-4">
              <div className="editpersonal_info experience_update_wrapper">
                <p>Experience</p>
                <ul
                  className="mb-4"
                  style={{
                    listStyle: "none",
                    display: `${exp.length > 0 ? "block" : "none"}`,
                  }}
                >
                  {exp &&
                    exp.length > 0 &&
                    exp?.map((item, index) => (
                      <li
                        className="f_sfPro text_color_36 fs-6 mb-2"
                        key={index}
                      >
                        {item?.start_year}-{item?.end_year} {item?.club_name} -{" "}
                        <button
                          type="button"
                          className="text-black"
                          onClick={() => handleRemove(item)}
                        >
                          X
                        </button>
                      </li>
                    ))}
                </ul>
                <>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="w-100">
                        <label htmlFor={`startYear`} className="form-label">
                          From
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id={`startYear`}
                          name="start_year"
                          placeholder="2003"
                          onChange={handleExperienceChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="w-100">
                        <label htmlFor={`endYear`} className="form-label">
                          To
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id={`endYear`}
                          name="end_year"
                          placeholder="2008"
                          onChange={handleExperienceChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="w-100">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Club Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="club_name"
                          id="exampleFormControlInput1"
                          placeholder="Cleveland Cavaliers"
                          onChange={handleExperienceChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-lg-12">
                      <button
                        className="add_more_btn"
                        type="button"
                        onClick={handleAddMore}
                      >
                        <span>Add more</span>
                        <img src={plus} alt="" />
                      </button>
                    </div>
                  </div>
                </>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="editpersonal_info experience_update_wrapper1">
                <p>Social Media</p>
                <div className="position-relative">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Instagram
                  </label>
                  <div className="form_icons " style={{ top: "46px" }}>
                    <img className="mt-0" src={insta} alt="user" />
                  </div>

                  <input
                    onChange={(e) =>
                      handleInputChange("instagram", e.target.value)
                    }
                    type="text"
                    className="form-control ps-5"
                    name="instagram"
                    id="exampleFormControlInput1"
                    placeholder="johnkawalski05"
                    value={userInfo?.instagram}
                  />
                </div>
                <div className="position-relative">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Facebook
                  </label>
                  <div className="form_icons " style={{ top: "46px" }}>
                    <img className="mt-0" src={fb} alt="user" />
                  </div>
                  <input
                    onChange={(e) =>
                      handleInputChange("facebook", e.target.value)
                    }
                    type="text"
                    className="form-control ps-5"
                    name="facebook"
                    id="exampleFormControlInput1"
                    placeholder="johnkawalski05"
                    value={userInfo?.facebook}
                  />
                </div>
                <div className="position-relative">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Twitter
                  </label>
                  <div className="form_icons " style={{ top: "46px" }}>
                    <img className="mt-0" src={Twitter} alt="user" />
                  </div>

                  <input
                    onChange={(e) =>
                      handleInputChange("twitter", e.target.value)
                    }
                    type="text"
                    className="form-control ps-5"
                    name="twitter"
                    id="exampleFormControlInput1"
                    placeholder="johnkawalski05"
                    value={userInfo?.twitter}
                  />
                </div>
                <div className="position-relative">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Youtube
                  </label>
                  <div className="form_icons " style={{ top: "46px" }}>
                    <img className="mt-0" src={youtubeIcon} alt="user" />
                  </div>

                  <input
                    onChange={(e) =>
                      handleInputChange("youtube", e.target.value)
                    }
                    type="text"
                    className="form-control ps-5"
                    name="youtube"
                    id="exampleFormControlInput1"
                    placeholder="johnkawalski05"
                    value={userInfo?.youtube}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateexperienceAndMedia;
