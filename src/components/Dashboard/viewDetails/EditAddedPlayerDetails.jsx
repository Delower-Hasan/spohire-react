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

const sportsDatas = ["Football", "Basketball", "Handball", "Volleyball"];

// data
const inputFieldData = [
  {
    label: "Name",
    placeholderText: "Your name",
    type: "text",
    name: "firstName",
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
      playerName: "",
      sportsType: "",
      selectedImage: null,
      experiences: [{ startYear: "", endYear: "", club_name: "" }],
      clubName: "",
      socialMedia: {
        facebook: "",
        instagram: "",
        twitter: "",
      },
      strengthsAdvantages: "",
      aboutMe: "",
      mainPosition: "",
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
    fullName: "",
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

  // const handleGallaryImageChange = (e) => {
  //   const files = e.target.files;
  //   setGallaryImage(Array.from(files));
  //   const newImages = [];
  //   for (let i = 0; i < files.length; i++) {
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       newImages.push(e.target.result);
  //       if (newImages.length === files.length) {
  //         setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  //       }
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         gallary: newImages,
  //       }));
  //     };
  //     reader.readAsDataURL(files[i]);
  //   }
  // };

  // handle profile image upload

  const [selectedGalleryFiles, setSelectedGalleryFiles] = useState([]);

  const onGalleryDrop = (acceptedFiles) => {
    // Add the newly selected files to the existing selectedGalleryFiles state
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

  useEffect(() => {
    const newData = {
      firstName: user?.firstName,
      date_of_birth: user?.date_of_birth,
      nationality: user?.nationality,
      mainPosition: user?.mainPosition,
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
    };

    setUserInfo(newData);

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

  return (
    <form className="" onSubmit={handleUpdate}>
      <div className="View_details container p-0 overflow-hidden">
        <div className="job_offer desktop_vd edit_player_details_wrapper  ps-lg-0 pe-lg-0">
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
                  style={{ objectFit: "cover" }}
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
              <div className="edit_profile_input">
                {/* <div className="mb-4 position-relative">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Player Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="playerNameInput"
                    placeholder="Your name"
                    value={formData.playerName}
                    onChange={(e) =>
                      handleInputChange("playerName", e.target.value)
                    }
                  />
                </div> */}
                {/* <div className="mb-4 position-relative">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Sports Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="sportsTypeInput"
                    placeholder="Basketball"
                    value={userInfo?.sports}
                    onChange={(e) =>
                      handleInputChange("sports", e.target.value)
                    }
                  />
                </div> */}
              </div>
              <div className="personalInfo editpersonal_info">
                <div className="row mb_40">
                  <div className="col-md-6">
                    <div className="pb-4">
                      <label htmlFor="name" className="d-block label_name mb-2">
                        Sports *
                      </label>
                      <select
                        required
                        className="select_form"
                        name="sports"
                        onChange={(e) => {
                          handleInputChange("sports", e.target.value);
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
                          <div className="w-100">
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

                  <div className="col-lg-4 mt-3">
                    <div className="input_form pb-4">
                      <label htmlFor="name" className="d-block label_name mb-2">
                        Main position *
                      </label>

                      <select
                        required
                        className="select_form"
                        name="mainPosition"
                        value={userInfo["mainPosition"] || ""}
                        onChange={(e) =>
                          handleInputChange("mainPosition", e.target.value)
                        }
                      >
                        <option value={"Goalkeeper"}>Goalkeeper</option>
                        <option value={"Defender"}>Defender</option>
                        <option value={"Midfielder"}>Midfielder</option>
                        <option value={"Forward"}>Forward</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="pb-4">
                      <label htmlFor="name" className="d-block label_name mb-2">
                        Dominant Hand *
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
          <div className="d-flex justify-content-center align-items-center">
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
          {/* <div className="upload-images d-flex gap-4 flex-wrap mb-4">
            {selectedGalleryFiles.map((file, index) => (
              <img
                style={{ width: "130px", height: "130px" }}
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Uploaded file ${index}`}
              />
            ))}
          </div> */}
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
