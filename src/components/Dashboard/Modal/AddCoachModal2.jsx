import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import useClickOutside from "../../../hooks/useClickOutside";
import AddCoachForm from "./AddCoachForm";
import "./Modal.css";
import PricingModal from "./PricingModal";
import MakePaymenModal from "./MakePaymenModal";

const AddCoachModal2 = ({ setAddCoachModal }) => {
  const [step, setStep] = useState(1);

  const [image, setImage] = useState("");
  const [imageFile, setImageFIle] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const addCoachRef = useClickOutside(() => setAddCoachModal(false));

  const [socialMedia, setSocialMedia] = useState({
    instagram: "",
    facebook: "",
    twitter: "",
    tiktok: "",
  });

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setSocialMedia({ ...socialMedia, [name]: value });
  };

  const [experienceFormData, setExperienceFormData] = useState({});

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
      const newData = [...coachData?.experience, experienceFormData];
      setCoachData({ ...coachData, ["experience"]: newData });
    } else {
      alert("Please fill up the experience data properly");
    }
  };

  const socialMediaArray = Object.values(socialMedia);

  console.log("socialMediaArray", socialMediaArray);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoachData({ ...coachData, [name]: value });
  };

  const [coachData, setCoachData] = useState({
    social_media: socialMediaArray,
    experience: "",
  });

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile.name);
    setImageFIle(selectedFile);
    setCoachData({ ...coachData, image: selectedFile });
  };

  return (
    <div className="addplayer_modal ">
      <div className="inner" ref={addCoachRef}>
        {step === 1 && (
          <div className="modal_heading">
            <h2>Add Coach</h2>
          </div>
        )}

        {step === 1 ? (
          <AddCoachForm
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            fileInputRef={fileInputRef}
            handleSocialLinkChange={handleSocialLinkChange}
            image={image}
            handleExperienceChange={handleExperienceChange}
            handleAddMore={handleAddMore}
            exp={coachData?.experience}
          />
        ) : step === 2 ? (
          <PricingModal />
        ) : step === 3 ? (
          <MakePaymenModal setMakePaymentClose={setAddCoachModal} />
        ) : null}

        {step !== 3 && (
          <div
            className={`${
              step === 2
                ? "d-flex justify-content-end py-4"
                : "d-flex justify-content-center py-4"
            } `}
          >
            <div className="action_btn d-flex gap-4">
              <button onClick={() => setAddCoachModal(false)}>Cancel</button>
              <button
                className="addplayer_btn"
                onClick={() => setStep((prevStep) => prevStep + 1)}
              >
                {step === 2 ? "Next" : "Add Coach"}
              </button>
            </div>
          </div>
        )}

        {/* {showPricing && <PricingModal />} */}
      </div>
    </div>
  );
};

export default AddCoachModal2;
