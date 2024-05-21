import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import { useAddPlayerMutation } from "../../../features/auth/authApi";
import { setExpireDate } from "../../../utils/setExpireDate";
import AddPlayerForm from "./AddPlayerForm";
import MakePaymenModal from "./MakePaymenModal";
import "./Modal.css";
import PricingModal from "./PricingModal";

const AddPlayerModal = ({ setAddPlayerModal }) => {
  const { user, subscriptions } = useSelector((state) => state.auth);

  const [step, setStep] = useState(1);
  const [addPlayer, { isLoading: addPlayerLoading }] = useAddPlayerMutation();

  const [isProfileUploaded, setIsProfileUploaded] = useState(false);
  const [selectedProfileFile, setSelectedProfileFile] = useState(null);
  const [selectedGalleryFiles, setSelectedGalleryFiles] = useState([]);
  const [errors, setErrors] = useState({});

  const onProfileDrop = (acceptedFiles) => {
    setSelectedProfileFile(acceptedFiles[0]);
    setIsProfileUploaded(true);
  };

  const onGalleryDrop = (acceptedFiles) => {
    setSelectedGalleryFiles([...selectedGalleryFiles, acceptedFiles[0]]);
  };

  const { getRootProps: profileRootProps, getInputProps: profileInputProps } =
    useDropzone({ onDrop: onProfileDrop });
  const { getRootProps: galleryRootProps, getInputProps: galleryInputProps } =
    useDropzone({ onDrop: onGalleryDrop });

  const removeGallaryImage = (index) => {
    const updatedImages = [...selectedGalleryFiles];
    updatedImages.splice(index, 1);
    setSelectedGalleryFiles(updatedImages);
  };

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

  const [playerData, setPlayerData] = useState({
    experience: "",
  });

  const [experienceFormData, setExperienceFormData] = useState({});

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setExperienceFormData({ ...experienceFormData, [name]: value });
  };

  const [userExperience, setUserExperience] = useState([
    ...playerData["experience"],
  ]);

  const handleAddMore = () => {
    if (
      experienceFormData.start_year &&
      experienceFormData.end_year &&
      experienceFormData.club_name
    ) {
      const newData = [...playerData?.experience, experienceFormData];
      setUserExperience(newData);
      setPlayerData((prevInfo) => ({
        ...prevInfo,
        experience: newData,
      }));
    } else {
      alert("Please fill up the experience data properly");
    }
  };

  const handleRemove = (itemToRemove) => {
    const newExperienceData = playerData.experience.filter(
      (item) => item !== itemToRemove
    );
    setUserExperience(newExperienceData);
    setPlayerData({ ...playerData, ["experience"]: newExperienceData });
  };

  const socialMediaArray = Object.values(socialMedia);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlayerData({ ...playerData, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    }
  };

  const fileInputRef = useRef(null);
  const [image, setImage] = useState("");
  const [selectedPackages, setSelectedPackages] = useState({
    duration: 1,
    price: 10,
    month: 1,
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile.name);
    setPlayerData({ ...playerData, image: selectedFile });
    if (errors["image"]) {
      setErrors((prevErrors) => ({ ...prevErrors, image: false }));
    }
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const date = new Date();
    const playerInfo = {
      ...playerData,
      image: selectedProfileFile,
      social_media: socialMediaArray,
      subscriptionDate: date,
      experience: userExperience,
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
      key === "experience" &&
        console.log("experience tab triggered successfully, ");
      key === "experience"
        ? formData.append("experience", JSON.stringify(value))
        : formData.append(key, value);
    });
    selectedGalleryFiles?.forEach((img, index) => {
      formData.append(`gallary`, img);
    });

    try {
      const response = await addPlayer(formData);
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `${response?.data?.message}`,
        });
        setLoading(false);
        return true;
      }
      if (!response?.success) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response?.message}`,
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

  const validateFields = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "gender",
      "date_of_birth",
      "nationality",
      "email",
      "phone_number",
      "city",
      "sports",
      "dominantHand",
      "mainPosition",
    ];

    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!playerData[field]) {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="addplayer_modal">
      <div className="inner">
        {step === 1 && (
          <div className="modal_heading d-flex justify-content-between">
            <h2>Add Player</h2>
            <p
              className="fs-6 pointer"
              onClick={() => setAddPlayerModal(false)}
            >
              X
            </p>
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
            handleRemove={handleRemove}
            removeGallaryImage={removeGallaryImage}
            PlayerType={"Player"}
            errors={errors}
          />
        ) : step === 2 ? (
          <PricingModal setSelectedPackages={setSelectedPackages} />
        ) : step === 3 ? (
          <MakePaymenModal
            setMakePaymentClose={setAddPlayerModal}
            handleSubmit={handleSubmit}
            addPlayerLoading={addPlayerLoading}
            selectedPackages={selectedPackages}
            PlayerType={"Player"}
            setStep={setStep}
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
                onClick={() => {
                  if (validateFields()) {
                    setStep((prevStep) => prevStep + 1);
                  } else {
                    alert("Please fill up the required fields.");
                  }
                }}
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
