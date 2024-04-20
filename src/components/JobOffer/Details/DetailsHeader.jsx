import google from "../../../assets/google-jobdetails.svg";
import { FaRegBookmark } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import ApplyModal from "./ApplyModal";
import bookmarkfill from "../../../assets/bookmark12.svg";

const DetailsHeader = ({ data, isBookmarked, handleBookmark }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="details_header">
        <div className="container">
          <div className="inner d-flex align-items-center justify-content-between gap-4">
            <div className="d-flex align-items-center gap-4">
              <img style={{ width: "100px" }} src={google} alt="" />
              <div>
                <h4>{data?.job_title} </h4>
                <div className="d-flex align-items-center gap-2">
                  <p className="at">at {data?.job_location} </p>
                  <button className="time_btn text-uppercase">
                    {data?.jobType}
                  </button>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-4">
              <button
                className="bookmark_btn"
                onClick={() => handleBookmark(data?._id)}
              >
                {isBookmarked ? (
                  <img
                    style={{ height: "15px", width: "15px" }}
                    src={bookmarkfill}
                    alt=""
                  />
                ) : (
                  <FaRegBookmark />
                )}
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
