import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import "./Modal.css";
import PricingModal from "./PricingModal";
import useClickOutside from "../../../hooks/useClickOutside";
import MakePaymenModal from "./MakePaymenModal";
import AddPlayerForm from "./AddPlayerForm";
import { setExpireDate } from "../../../utils/setExpireDate";
import { useAddPlayerMutation } from "../../../features/auth/authApi";

const AddPlayerModal = ({ setAddPlayerModal }) => {
  const { user, subscriptions } = useSelector((state) => state.auth);

  const wrapperRef = useClickOutside(() => setAddPlayerModal(false));
  const [step, setStep] = useState(1);
  const [addPlayer, { isLoading: addPlayerLoading }] = useAddPlayerMutation();

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

  const [playerData, setPlayerData] = useState({
    experience: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPlayerData({ ...playerData, [name]: value });
  };

  const fileInputRef = useRef(null);

  const [image, setImage] = useState("");
  const [imageFile, setImageFIle] = useState(null);

  const [selectedPackages, setSelectedPackages] = useState({
    duration: 1,
    price: 10,
    month: 1,
  });

  console.log("user", user);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile.name);
    setImageFIle(selectedFile);
    setPlayerData({ ...playerData, image: selectedFile });
  };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const date = new Date();

    const playerInfo = {
      ...playerData,
      social_media: socialMediaArray,
      subscriptionDate: date,
      subscriptionName: subscriptions.subscriptionName,
      expirationDate: setExpireDate(selectedPackages?.month),
      packageChoosed: selectedPackages?.month,
      isCreatedProfile: true,
      isSubsCribed: true,
      referral: user?._id,
      role: "Player",
    };

    const formData = new FormData();

    Object.entries(playerInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });

    console.log("playerInfo", playerInfo);

    try {
      const response = await addPlayer(formData);
      if (response?.data?.success) {
        setLoading(false);
        return true;
      }
      if (response?.error?.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response?.error?.data?.message}`,
        });
        setLoading(false);
        return false;
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
      setLoading(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

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
          <PricingModal setSelectedPackages={setSelectedPackages} />
        ) : step === 3 ? (
          <MakePaymenModal
            setMakePaymentClose={setAddPlayerModal}
            handleSubmit={handleSubmit}
            addPlayerLoading={addPlayerLoading}
            selectedPackages={selectedPackages}
          />
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
