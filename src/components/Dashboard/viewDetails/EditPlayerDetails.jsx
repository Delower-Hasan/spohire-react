/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import "./ViewDetails.css";
import profileImage from "../../../assets/profile_avatar.png";
import upload from "../../../assets/upload.png";
import plus4 from "../../../assets/plus4.png";
import UpdateexperienceAndMedia from "./UpdateexperienceAndMedia";
import EditGallary from "./EditGallary";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../../features/auth/authApi";
import { userLoggedIn } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { PiPencilSimpleLineDuotone } from "react-icons/pi";
import coverImg from "../../../assets/cover_img.png";
import addNewPhoto from "../../../assets/addNewPhoto.svg";

// data
const inputFieldData = [
  {
    label: "Name",
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

  {
    label: "Sports",
    placeholderText: "Basketball",
    type: "text",
    name: "sports",
  },

  {
    label: "Function",
    placeholderText: "Manager",
    type: "text",
    name: "function",
  },

  {
    label: "Date of Birth",
    placeholderText: "DD-MM-YYYY",
    type: "date",
    name: "date_of_birth",
  },

  {
    label: "Nationality",
    placeholderText: "Your Nationality",
    type: "text",
    name: "nationality",
  },
];

const EditPlayerDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
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
      experiences: [{ startYear: "", endYear: "" }],
      clubName: "",
      socialMedia: {
        facebook: "",
        instagram: "",
        twitter: "",
      },
      strengthsAdvantages: "",
      aboutMe: "",
      expectationsFromClub: "",
      gallary: [],
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
    first_name: "",
    date_of_birth: "",
    nationality: "",
    club_position: "",
    dominant_hand: "",
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
  console.log(editedInfo, "editinfo");
  const navigate = useNavigate();
  const handleGallaryImageChange = (e) => {
    const files = e.target.files;
    setGallaryImage(Array.from(files));
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onload = (e) => {
        newImages.push(e.target.result);
        if (newImages.length === files.length) {
          setSelectedImages((prevImages) => [...prevImages, ...newImages]);
        }
        setFormData((prevData) => ({
          ...prevData,
          gallary: newImages,
        }));
      };
      reader.readAsDataURL(files[i]);
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

    gallaryImage?.forEach((img, index) => {
      formData.append(`gallery`, img);
    });

    try {
      const response = await updateUser({
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
      date_of_birth: user?.date_of_birth,
      nationality: user?.nationality,
      club_position: user?.club_position,
      dominant_hand: user?.dominant_hand,
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

    // const newSocials = user?.social_media?.map((i) => {
    //   const values = {};
    //   if (i?.includes("twitter.com")) {
    //     values.twitter = i;
    //   } else if (i?.includes("instagram.com")) {
    //     values.instagram = i;
    //   } else if (i?.includes("facebook.com")) {
    //     values.facebook = i;
    //   } else if (i?.includes("youtube.com")) {
    //     values.youtube = i;
    //   } else {
    //     values.others = i;
    //   }
    //   return values;
    // });

    console.log(values, "nnoso");
  }, [user]);

  console.log(socialMedia, "socialMedia");

  return (
    <form
      className="p-5 bg-white"
      onSubmit={handleUpdate}
      style={{ borderRadius: "20px" }}
    >
      <div className="profile_heading d-flex align-items-center justify-content-between py-5">
        <h2>My Profile</h2>
        <div className="btn_group d-flex align-items-center gap-4">
          <button className="cancel"> Cancel </button>
          <Link to={"/dashboard/editPlayerDetals"} className="edit d-block">
            Edit
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
                className="upload_profile_image d-flex align-items-center justify-content-center"
                onClick={handleButtonClick}
              >
                {/* <img
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
                /> */}
                <div className="profile_img position-relative">
                  <img
                    className="img-fluid profiles pointer"
                    src={profileImage}
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
              <div className="edit_profile_input">
                <div className="mb-4 position-relative">
                  {/* <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label">
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
                    /> */}
                </div>
              </div>

              <div className="personalInfo editpersonal_info">
                <div className="row">
                  {inputFieldData.map((field, index) => (
                    <div key={index} className="col-12 col-md-6">
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
          exp={userInfo["experience"]}
        />

        <div className=" mb_60 experience_wrapper">
          <div className="row align-items-center about_part">
            <div className="col-lg-6 p-0">
              <div className="cover_img">
                <img className="img-fluid" src={coverImg} alt="" />
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button className="addNewPhoto">
                  <img src={addNewPhoto} alt="" />
                  Add New Photo or Video
                </button>
              </div>
            </div>
            <div className="col-lg-6 p-0">
              <div className="about_me">
                <h2 className="mb-4">About Me</h2>
                <p>
                  |Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. standard dummy text ever since the
                  1500s, when an unknown printer took a galley of type and
                  scrambled standard dummy Ipsum is simply dummy text of the
                  printing and type setting industry. standard text ever since
                  the 1500s, printer took a galley it to make a type specimen
                  book.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditPlayerDetails;
