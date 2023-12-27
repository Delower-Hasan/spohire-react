/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import "./ViewDetails.css";
import profileImage from "../../../assets/profile_upload.png";
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

// data
const inputFieldData = [
  {
    label: "Name",
    placeholderText: "Your name",
    type: "text",
    name: "first_name",
  },
  {
    label: "Date of Birth",
    placeholderText: "DD-MM-YYYY",
    type: "date",
    name: "date_of_birth",
  },
  // { label: "Age", placeholderText: "Your Age", type: "number" },
  {
    label: "Nationality",
    placeholderText: "Your Nationality",
    type: "text",
    name: "nationality",
  },
  {
    label: "Position",
    placeholderText: "Your Position",
    type: "text",
    name: "club_position",
  },
  {
    label: "Dominant Hand",
    placeholderText: "Your Dominant Hand",
    type: "text",
    name: "dominant_hand",
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

  const navigate = useNavigate();

  const handleGallaryImageChange = (e) => {
    const files = e.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onload = (e) => {
        newImages.push(e.target.result);
        if (newImages.length === files.length) {
          console.log("Selected Images:", newImages);
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

    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setFormData((prevData) => ({
    //       ...prevData,
    //       selectedImage: reader.result,
    //     }));
    //     setSelectedImage(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    // }
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

    try {
      const response = await updateUser({
        userId: user?._id,
        data: editedInfo,
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
      social_media: user?.social_media,
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

  console.log("usr", user);
  console.log("userInfo", userInfo);
  console.log("Form Data:", formData);
  console.log("editedInfo:", editedInfo);

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
                      ? userInfo?.image
                      : profileImage
                  }
                  alt="Profile"
                />
                <div>
                  {!selectedImage && (
                    <button
                      className="profile_upload_btn"
                      onClick={handleButtonClick}
                    >
                      <img src={upload} alt="" />
                      <span>Upload</span>
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
                <div className="mb-4 position-relative">
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
                </div>
              </div>
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
        <div className="d-flex align-items-center gap-3 mb_28">
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
              multiple
              onChange={handleGallaryImageChange}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <EditGallary images={selectedImages} />

        <button
          type="submit"
          className="experience_wrapper playerDetailsUpdate_btn"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default EditPlayerDetails;

// {
//     "playerName": "sdfsdf",
//     "sportsType": "dsfds",
//     "selectedImage": null,
//     "name": "sdfsd",
//     "date of birth": "",
//     "age": "",
//     "nationality": "",
//     "position": "",
//     "dominant hand": "",
//     "height": "",
//     "weight": "",
//     "race": "",
//     experiences:[{startYear:"",endYear:""}],
//     clubName:"",
//     strengthsAbout:"",
//     aboutme:"",
//     expectationFromClub:"",
//     gallary:[]
// }
