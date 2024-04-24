import React, { useState } from "react";
import { useSelector } from "react-redux";

import useClickOutside from "../../../hooks/useClickOutside";
import AddCoachForm from "./AddCoachForm";
import "./Modal.css";
import PricingModal from "./PricingModal";
import MakePaymenModal from "./MakePaymenModal";

const AddCoachModal = ({ setAddCoachModal }) => {
  const { user } = useSelector((state) => state.auth);
  const addCoachRef = useClickOutside(() => setAddCoachModal(false));
  const [step, setStep] = useState(1);

  return (
    <div className="addplayer_modal ">
      <div className="inner" ref={addCoachRef}>
        {step === 1 && (
          <div className="modal_heading">
            <h2>Add Coach</h2>
          </div>
        )}

        {step === 1 ? (
          <AddCoachForm />
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
            } `}>
            <div className="action_btn d-flex gap-4">
              <button onClick={() => setAddCoachModal(false)}>Cancel</button>
              <button
                className="addplayer_btn"
                onClick={() => setStep((prevStep) => prevStep + 1)}>
                {step === 2 ? "Next" : "Add Player"}
              </button>
            </div>
          </div>
        )}

        {/* {showPricing && <PricingModal />} */}
      </div>
    </div>
  );
};

export default AddCoachModal;
