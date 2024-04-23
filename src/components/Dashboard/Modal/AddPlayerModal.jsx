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

  const [playerData, setPlayerData] = useState({});

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
    setPlayerData({ ...jobData, playerData: selectedFile });
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
            image={image}
          />
        ) : step === 2 ? (
          <PricingModal />
        ) : step === 3 ? (
          <MakePaymenModal />
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
