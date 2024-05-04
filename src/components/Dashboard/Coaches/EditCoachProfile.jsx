/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import profileImage from "../../../assets/profile_upload.png";
import upload from "../../../assets/upload.png";
import plus4 from "../../../assets/plus4.png";

import { useRef, useState } from "react";
import UpdateexperienceAndMedia from "../viewDetails/UpdateexperienceAndMedia";
import EditGallary from "./../viewDetails/EditGallary";

// data
const inputFieldData = [
  { label: "Name", placeholderText: "Your name", type: "text" },
  { label: "Date of Birth", placeholderText: "DD-MM-YYYY", type: "date" },
  { label: "Age", placeholderText: "Your Age", type: "number" },
  { label: "Nationality", placeholderText: "Your Nationality", type: "text" },
  { label: "Position", placeholderText: "Your Position", type: "text" },
  {
    label: "Dominant Hand",
    placeholderText: "Your Dominant Hand",
    type: "text",
  },
  { label: "Height", placeholderText: "You Height", type: "number" },
  { label: "Weight", placeholderText: "Your Weight", type: "number" },
  { label: "Race", placeholderText: "Your Race", type: "text" },
];

const EditCoachProfile = () => {
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
      coachName: "",
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

  const [formData, setFormData] = useState(initialFormData);

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
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          selectedImage: reader.result,
        }));
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // get all data
  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // form submit data
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <form className="" onSubmit={handleUpdate}>
      <div className="View_details container p-0 overflow-hidden">
        <div className="job_offer desktop_vd edit_player_details_wrapper  ps-lg-0 pe-lg-0">
          <div className="row" style={{ margin: "0 40px" }}>
            <div className="col-12 col-lg-3 ps-lg-5">
              <div className="upload_profile_image" onClick={handleButtonClick}>
                <img
                  className="img-fluid profiles"
                  src={selectedImage || profileImage}
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
                <div className="mb-4 position-relative">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Coach Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="coachNameInput"
                    placeholder="Your name"
                    value={formData.coachName}
                    onChange={(e) =>
                      handleInputChange("coachName", e.target.value)
                    }
                  />
                </div>
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
                    value={formData.sportsType}
                    onChange={(e) =>
                      handleInputChange("sportsType", e.target.value)
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
                              value={formData[field.label.toLowerCase()] || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  field.label.toLowerCase(),
                                  e.target.value
                                )
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
          formData={formData}
          handleInputChange={handleInputChange}
          setFormData={setFormData}
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
                    handleInputChange("strengthsAdvantages", e.target.value)
                  }
                  className="form-control about_me_editField"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  defaultValue=" Here are some of my notable strengths: Height and Wingspan: I am blessed with a tall stature and a remarkable wingspan, which give me a significant advantage in both offense and defense. My height allows me to effectively contest shots,"
                ></textarea>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-5 mb-lg-0 ">
              <p className="f_sfPro text_color_36 fs_18 mb-2">About Me</p>
              <div className="">
                {/*  */}
                <textarea
                  onChange={(e) => handleInputChange("aboutMe", e.target.value)}
                  className="form-control about_me_editField"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  defaultValue=" Here are some of my notable strengths: Height and Wingspan: I am blessed with a tall stature and a remarkable wingspan, which give me a significant advantage in both offense and defense. My height allows me to effectively contest shots,"
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
                    handleInputChange("expectationsFromClub", e.target.value)
                  }
                  className="form-control about_me_editField"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  defaultValue=" Here are some of my notable strengths: Height and Wingspan: I am blessed with a tall stature and a remarkable wingspan, which give me a significant advantage in both offense and defense. My height allows me to effectively contest shots,"
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

export default EditCoachProfile;
