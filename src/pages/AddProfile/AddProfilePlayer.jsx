import React, { useState } from "react";
import "./AddProfile.css";

import loginBanner from "../../assets/addplayer.png";
import FirstStepPlayer from "./FirstStep/FirstStepPlayer";
import SecondStepPlayer from "./SecondStep/SecondStepPlayer";

const AddProfilePlayer = () => {
  const [step, setStep] = useState(0);
  return (
    <>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-5 p-0  d-none d-lg-block">
            <div className="addplayer_left_banner text-center ">
              <img className="img-fluid" src={loginBanner} alt="" />
            </div>
          </div>
          <div className="col-lg-7 p-0">
            {step === 0 && <FirstStepPlayer setStep={setStep} />}
            {step === 1 && <SecondStepPlayer setStep={setStep} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProfilePlayer;
