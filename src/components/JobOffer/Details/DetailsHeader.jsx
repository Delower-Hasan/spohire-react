import google from "../../../assets/google-jobdetails.svg";
import { FaRegBookmark } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import ApplyModal from "./ApplyModal";

const DetailsHeader = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="details_header">
        <div className="container">
          <div className="inner d-flex align-items-center justify-content-between gap-4">
            <div className="d-flex align-items-center gap-4">
              <img style={{width: "100px"}} src={google} alt="" />
              <div>
                <h4>Senior UX Designer</h4>
                <div className="d-flex align-items-center gap-2">
                  <p className="at">at Google </p>
                  <button className="time_btn">FULL-TIME</button>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-4">
              <button className="bookmark_btn">
                <FaRegBookmark />
              </button>
              <button onClick={() => setShow(true)} className="applyNow_btn">
                Apply Now <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ApplyModal show={show} setShow={setShow} />
    </>
  );
};

export default DetailsHeader;
