import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import "./Modal.css";
import PricingModal from "./PricingModal";
import useClickOutside from "../../../hooks/useClickOutside";
import MakePaymenModal from "./MakePaymenModal";
import AddPlayerForm from "./AddPlayerForm";
import { setExpireDate } from "../../../utils/setExpireDate";
import { useAddPlayerMutation } from "../../../features/auth/authApi";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";

const AddPlayerModal = ({ setAddPlayerModal }) => {
  const { user, subscriptions } = useSelector((state) => state.auth);

  const wrapperRef = useClickOutside(() => setAddPlayerModal(false));
  const [step, setStep] = useState(1);
  const [addPlayer, { isLoading: addPlayerLoading }] = useAddPlayerMutation();

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
    // console.log("acceptedFiles", acceptedFiles[0]);
    // Add the newly selected files to the existing selectedGalleryFiles state
    setSelectedGalleryFiles([...selectedGalleryFiles, acceptedFiles[0]]);
  };

  const { getRootProps: profileRootProps, getInputProps: profileInputProps } =
    useDropzone({ onDrop: onProfileDrop });

  const { getRootProps: galleryRootProps, getInputProps: galleryInputProps } =
    useDropzone({ onDrop: onGalleryDrop });
  //  my code

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

  console.log("selectedGalleryFiles", selectedGalleryFiles);
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
      role: "Player",
    };

    const formData = new FormData();

    Object.entries(playerInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await addPlayer(formData);
      if (response?.data?.success) {
        Swal({
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
