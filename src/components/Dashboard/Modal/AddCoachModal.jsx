import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import { useAddPlayerMutation } from "../../../features/auth/authApi";
import useClickOutside from "../../../hooks/useClickOutside";
import { setExpireDate } from "../../../utils/setExpireDate";
import AddPlayerForm from "./AddPlayerForm";
import MakePaymenModal from "./MakePaymenModal";
import "./Modal.css";
import PricingModal from "./PricingModal";

const AddCoachModal = ({ setAddCoachModal }) => {
  const { user, subscriptions } = useSelector((state) => state.auth);

  const wrapperRef = useClickOutside(() => setAddCoachModal(false));
  const [step, setStep] = useState(1);
  const [addPlayer, { isLoading: addPlayerLoading }] = useAddPlayerMutation();

  const [socialMedia, setSocialMedia] = useState({
    instagram: "",
    facebook: "",
    twitter: "",
    tiktok: "",
  });

  //  my code

  const [isProfileUploaded, setIsProfileUploaded] = useState(false);
  const [selectedProfileFile, setSelectedProfileFile] = useState(null);
  const [selectedGalleryFiles, setSelectedGalleryFiles] = useState([]);

  const onProfileDrop = (acceptedFiles) => {
    // Set the selected profile file
    setSelectedProfileFile(acceptedFiles[0]);
    setIsProfileUploaded(true);
  };

  const onGalleryDrop = (acceptedFiles) => {
    // Add the newly selected files to the existing selectedGalleryFiles state
    setSelectedGalleryFiles([...selectedGalleryFiles, ...acceptedFiles]);
  };

  const { getRootProps: profileRootProps, getInputProps: profileInputProps } =
    useDropzone({ onDrop: onProfileDrop });
  const { getRootProps: galleryRootProps, getInputProps: galleryInputProps } =
    useDropzone({ onDrop: onGalleryDrop });
  //  my code

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
      image: selectedProfileFile,
      gallary: selectedGalleryFiles,
      social_media: socialMediaArray,
      subscriptionDate: date,
      subscriptionName: subscriptions.subscriptionName,
      expirationDate: setExpireDate(selectedPackages?.month),
      packageChoosed: selectedPackages?.month,
      isCreatedProfile: true,
      isSubsCribed: true,
      referral: user?._id,
      role: "Coach",
    };

    const formData = new FormData();

    Object.entries(playerInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });

    console.log("coach Info", playerInfo);

    try {
      const response = await addPlayer(formData);
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Succes",
          text: `${response?.data?.message}`,
        });
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
            <h2>Add Coach</h2>
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
            selectedProfileFile={selectedProfileFile}
            setSelectedProfileFile={setSelectedProfileFile}
            profileRootProps={profileRootProps}
            profileInputProps={profileInputProps}
            selectedGalleryFiles={selectedGalleryFiles}
            galleryRootProps={galleryRootProps}
            galleryInputProps={galleryInputProps}
            isProfileUploaded={isProfileUploaded}
            setIsProfileUploaded={setIsProfileUploaded}
          />
        ) : step === 2 ? (
          <PricingModal setSelectedPackages={setSelectedPackages} />
        ) : step === 3 ? (
          <MakePaymenModal
            setMakePaymentClose={setAddCoachModal}
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
              <button onClick={() => setAddCoachModal(false)}>Cancel</button>
              <button
                className="addplayer_btn"
                onClick={() => {
                  const requiredFields = [
                    "firstName",
                    "lastName",
                    "gender",
                    "date_of_birth",
                    "nationality",
                    "country",
                    "email",
                    "phone_number",
                    "city",
                    "sports",
                    "dominantHand",
                    "position",
                  ];
                  const missingFields = requiredFields.filter(
                    (field) => !playerData[field]
                  );
                  if (missingFields.length > 0) {
                    alert(
                      `Fill up the required fields: ${missingFields.join(", ")}`
                    );
                  } else {
                    setStep((prevStep) => prevStep + 1);
                  }

                }}
              >
                {step === 2 ? "Next" : "Add Coach"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCoachModal;
