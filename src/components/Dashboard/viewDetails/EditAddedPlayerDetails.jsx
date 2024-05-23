import "./ViewDetails.css";
import profileImage from "../../../assets/profile_upload.png";
import upload from "../../../assets/upload.png";
import plus4 from "../../../assets/plus4.png";
import UpdateexperienceAndMedia from "./UpdateexperienceAndMedia";
import EditGallary from "./EditGallary";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetPlayerDetailsQuery,
  useUpdatePlayerDetailsMutation,
} from "../../../features/auth/authApi";
import { userLoggedIn } from "../../../features/auth/authSlice";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import axios from "axios";

// const sportsDatas = ["Football", "Basketball", "Handball", "Volleyball"];

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

// data
const inputFieldData = [
  {
    label: "First Name",
    placeholderText: "Your name",
    type: "text",
    name: "firstName",
  },
  {
    label: "Last Name",
    placeholderText: "LastName",
    type: "text",
    name: "lastName",
  },
  {
    label: "Email",
    placeholderText: "email",
    type: "email",
    name: "email",
  },
  {
    label: "Phone Number",
    placeholderText: "Phone Number",
    type: "text",
    name: "phone_number",
  },
  {
    label: "Country of Residence",
    placeholderText: "Residence",
    type: "text",
    name: "city",
  },
  {
    label: "Date of Birth",
    placeholderText: "DD-MM-YYYY",
    type: "date",
    name: "date_of_birth",
  },

  {
    label: "Height",
    placeholderText: "You Height",
    type: "number",
    name: "height",
  },
  {
    label: "Weight",
    placeholderText: "Your Weight",
    type: "number",
    name: "weight",
  },
  // { label: "Race", placeholderText: "Your Race", type: "text" },
];

const EditAddedPlayerDetails = () => {
  const { id } = useParams();
  const { data: user } = useGetPlayerDetailsQuery(id);
  const [updatePlayerDetails, { isLoading }] = useUpdatePlayerDetailsMutation();
  // gallary

  const [selectedImages, setSelectedImages] = useState([]);
  // profile
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  // onchange value
  const initialFormData = inputFieldData.reduce(
    (acc, field) => {
      acc[field.label.toLowerCase()] = "";
      return acc;
    },
    {
      firstName: "",
      lastName: "",
      city: "",
      email: "",
      phone_number: "",
      playerName: "",
      sportsType: "",
      selectedImage: null,
      experiences: [],
      clubName: "",
      socialMedia: {
        facebook: "",
        instagram: "",
        twitter: "",
      },
      strengthsAdvantages: "",
      aboutMe: "",
      mainPosition: "",
      alterPosition: "",
      expectationsFromClub: "",
    }
  );

  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialFormData);
  const [gallaryImage, setGallaryImage] = useState(null);
  const [socialMedia, setSocialMedia] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
  });

  const [userInfo, setUserInfo] = useState({
    date_of_birth: "",
    nationality: "",
    mainPosition: "",
    dominantHand: "",
    height: "",
    weight: "",
    image: "",
    experience: [],
    strengths_advantage: "",
    about_me: "",
    expectations_from_new_club: "",
    sports: "",
  });

  const [editedInfo, setEditedInfo] = useState({});

  const navigate = useNavigate();

  const [isBelongClub, setBelongclub] = useState(true);

  const [selectedGalleryFiles, setSelectedGalleryFiles] = useState([]);

  const onGalleryDrop = (acceptedFiles) => {
    setSelectedGalleryFiles([...selectedGalleryFiles, ...acceptedFiles]);
  };

  const { getRootProps: galleryRootProps, getInputProps: galleryInputProps } =
    useDropzone({ onDrop: onGalleryDrop });
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUserInfo({ ...userInfo, ["image"]: file });
      setSelectedImage(file);
      setEditedInfo({ ...editedInfo, ["image"]: file });
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const [experienceFormData, setExperienceFormData] = useState({});

  const [userExperience, setUserExperience] = useState([]);

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setExperienceFormData({ ...experienceFormData, [name]: value });
  };
  // get all data
  const handleInputChange = (fieldName, value) => {
    setUserInfo((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    setEditedInfo((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // form submit data
  const handleUpdate = async (e) => {
    e.preventDefault();
    const socialMediaArray = Object.values(socialMedia);
    const infoData = { ...editedInfo, social_media: socialMediaArray };
    const formData = new FormData();
    Object.keys(infoData).forEach((key) => {
      const propertyValue = infoData[key];
      if (Array.isArray(propertyValue)) {
        propertyValue.forEach((element, index) => {
          if (typeof element === "object") {
            Object.keys(element).forEach((elementKey) => {
              const elementValue = element[elementKey];
              formData.append(`${key}[${index}][${elementKey}]`, elementValue);
            });
          } else {
            formData.append(`${key}[]`, element);
          }
        });
      } else {
        formData.append(key, propertyValue);
      }
    });
    selectedGalleryFiles?.forEach((img, index) => {
      formData.append(`gallary`, img);
    });

    formData.append("experiencenew", JSON.stringify(userExperience));

    try {
      const response = await updatePlayerDetails({
        playerId: user?._id,
        data: formData,
      });
      if (response?.data?.status) {
        Swal.fire({
          icon: "success",
          title: "Update successfully!",
          text: `${response?.data?.message}`,
        });

        navigate("/dashboard/addedItems");
      }
      if (response?.error?.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response?.error?.data?.message}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    }
  };
  const handleRemove = (itemToRemove) => {
    const newExperienceData = userInfo.experience.filter(
      (item) => item !== itemToRemove
    );
    setEditedInfo((prevInfo) => ({
      ...prevInfo,
      experience: newExperienceData, // Update editedInfo with new experience data
    }));
    setUserInfo({ ...userInfo, experience: newExperienceData });
    setUserExperience(newExperienceData);
  };

  const handleAddMore = () => {
    if (
      experienceFormData.start_year &&
      experienceFormData.end_year &&
      experienceFormData.club_name
    ) {
      const newData = [...userExperience, experienceFormData]; // Add new experience to userExperience state
      setUserExperience(newData); // Update local state for immediate UI feedback
      setEditedInfo((prevInfo) => ({
        ...prevInfo,
        experience: newData, // Update editedInfo with new experience data
      }));
      setUserInfo({ ...userInfo, experience: newData });
    } else {
      alert("Please fill up the experience data properly");
    }
  };

  useEffect(() => {
    const newData = {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      additional_passport: user?.additional_passport,
      phone_number: user?.phone_number,
      date_of_birth: user?.date_of_birth,
      nationality: user?.nationality,
      mainPosition: user?.mainPosition,
      alterPosition: user?.alterPosition,
      dominantHand: user?.dominantHand,
      height: user?.height,
      weight: user?.weight,
      image: user?.image,
      social_media: user?.social_media,
      experience: user?.experience,
      strengths_advantage: user?.strengths_advantage,
      about_me: user?.about_me,
      expectations_from_new_club: user?.expectations_from_new_club,
      sports: user?.sports,
      club_name: user?.club_name,
      city: user?.city,
    };
    setUserInfo(newData);
    setSportsType(user?.sports);
    setBelongclub(user?.belong_to_the_club);
    // setMainPositionType(user?.mainPosition);
    setUserExperience(user?.experience);
    let values = {};

    for (let i = 0; i < user?.social_media?.length; i++) {
      const element = user?.social_media[i];
      if (element.includes("twitter.com")) {
        values.twitter = element;
      } else if (element?.includes("instagram.com")) {
        values.instagram = element;
      } else if (element?.includes("facebook.com")) {
        values.facebook = element;
      } else if (element?.includes("youtube.com")) {
        values.youtube = element;
      } else {
        values.others = element;
      }
    }

    setSocialMedia(values);
  }, [user, id]);
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

  // players
  const [sportsType, setSportsType] = useState("");

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
  // players

  console.log("userINfo", userInfo);

  return (
    <form className="" onSubmit={handleUpdate}>
      <div className="View_details container p-0 overflow-hidden">
        <div className="job_offer desktop_vd edit_player_details_wrapper ps-lg-0 pe-lg-0 mb-4">
          <div className="row" style={{ margin: "0 40px" }}>
            <div className="col-12 col-lg-3 ps-lg-5">
              <div className="upload_profile_image" onClick={handleButtonClick}>
                <img
                  className="img-fluid profiles"
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : userInfo?.image
                      ? `${
                          process.env.NODE_ENV !== "production"
                            ? import.meta.env.VITE_LOCAL_API_URL
                            : import.meta.env.VITE_LIVE_API_URL
                        }/api/v1/uploads/${userInfo?.image}`
                      : profileImage
                  }
                  alt="Profile"
                  style={{
                    objectFit: "cover",
                    maxWidth: "323px",
                    width: "100%",
                  }}
                />
                <div>
                  {!selectedImage && (
                    <button
                      type="button"
                      className="profile_upload_btn"
                      // onClick={handleButtonClick}
                    >
                      <img src={upload} alt="" />
                      <span>Upload</span>
                    </button>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".jpeg, .jpg, .png"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-9">
              <div className="personalInfo editpersonal_info">
                <div className="row mb_40">
                  {inputFieldData.map((field, index) => (
                    <div key={index} className="col-12 col-md-4">
                      <div className="personal_info_edit_wrapper">
                        <div
                          className="d-flex flex-column align-items-start gap-3"
                          style={{
                            marginBottom:
                              index < inputFieldData.length - 3 ? "40px" : "0",
                          }}
                        >
                          <div className="w-100 pb-4">
                            <label
                              htmlFor={`exampleFormControlInput${index + 1}`}
                              className="form-label"
                            >
                              {field.label}
                            </label>
                            <input
                              type={field.type}
                              className="form-control"
                              id={`exampleFormControlInput${index + 1}`}
                              placeholder={field.placeholderText}
                              value={userInfo[field.name] || ""}
                              min="1"
                              onChange={(e) =>
                                handleInputChange(field.name, e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="col-md-6">
                    <div className="pb-4">
                      <label htmlFor="name" className="d-block label_name mb-3">
                        Sports *
                      </label>
                      <select
                        required
                        className="select_form"
                        name="sports"
                        onChange={(e) => {
                          handleInputChange("sports", e.target.value);
                          setSportsType(e.target.value);
                        }}
                      >
                        {sportsDatas.map((item, index) => (
                          <option
                            selected={userInfo["sports"] === item}
                            key={index}
                            value={item}
                          >
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {user?.role !== "Coach" && (
                    <>
                      <div className="col-lg-4">
                        <div className="input_form pb-4">
                          <label
                            htmlFor="name"
                            className="d-block label_name mb-2"
                          >
                            Main position *
                          </label>

                          <select
                            required
                            className="select_form"
                            name="mainPosition"
                            value={userInfo["mainPosition"] || ""}
                            onChange={(e) => {
                              handleInputChange("mainPosition", e.target.value);
                              setMainPositionType(e.target.value);
                            }}
                          >
                            {/* <option value={"Goalkeeper"}>Goalkeeper</option>
                        <option value={"Defender"}>Defender</option>
                        <option value={"Midfielder"}>Midfielder</option>
                        <option value={"Forward"}>Forward</option> */}
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

                      <div className="col-lg-4">
                        <div className="input_form pb-4">
                          <label
                            htmlFor="name"
                            className="d-block label_name mb-2"
                          >
                            Alternative position
                          </label>

                          <select
                            required
                            className={`select_form text-capitalize`}
                            name="alterPosition"
                            onChange={(e) =>
                              handleInputChange("alterPosition", e.target.value)
                            }
                          >
                            <option value={"N/A"} selected>
                              Select
                            </option>
                            {altPositions[0]?.alternativePositions?.map(
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
                    </>
                  )}

                  <div className="col-lg-4">
                    <div className="pb-4">
                      <label htmlFor="name" className="d-block label_name mb-2">
                        Dominant {sportsType === "Football" ? "Foot" : "Hand"} *
                      </label>
                      <select
                        required
                        className="select_form"
                        name="dominantHand"
                        value={userInfo["dominantHand"] || ""}
                        onChange={(e) =>
                          handleInputChange("dominantHand", e.target.value)
                        }
                      >
                        <option value={"Left"}>Left</option>
                        <option value={"Right"}>Right</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="pb-4">
                      <label htmlFor="name" className="d-block label_name mb-2">
                        Nationality *
                      </label>
                      <select
                        required
                        className="select_form"
                        name="nationality"
                        value={userInfo["nationality"] || ""}
                        onChange={(e) =>
                          handleInputChange("nationality", e.target.value)
                        }
                      >
                        {countryNames?.map((country, index) => (
                          <option value={country.name} className="" key={index}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="pb-4">
                      <label htmlFor="name" className="d-block label_name mb-2">
                        Additional Passport *
                      </label>
                      <select
                        required
                        className="select_form"
                        name="additional_passport"
                        value={userInfo["additional_passport"] || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "additional_passport",
                            e.target.value
                          )
                        }
                      >
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
                            handleInputChange(
                              "belong_to_the_club",
                              e.target.value
                            );
                          }}
                          style={{ display: "none" }}
                        />{" "}
                        <label
                          style={{
                            cursor: "pointer",
                            backgroundColor: "#05CD99",
                          }}
                          className="yes_btn"
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
                          style={{ display: "none" }} // Hide the radio input visually
                        />{" "}
                        <label
                          style={{ cursor: "pointer" }}
                          htmlFor="no"
                          className="yes_btn"
                        >
                          NO
                        </label>
                      </div>
                    </div>
                  </div>

                  {isBelongClub && (
                    <div className="col-lg-6">
                      <div className="input_form pb-4">
                        <label
                          htmlFor="name"
                          className="d-block label_name mb-2"
                        >
                          Club name
                        </label>
                        <input
                          id="name"
                          name="club_name"
                          value={userInfo["club_name"] || ""}
                          onChange={(e) =>
                            handleInputChange("club_name", e.target.value)
                          }
                          type="text"
                          placeholder="Club name"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <UpdateexperienceAndMedia
          socialMedia={socialMedia}
          setSocialMedia={setSocialMedia}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          editedInfo={editedInfo}
          setEditedInfo={setEditedInfo}
          exp={userInfo["experience"] ? userInfo["experience"] : []}
          handleAddMore={handleAddMore}
          handleExperienceChange={handleExperienceChange}
          userExperience={userExperience}
          handleRemove={handleRemove}
        />

        <div className=" mb_60 experience_wrapper">
          <div className="row justify-content-start about_part">
            <div className="col-12 col-md-6 col-lg-4 mb-5 mb-lg-0 ">
              <p className="f_sfPro text_color_36 fs_18 mb-2">
                Strengths Advantages
              </p>
              <div className="">
                {/*  */}
                <textarea
                  onChange={(e) =>
                    handleInputChange("strengths_advantage", e.target.value)
                  }
                  className="form-control about_me_editField"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={userInfo?.strengths_advantage}
                ></textarea>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-5 mb-lg-0 ">
              <p className="f_sfPro text_color_36 fs_18 mb-2">About Me</p>
              <div className="">
                {/*  */}
                <textarea
                  onChange={(e) =>
                    handleInputChange("about_me", e.target.value)
                  }
                  className="form-control about_me_editField"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={userInfo?.about_me}
                ></textarea>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-5 mb-lg-0 ">
              <p className="f_sfPro text_color_36 fs_18 mb-2">
                Expectations From a New Club
              </p>
              <div className="">
                {/*  */}
                <textarea
                  onChange={(e) =>
                    handleInputChange(
                      "expectations_from_new_club",
                      e.target.value
                    )
                  }
                  className="form-control about_me_editField"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={userInfo?.expectations_from_new_club}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Slider Start --> */}
        {/* <div className="d-flex align-items-center gap-3 mb_28">
          <p
            className="f_sfPro text_color_36 fs_18"
            style={{ paddingLeft: "75px" }}
          >
            Gallery
          </p>

          <label
            style={{ cursor: "pointer" }}
            className="add_image_btn bg-none"
          >
            <span>Add Image</span>
            <img src={plus4} alt="" />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGallaryImageChange}
              style={{ display: "none" }}
            />
          </label>
        </div> */}
        <div className="col-lg-6 p-0">
          <div className="cover_img">
            {/* <img className="img-fluid" src={coverImg} alt="" /> */}
          </div>
          {/* <div className="d-flex justify-content-center align-items-center">
            <button
              type="button"
              className="add-btn p-4 bg-none d-inline-flex align-items-center gap-2"
              {...galleryRootProps()}
            >
              <div className="add_icon">
                <img src={plus4} alt="add-icon" />
              </div>
              <input {...galleryInputProps()} />
              Add Photo
            </button>
          </div> */}
          <div className="upload-images d-flex gap-4 flex-wrap mb-4">
            {user?.gallary?.length > 0 &&
              user?.gallary?.map((file, index) => (
                <div key={index}>
                  <img
                    style={{ width: "130px", height: "130px" }}
                    key={index}
                    src={`${
                      process.env.NODE_ENV !== "production"
                        ? import.meta.env.VITE_LOCAL_API_URL
                        : import.meta.env.VITE_LIVE_API_URL
                    }/api/v1/uploads/${file}`}
                    // alt={`Uploaded file ${file}`}
                  />
                </div>
              ))}
            <button
              type="button"
              className="add-btn p-4 bg-none d-inline-flex align-items-center gap-2"
              {...galleryRootProps()}
            >
              <div className="add_icon">
                <img src={plus4} alt="add-icon" />
              </div>
              <input {...galleryInputProps()} />
              Add Photo
            </button>
          </div>
        </div>
        <EditGallary images={selectedGalleryFiles} />

        <button
          type="submit"
          disabled={isLoading}
          className="experience_wrapper playerDetailsUpdate_btn"
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default EditAddedPlayerDetails;
