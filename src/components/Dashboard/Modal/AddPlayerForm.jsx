import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import addIcon from "../../../assets/addIcon.svg";
const sportsDatas = ["Football", "Basketball", "Handball", "Volleyball"];
const postions = [
  {
    type: "Football",
    mainPositions: ["goalkeeper", "defender", "midfielder", "forward"],
    alternativePositions: [
      "goalkeeper",
      "sweeper",
      "centre-back",
      "left-back",
      "right-back",
      "central-midfielder",
      "left-midfielder",
      "right-midfielder",
      "left-wing-forward",
      "right-wing-forward",
      "centre-forward",
    ],
  },
  {
    type: "Basketball",
    mainPositions: [
      "center",
      "power-forward",
      "small-forward",
      " point-guard",
      "shooting-guard",
    ],
    alternativePositions: [
      "center",
      "power-forward",
      "small-forward",
      " point-guard",
      "shooting-guard",
    ],
  },
  {
    type: "Handball",
    mainPositions: [
      "goalkeeper",
      "left-wing",
      "right-wing",
      " left-back",
      " right-back",
      " centre back",
      "pivot",
    ],
    alternativePositions: [
      "goalkeeper",
      "left-wing",
      "right-wing",
      " left-back",
      " right-back",
      " centre back",
      "pivot",
    ],
  },
  {
    type: "Volleyball",
    mainPositions: [
      "setter",
      " middle-blocker",
      " outside-hitter",
      "opposite-hitter",
      " libero",
    ],
    alternativePositions: [
      "setter",
      " middle-blocker",
      " outside-hitter",
      "opposite-hitter",
      " libero",
    ],
  },
];

const AddPlayerForm = ({
  handleInputChange,
  handleSocialLinkChange,
  handleExperienceChange,
  handleAddMore,
  exp,
  selectedProfileFile,
  profileRootProps,
  profileInputProps,
  selectedGalleryFiles,
  galleryRootProps,
  galleryInputProps,
  isProfileUploaded,
  handleRemove,
  removeGallaryImage,
  PlayerType,
  errors,
}) => {
  const [countryNames, setCountryNames] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json"
      )
      .then(function (response) {
        setCountryNames(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [sportsType, setSportsType] = useState("Football");
  const { user } = useSelector((store) => store.auth);

  let mainAndAditionPostions = postions.filter(
    (item) => item.type === sportsType
  );

  const [mainPositionType, setMainPositionType] = useState("");
  const [altPositions, setAltPostions] = useState([]);

  function filterAlternativePositions(mainPositionType) {
    return mainAndAditionPostions.map((position) => {
      if (position.mainPositions.includes(mainPositionType)) {
        return {
          ...position,
          alternativePositions: position.alternativePositions.filter(
            (altPosition) => altPosition !== mainPositionType
          ),
        };
      } else {
        return position;
      }
    });
  }

  useEffect(() => {
    const altPostions = filterAlternativePositions(mainPositionType);
    setAltPostions(altPostions);
  }, [mainPositionType]);

  const [isBelongClub, setBelongclub] = useState(null);
  return (
    <div>
      <div className="row">
        <div className="col-lg-4">
          <div className="upload_photo">
            <div
              className="position-relative text-start"
              style={{ marginBottom: "32px" }}
            >
              {/* upload */}
              <div
                className={`${
                  selectedProfileFile ? "d-block" : "d-none"
                } upload_thumbnail border bg-transparent overflow-hidden`}
                style={{ width: "230px", height: "230px" }}
                {...profileRootProps()}
              >
                {selectedProfileFile ? (
                  <img
                    src={URL.createObjectURL(selectedProfileFile)}
                    alt="Uploaded file"
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <p>Drop your profile photo here or click to select</p>
                )}
              </div>

              {/* select image */}
              <button
                className={`upload_thumbnail border bg-transparent ${
                  isProfileUploaded ? "d-none" : ""
                }`}
                style={{ width: "230px", height: "230px" }}
                {...profileRootProps()}
              >
                <input {...profileInputProps()} />
                Upload Profile Photo
              </button>
            </div>
          </div>
          {/* this is for my upload profile images -/end */}
        </div>

        <div className="col-lg-8">
          <div className="row">
            <div className="col-lg-6">
              <div className="input_form pb-4">
                <label htmlFor="name" className="d-block label_name mb-2">
                  Name *
                </label>
                <input
                  required
                  id="name"
                  type="text"
                  name="firstName"
                  onChange={handleInputChange}
                  placeholder="Enter Your Name"
                  className={errors.firstName ? "input-error" : ""}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input_form pb-4">
                <label htmlFor="name" className="d-block label_name mb-2">
                  Last Name *
                </label>
                <input
                  required
                  id="name"
                  name="lastName"
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter Your Name"
                  className={errors.lastName ? "input-error" : ""}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="pb-4">
                <label htmlFor="name" className="d-block label_name mb-2">
                  Gender *
                </label>

                <select
                  required
                  name="gender"
                  onChange={handleInputChange}
                  className={`${
                    errors.gender ? "input-error" : ""
                  } select_form`}
                >
                  <option disabled selected>
                    Select Here
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input_form pb-4">
                <label htmlFor="name" className="d-block label_name mb-2">
                  Date of birth *
                </label>
                <input
                  required
                  id="name"
                  type="date"
                  name="date_of_birth"
                  onChange={handleInputChange}
                  placeholder="DD - MM - YYYY"
                  className={errors.date_of_birth ? "input-error" : ""}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="pb-4">
                <label htmlFor="name" className="d-block label_name mb-2">
                  Nationality *
                </label>
                <select
                  required
                  className={`${
                    errors.nationality ? "input-error" : ""
                  } select_form`}
                  name="nationality"
                  onChange={handleInputChange}
                >
                  <option>Select Here</option>

                  {countryNames?.map((country, index) => (
                    <option value={country.name} className="" key={index}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input_form pb-4">
                <label htmlFor="name" className="d-block label_name mb-2">
                  Country of residence *
                </label>
                <select
                  required
                  className={`${
                    errors.country ? "input-error" : ""
                  } select_form`}
                  name="country"
                  onChange={handleInputChange}
                >
                  <option disabled>Select Here</option>
                  {countryNames?.map((country, index) => (
                    <option value={country.name} className="" key={index}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="input_form pb-4">
            <label htmlFor="name" className="d-block label_name mb-2">
              E-mail *
            </label>
            <input
              required
              id="name"
              type="email"
              name="email"
              className={errors.email ? "input-error" : ""}
              onChange={handleInputChange}
              placeholder="Type here"
            />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="input_form pb-4">
            <label htmlFor="name" className="d-block label_name mb-2">
              Phone number *
            </label>
            <input
              required
              id="name"
              type="number"
              min={0}
              name="phone_number"
              className={errors.phone_number ? "input-error" : ""}
              onChange={handleInputChange}
              placeholder="Phone number"
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="input_form pb-4">
            <label htmlFor="name" className="d-block label_name mb-2">
              City of residence *
            </label>
            <input
              required
              id="name"
              type="text"
              name="city"
              className={errors.city ? "input-error" : ""}
              onChange={handleInputChange}
              placeholder="City of residence "
            />
          </div>
        </div>

        {PlayerType !== "Coach" && (
          <div className="col-lg-4">
            <div className="input_form pb-4">
              <label htmlFor="name" className="d-block label_name mb-2">
                Weight (kg)
              </label>
              <input
                id="name"
                name="weight"
                className={errors.weight ? "input-error" : ""}
                min={0}
                onChange={handleInputChange}
                type="number"
                placeholder="Weight"
              />
            </div>
          </div>
        )}

        {PlayerType !== "Coach" && (
          <div className="col-lg-4">
            <div className="input_form pb-4">
              <label htmlFor="name" className="d-block label_name mb-2">
                Height (cm)
              </label>
              <input
                id="name"
                type="number"
                name="height"
                className={errors.height ? "input-error" : ""}
                min={0}
                onChange={handleInputChange}
                placeholder="Height"
              />
            </div>
          </div>
        )}

        <div className="col-lg-4">
          <div className="pb-4">
            <label htmlFor="name" className="d-block label_name mb-2">
              Sports *
            </label>
            <select
              required
              name="sports"
              className={`${errors.sports ? "input-error" : ""} select_form`}
              onChange={(e) => {
                handleInputChange(e);
                setSportsType(e.target.value);
              }}
            >
              <option value="#" selected disabled>
                Select Sports
              </option>
              {sportsDatas.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {PlayerType !== "Coach" && (
          <div className="col-lg-4">
            <div className="pb-4">
              <label htmlFor="name" className="d-block label_name mb-2">
                Dominant {sportsType === "Football" ? "Foot" : "Hand"} *
              </label>
              <select
                required
                className={`${
                  errors.dominantHand ? "input-error" : ""
                } select_form`}
                name="dominantHand"
                onChange={handleInputChange}
              >
                <option selected disabled>
                  Select Here
                </option>
                <option value={"Left"}>Left</option>
                <option value={"Right"}>Right</option>
              </select>
            </div>
          </div>
        )}

        {PlayerType !== "Coach" && (
          <div className="col-lg-4">
            <div className="input_form pb-4">
              <label htmlFor="name" className="d-block label_name mb-2">
                Main position *
              </label>

              <select
                required
                className={`${
                  errors.gender ? "input-error" : ""
                } select_form text-capitalize`}
                name="mainPosition"
                onChange={(e) => {
                  handleInputChange(e);
                  setMainPositionType(e.target.value);
                }}
              >
                <option selected disabled>
                  Select Here
                </option>
                {mainAndAditionPostions[0]?.mainPositions?.map(
                  (item, index) => (
                    <option
                      key={index}
                      value={item}
                      className="text-capitalize"
                    >
                      {item}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        )}

        {PlayerType !== "Coach" && (
          <div className="col-lg-4">
            <div className="input_form pb-4">
              <label htmlFor="name" className="d-block label_name mb-2">
                Alternative position
              </label>

              <select
                required
                className={`${
                  errors.alterPosition ? "input-error" : ""
                } select_form text-capitalize`}
                name="alterPosition"
                onChange={handleInputChange}
              >
                <option value={"N/A"} selected>
                  Select
                </option>
                {altPositions[0]?.alternativePositions?.map((item, index) => (
                  <option key={index} value={item} className="text-capitalize">
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="col-lg-4">
          <div className="input_form pb-4">
            <label htmlFor="name" className="d-block label_name mb-2">
              Additional passport
            </label>
            <select
              required
              className={`${
                errors.additional_passport ? "input-error" : ""
              } select_form`}
              name="additional_passport"
              onChange={handleInputChange}
            >
              <option value={"N/A"} select>
                Select
              </option>
              {countryNames?.map((country, index) => (
                <option value={country.name} className="" key={index}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="input_form pb-4">
            <label htmlFor="name" className="d-block label_name mb-2">
              Do you currently belong to a club? *
            </label>

            <div className="btn_group d-flex gap-3 mt-2">
              <input
                type="radio"
                id="yes"
                className="yes"
                value={"yes"}
                name="belong_to_the_club"
                onChange={(e) => {
                  setBelongclub(true);
                  handleInputChange(e);
                }}
                style={{ display: "none" }}
              />{" "}
              <label
                style={{
                  cursor: "pointer",
                  color: `${isBelongClub ? "#fff" : ""}`,
                  fontSize: 14,
                  backgroundColor: `${isBelongClub ? "#05CD99" : ""}`,
                }}
                className="btn btn-outline-success"
                htmlFor="yes"
              >
                YES
              </label>
              <input
                type="radio"
                className="no"
                value={"no"}
                id="no"
                onChange={(e) => {
                  setBelongclub(false);
                  handleInputChange(e);
                }}
                name="belong_to_the_club"
                style={{
                  display: "none",
                }} // Hide the radio input visually
              />{" "}
              <label
                style={{
                  cursor: "pointer",
                  color: `${!isBelongClub ? "#fff" : ""}`,
                  fontSize: 14,
                  background: `${!isBelongClub ? "#05CD99" : ""}`,
                }}
                htmlFor="no"
                className="btn btn-outline-success"
              >
                NO
              </label>
            </div>
          </div>
        </div>

        {isBelongClub && (
          <div className="col-lg-8">
            <div className="input_form pb-4">
              <label htmlFor="name" className="d-block label_name mb-2">
                Club name
              </label>
              <input
                id="name"
                name="club_name"
                onChange={handleInputChange}
                type="text"
                placeholder="Club name"
              />
            </div>
          </div>
        )}

        <div className="col-lg-6">
          <div className="overflow-hidden bg-white">
            <div className="experience_information">
              <div className="ei_left">
                <p className="f_sfPro text_color_36 fs-4 mb-4">Experience</p>
                {/* <ul className="mb-4" style={{ listStyle: "none" }}>
                  {exp &&
                    exp?.map((item, index) => (
                      <li
                        className="f_sfPro text_color_36 fs-6 my-1"
                        key={index}
                      >
                        {item?.start_year}-{item?.end_year} {item?.club_name} -{" "}
                        <button
                          className="text-black"
                          onClick={() => handleRemove(item)}
                        >
                          X
                        </button>
                      </li>
                    ))}
                </ul> */}
                <div className="mb-5">
                  {exp &&
                    exp.length > 0 &&
                    exp?.map((item, index) => (
                      <div className="row position-relative mb-3" key={index}>
                        <div className="col-lg-4">
                          <div className="w-100">
                            <label className="form-label">From</label>
                            <input
                              type="text"
                              className="form-control"
                              value={item?.start_year}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="w-100">
                            <label className="form-label">To</label>
                            <input
                              type="text"
                              className="form-control"
                              value={item?.end_year}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="w-100">
                            <label className="form-label">Club Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={item?.club_name}
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          className=" btn btn-danger position-absolute d-flex align-items-center justify-content-center p-1"
                          style={{
                            right: 0,
                            top: 20,
                            width: "30px",
                            borderRadius: "50%",
                            fontSize: "15px",
                          }}
                          onClick={() => handleRemove(item)}
                        >
                          {" "}
                          <span class="badge badge-pill badge-danger ">X</span>
                        </button>
                      </div>
                    ))}
                </div>

                <div className="d-flex flex-column align-items-start gap-3">
                  <div className="d-flex gap-4 pb-4">
                    <div className="input_form pb-4">
                      <label htmlFor="name" className="d-block label_name mb-2">
                        From
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="start_year"
                        placeholder="2003"
                        onChange={handleExperienceChange}
                      />
                    </div>

                    <div className="input_form pb-4">
                      <label htmlFor="name" className="d-block label_name mb-2">
                        To
                      </label>
                      <input
                        id="name"
                        name="end_year"
                        placeholder="2008"
                        onChange={handleExperienceChange}
                        type="text"
                      />
                    </div>

                    <div className="input_form pb-4">
                      <label
                        htmlFor="club_name"
                        className="d-block label_name mb-2"
                      >
                        Club Name
                      </label>
                      <input
                        id="name"
                        name="club_name"
                        placeholder="Cleveland Cavaliers"
                        onChange={handleExperienceChange}
                        type="text"
                      />
                    </div>
                  </div>

                  <button
                    className="modal_btn py-3 px-4 d-flex gap-2 w-100 justify-content-center"
                    onClick={handleAddMore}
                  >
                    Add more
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          d="M10.5 7.5V12.5M13 10H8M18 10C18 10.9849 17.806 11.9602 17.4291 12.8701C17.0522 13.7801 16.4997 14.6069 15.8033 15.3033C15.1069 15.9997 14.2801 16.5522 13.3701 16.9291C12.4602 17.306 11.4849 17.5 10.5 17.5C9.51509 17.5 8.53982 17.306 7.62987 16.9291C6.71993 16.5522 5.89314 15.9997 5.1967 15.3033C4.50026 14.6069 3.94781 13.7801 3.5709 12.8701C3.19399 11.9602 3 10.9849 3 10C3 8.01088 3.79018 6.10322 5.1967 4.6967C6.60322 3.29018 8.51088 2.5 10.5 2.5C12.4891 2.5 14.3968 3.29018 15.8033 4.6967C17.2098 6.10322 18 8.01088 18 10Z"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* <ViewDetailsMobile user={user} /> */}
            {/* <Gallary gallary={user?.gallary} /> */}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="overflow-hidden bg-white">
            <div className="experience_information">
              <div className="ei_left">
                <p className="f_sfPro text_color_36 fs-4 mb-4">Social Media</p>

                <div className="d-flex flex-column align-items-start gap-3">
                  <div className="input_form pb-4 w-100 pb-4">
                    <label htmlFor="name" className="d-block label_name mb-2">
                      Instagram
                    </label>
                    <input
                      className="w-100"
                      id="name"
                      name="instagram"
                      onChange={handleSocialLinkChange}
                      type="text"
                      placeholder="Instagram"
                    />
                  </div>

                  <div className="input_form pb-4 w-100 pb-4">
                    <label htmlFor="name" className="d-block label_name mb-2">
                      Facebook
                    </label>
                    <input
                      className="w-100"
                      id="name"
                      type="text"
                      name="facebook"
                      onChange={handleSocialLinkChange}
                      placeholder="Facebook"
                    />
                  </div>

                  <div className="input_form pb-4 w-100 pb-4">
                    <label htmlFor="name" className="d-block label_name mb-2">
                      Twitter
                    </label>
                    <input
                      className="w-100"
                      id="name"
                      type="text"
                      name="twitter"
                      onChange={handleSocialLinkChange}
                      placeholder="Twitter"
                    />
                  </div>

                  <div className="input_form pb-4 w-100 pb-4">
                    <label htmlFor="name" className="d-block label_name mb-2">
                      youtube
                    </label>
                    <input
                      className="w-100"
                      id="name"
                      type="text"
                      name="youtube"
                      onChange={handleSocialLinkChange}
                      placeholder="Tiktok"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <ViewDetailsMobile user={user} /> */}
            {/* <Gallary gallary={user?.gallary} /> */}
          </div>
        </div>

        <div className="other_information mt-5 p-4">
          <div className="row">
            {/* <div className="d-flex justify-content-end">
              <button className="py-2 px-4 btn_save">Save</button>
            </div> */}

            <div className="col-lg-4">
              <div className="oi_title pb-2">
                <h4>Strengths Advantages</h4>
              </div>
              <textarea
                id=""
                cols="30"
                rows="10"
                name="strengths_advantage"
                onChange={handleInputChange}
                placeholder="Type here"
              ></textarea>
            </div>

            <div className="col-lg-4">
              <div className="oi_title pb-2">
                <h4>About Me</h4>
              </div>
              <textarea
                name="about_me"
                onChange={handleInputChange}
                id=""
                cols="30"
                rows="10"
                placeholder="Type here"
              ></textarea>
            </div>
            <div className="col-lg-4">
              <div className="oi_title pb-2">
                <h4>Expectations From a New Club</h4>
              </div>
              <textarea
                name="expectations_from_new_club"
                onChange={handleInputChange}
                id=""
                cols="30"
                rows="10"
                placeholder="Type here"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="gallery mt-5 p-4">
          {/* this is for my upload gallary images */}
          <div className="row">
            <div className="d-flex justify-content-between pb-5">
              <h2 className="fs-4">Gallery</h2>
              {/* <button className="py-2 px-4 btn_save">Save</button> */}
            </div>
            <div className="upload-images d-flex gap-4 flex-wrap mb-4 ">
              {selectedGalleryFiles.map((file, index) => (
                
                <div key={index} className="position-relative">
                  <img
                    style={{ width: "130px", height: "130px" }}
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded file ${index}`}
                  />
                  <button
                    className="position-absolute p-1 px-2  bg-black text-white"
                    style={{
                      right: "5px",
                      top: "5px",
                      fontSize: "10px",
                      borderRadius: "100%",
                    }}
                    onClick={() => removeGallaryImage(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <div>
              <button
                className="add-btn p-4 bg-none d-inline-flex align-items-center gap-2"
                {...galleryRootProps()}
              >
                <div className="add_icon">
                  <img src={addIcon} alt="add-icon" />
                </div>
                <input {...galleryInputProps()} />
                Add Photo or Video
              </button>
            </div>
          </div>
          {/* this is for my upload gallary images -/end */}
        </div>
      </div>
    </div>
  );
};

export default AddPlayerForm;
