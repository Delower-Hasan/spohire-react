import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import "./Modal.css";
import PricingModal from "./PricingModal";
import useClickOutside from "../../../hooks/useClickOutside";
import MakePaymenModal from "./MakePaymenModal";
import AddPlayerForm from "./AddPlayerForm";

const AddPlayerModal = ({ setAddPlayerModal }) => {
  const { user } = useSelector((state) => state.auth);
  const wrapperRef = useClickOutside(() => setAddPlayerModal(false));
  const [step, setStep] = useState(1);

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
      const newData = [...playerData?.experience, experienceFormData];
      setPlayerData({ ...playerData, ["experience"]: newData });
    } else {
      alert("Please fill up the experience data properly");
    }
  };

  const socialMediaArray = Object.values(socialMedia);

  console.log("socialMediaArray", socialMediaArray);

  const [playerData, setPlayerData] = useState({
    social_media: socialMediaArray,
    experience: "",
  });

  console.log("playerData", playerData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPlayerData({ ...playerData, [name]: value });
  };

  const fileInputRef = useRef(null);

  const [image, setImage] = useState("");
  const [imageFile, setImageFIle] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile.name);
    setImageFIle(selectedFile);
    setPlayerData({ ...playerData, image: selectedFile });
  };

  // const [userInfo, setUserInfo] = useState({
  //   firstName: "",
  //   date_of_birth: "",
  //   nationality: "",
  //   mainPosition: "",
  //   dominantHand: "",
  //   height: "",
  //   weight: "",
  //   image: "",
  //   experience: [],
  //   strengths_advantage: "",
  //   about_me: "",
  //   expectations_from_new_club: "",
  //   sports: "",
  // });

  // useEffect(() => {
  //   const newData = {
  //     firstName: user?.firstName,
  //     date_of_birth: user?.date_of_birth,
  //     nationality: user?.nationality,
  //     mainPosition: user?.mainPosition,
  //     dominantHand: user?.dominantHand,
  //     height: user?.height,
  //     weight: user?.weight,
  //     image: user?.image,
  //     social_media: user?.social_media,
  //     experience: user?.experience,
  //     strengths_advantage: user?.strengths_advantage,
  //     about_me: user?.about_me,
  //     expectations_from_new_club: user?.expectations_from_new_club,
  //     sports: user?.sports,
  //   };

  //   setUserInfo(newData);

  //   let values = {};

  //   for (let i = 0; i < user?.social_media?.length; i++) {
  //     const element = user?.social_media[i];
  //     if (element.includes("twitter.com")) {
  //       values.twitter = element;
  //     } else if (element?.includes("instagram.com")) {
  //       values.instagram = element;
  //     } else if (element?.includes("facebook.com")) {
  //       values.facebook = element;
  //     } else if (element?.includes("youtube.com")) {
  //       values.youtube = element;
  //     } else {
  //       values.others = element;
  //     }
  //   }

  //   setSocialMedia(values);

  //   console.log(values, "nnoso");
  // }, [user, id]);

  return (
    <div className="addplayer_modal">
      <div ref={wrapperRef} className="inner">
        {step === 1 && (
          <div className="modal_heading">
            <h2>Add Player</h2>
          </div>
        )}
        {step === 1 ? (
          <AddPlayerForm
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            fileInputRef={fileInputRef}
            handleSocialLinkChange={handleSocialLinkChange}
            image={image}
            handleExperienceChange={handleExperienceChange}
            handleAddMore={handleAddMore}
            exp={playerData?.experience}
          />
        ) : step === 2 ? (
          <PricingModal />
        ) : step === 3 ? (
          <MakePaymenModal setMakePaymentClose={setAddPlayerModal} />
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
              <button onClick={() => setAddPlayerModal(false)}>Cancel</button>
              <button
                className="addplayer_btn"
                onClick={() => setStep((prevStep) => prevStep + 1)}
              >
                {step === 2 ? "Next" : "Add Player"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPlayerModal;
