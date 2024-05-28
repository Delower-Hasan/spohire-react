/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PiPencilSimpleLineDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import addIcon from "../../../assets/addIcon.svg";
import profileImage from "../../../assets/profile_avatar.png";
import { useUpdateUserMutation } from "../../../features/auth/authApi";
import { userLoggedIn } from "../../../features/auth/authSlice";
import UpdateexperienceAndMedia from "./UpdateexperienceAndMedia";
import "./ViewDetails.css";
import { sportsDatas } from "../../../utils/PlayersSports";

// data
const inputFieldData = [
  {
    label: "First Name",
    placeholderText: "Jhon",
    type: "text",
    name: "first_name",
  },

  {
    label: "Last Name",
    placeholderText: "Doe",
    type: "text",
    name: "last_name",
  },

  // {
  //   label: "Sports",
  //   placeholderText: "Basketball",
  //   type: "text",
  //   name: "sports",
  // },

  // {
  //   label: "Function",
  //   placeholderText: "Manager",
  //   type: "text",
  //   name: "role",
  // },

  {
    label: "Date of Birth",
    placeholderText: "DD-MM-YYYY",
    type: "date",
    name: "date_of_birth",
  },

  // {
  //   label: "Nationality",
  //   placeholderText: "Your Nationality",
  //   type: "text",
  //   name: "nationality",
  // },
];

const EditPlayerDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const [updatePlayerDetails, { isLoading }] = useUpdateUserMutation();

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

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  // onchange value
  const initialFormData = inputFieldData.reduce(
    (acc, field) => {
      acc[field.label.toLowerCase()] = "";
      return acc;
    },
    {
      playerName: "",
      sportsType: "",
      selectedImage: null,
      experiences: [],
      clubName: "",
      // socialMedia: {
      //   facebook: "",
      //   instagram: "",
      //   twitter: "",
      // },
      strengthsAdvantages: "",
      aboutMe: "",
      expectationsFromClub: "",
      gallary: [],
    }
  );

  const dispatch = useDispatch();

  // const [formData, setFormData] = useState(initialFormData);
  // const [socialMedia, setSocialMedia] = useState({
  //   facebook: "",
  //   twitter: "",
  //   instagram: "",
  //   youtube: "",
  // });

  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    sports: "",
    date_of_birth: "",
    nationality: "",
    image: "",
    experience: [],
    about_me: "",
  });

  const [aboutMe, setAboutMe] = useState("");

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

  // Inside handleInputChange function
  const handleAboutInputChange = (fieldName, value) => {
    if (fieldName === "about_me") {
      setAboutMe(value); // Update aboutMe state
    } else {
      setUserInfo((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
      setEditedInfo((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    }
  };
  const [editedInfo, setEditedInfo] = useState({});

  const navigate = useNavigate();
  const [experienceFormData, setExperienceFormData] = useState({});

  const [userExperience, setUserExperience] = useState([
    ...userInfo["experience"],
  ]);

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setExperienceFormData({ ...experienceFormData, [name]: value });
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

  // handle profile image upload
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
  // handle gallary change
  const [selectedGalleryFiles, setSelectedGalleryFiles] = useState([]);
  const onGalleryDrop = (acceptedFiles) => {
    // Add the newly selected files to the existing selectedGalleryFiles state
    setSelectedGalleryFiles([...selectedGalleryFiles, ...acceptedFiles]);
  };

  const removeGallaryImage = (index) => {
    const updatedImages = [...selectedGalleryFiles];
    updatedImages.splice(index, 1);
    setSelectedGalleryFiles(updatedImages);
  };

  const { getRootProps: galleryRootProps, getInputProps: galleryInputProps } =
    useDropzone({
      onDrop: onGalleryDrop,
      accept: "image/*,video/*", // Accept both images and videos
    });

  // form submit data
  const handleUpdate = async (e) => {
    e.preventDefault();

    // const socialMediaArray = Object.values(socialMedia);

    const infoData = {
      ...editedInfo,
      about_me: aboutMe,
      // social_media: JSON.stringify(socialMedia),
    };

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
            formData.append(`${key}[${index}]`, element);
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
        userId: user?._id,
        data: formData,
      });

      if (response?.data?.status) {
        Swal.fire({
          icon: "success",
          title: "Profile Update successfully!",
          text: `${response?.data?.message}`,
        });

        const infoUser = JSON.parse(localStorage.getItem("spohireAuth"));
        localStorage.setItem(
          "spohireAuth",
          JSON.stringify({ ...infoUser, user: response?.data?.data })
        );

        dispatch(
          userLoggedIn({
            ...infoUser,
            user: response?.data?.data,
          })
        );
        navigate("/dashboard/viewProfile");
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

  useEffect(() => {
    const newData = {
      first_name: user?.first_name,
      last_name: user?.last_name,
      date_of_birth: user?.date_of_birth,
      nationality: user?.nationality,
      image: user?.image,
      social_media: user?.social_media,
      experience: user?.experience,
      about_me: user?.about_me,
      sports: user?.sports,
      role: user?.role,
      facebook: user?.facebook,
      instagram: user?.instagram,
      youtube: user?.youtube,
      twitter: user?.twitter,
    };
    setAboutMe(user?.about_me);
    setUserInfo(newData);
    setUserExperience(user?.experience);
  }, [user]);

  return (
    <form
      className="p-5 bg-white"
      onSubmit={handleUpdate}
      style={{ borderRadius: "20px" }}
    >
      <div className="profile_heading d-flex align-items-center justify-content-between py-5">
        <h2>My Profile</h2>
        <div className="btn_group d-flex align-items-center gap-4">
          <Link to={"/dashboard/viewProfile"} className="cancel">
            {" "}
            Cancel{" "}
          </Link>
        </div>
      </div>

      <div className="View_details container p-0 overflow-hidden">
        <div className="job_offer desktop_vd edit_player_details_wrapper">
          <div className="row" style={{ margin: "0 40px" }}>
            <div className="col-12 col-lg-3">
              <h2 className="edit_profile">Edit Profile</h2>
              <p className="text-center py-4 upload_photo">Upload Main Photo</p>

              <div
                className="upload_profile_image d-flex align-items-center justify-content-center position-relative"
                onClick={handleButtonClick}
              >
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
                  style={{ objectFit: "cover" }}
                />
                <div className="profile_img ">
                  <div>
                    {!selectedImage && (
                      <button
                        type="button"
                        className="profile_upload_btn"
                        // onClick={handleButtonClick}
                      >
                        {/* photo here */}
                        {/* <img src={upload} alt="" /> */}
                        <PiPencilSimpleLineDuotone />
                        {/* <span>Upload</span> */}
                      </button>
                    )}

                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-9">
              <div className="personalInfo editpersonal_info">
                <div className="row">
                  {inputFieldData.map((field, index) => (
                    <div key={index} className="col-12 col-md-6">
                      <div className="personal_info_edit_wrapper pb-4">
                        <div
                          className="d-flex flex-column align-items-start gap-3"
                          style={{
                            marginBottom:
                              index < inputFieldData.length - 3 ? "40px" : "0",
                          }}
                        >
                          <div className="w-100">
                            <label
                              htmlFor={`exampleFormControlInput${index + 1}`}
                              className="form-label"
                            >
                              {" "}
                              {field.label}{" "}
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

                  <div className="col-12 col-md-6">
                    <div className="pb-4">
                      <label htmlFor="name" className="d-block label_name mb-2">
                        Nationality *
                      </label>
                      <select
                        required
                        className="select_form"
                        name="nationality"
                        onChange={(e) => {
                          handleInputChange("nationality", e.target.value);
                        }}
                      >
                        {countryNames?.map((country, index) => (
                          <option
                            selected={
                              userInfo["nationality"].toLowerCase() ===
                              country.name.toLowerCase()
                            }
                            value={country.name}
                            className=""
                            key={index}
                          >
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="pb-4">
                      <label htmlFor="name" className="d-block label_name mb-2">
                        Function
                      </label>
                      <select
                        required
                        className="select_form"
                        name="role"
                        disabled
                        // onChange={(e) => {
                        //   handleInputChange("role", e.target.value);
                        // }}
                      >
                        {["Player", "Manager", "Coach", "Other"].map(
                          (item, index) => (
                            <option
                              selected={userInfo["role"] === item}
                              key={index}
                              value={item}
                            >
                              {item}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="pb-4">
                      <label htmlFor="name" className="d-block label_name mb-2">
                        Sports
                      </label>
                      <select
                        required
                        className="select_form"
                        name="sports"
                        disabled
                        // onChange={(e) => {
                        //   handleInputChange("sports", e.target.value);
                        // }}
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
                </div>
              </div>
            </div>
          </div>
        </div>

        <UpdateexperienceAndMedia
          handleInputChange={handleInputChange}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          editedInfo={editedInfo}
          setEditedInfo={setEditedInfo}
          exp={userInfo["experience"]}
          handleAddMore={handleAddMore}
          handleExperienceChange={handleExperienceChange}
          userExperience={userExperience}
          handleRemove={handleRemove}
        />

        <div className="mb_60 experience_wrapper">
          <div className="row align-items-center about_part">
            <div className="col-lg-6 p-0">
              {/* <div className="cover_img">
                <img className="img-fluid" src={coverImg} alt="" />
              </div> */}
              <div className="d-flex justify-content-center align-items-center">
                <button
                  type="button"
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

              <div className="upload-images d-flex gap-4 flex-wrap mb-4">
                <button
                  type="button"
                  className="p-1 px-2  bg-black text-white position-absolute"
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
                {selectedGalleryFiles.map((file, index) => (
                  <div className="position-relative">
                    <button
                      type="button"
                      className="p-1 px-2  bg-black text-white position-absolute z-3"
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
                    <div>
                      {file.type.startsWith("image/") ? (
                        <div style={{ width: "200px", height: "200px" }}>
                          <img
                            className="img-fluid"
                            src={URL.createObjectURL(file)}
                            alt={`gallery-${index}`}
                          />
                        </div>
                      ) : (
                        <video
                          style={{ width: "360px" }}
                          src={URL.createObjectURL(file)}
                          controls
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6 p-0">
              <div className="about_me">
                <h2 className="mb-4">About Me</h2>
                <textarea
                  value={aboutMe}
                  onChange={(e) =>
                    handleAboutInputChange("about_me", e.target.value)
                  }
                  rows={10}
                  cols={50}
                  placeholder="Lorem Ipsum is simply dummy text of the "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-info" type="submit" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default EditPlayerDetails;
