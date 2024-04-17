import "./jobOffers.css";
import footBallCoachImg from "../../../assets/footballCoach.png";
import locationIcon from "../../../assets/location-icon.svg";
import pdfIcon from "../../../assets/pdfIcon.svg";
import dollarIcon from "../../../assets/dollar-icon.svg";
import b1 from "../../../assets/bookmark.png";
import bookmarkfill from "../../../assets/bookmark-fill.png";
import MobileButtons from "../players/MobileButtons";
import AddJobOffer from "../AddJobOffer/AddJobOffer";
import { useEffect, useState } from "react";
import {
  useGetAllJobsQuery,
  useGetAppliedJobsQuery,
  useGetJobApplicantsQuery,
} from "../../../features/job/jobApi";
import { useSelector } from "react-redux";
import {
  useGetMyObservationsQuery,
  useToggleObservationMutation,
} from "../../../features/observation/observationApi";
import Swal from "sweetalert2";
import { convertDate } from "../../../utils/TimeConverter";
import axios from "axios";
import { useParams } from "react-router-dom";

const AppliedJobs = () => {
  const { id } = useParams();
  // const { data, isSuccess, isLoading } = useGetAppliedJobsQuery();

  const { data, isSuccess, isLoading } = useGetJobApplicantsQuery(id);

  //   const filteredJobs = allJobs?.data.filter((value) => {
  //     if (jobType || JobLocation || jobCategory) {
  //       return (
  //         (jobType && jobType == value.workplaceType) ||
  //         (JobLocation && JobLocation == value.job_location) ||
  //         (jobCategory && jobCategory == value.role)
  //       );
  //     } else {
  //       return true;
  //     }
  //     // return true;
  //   });

  if (isLoading) {
    return (
      <div
        class="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // useEffect(() => {}, [id]);

  return (
    <div className="job_offers_wrapper">
      <div className="job_offer_items_wrapper">
        {data && isSuccess && data?.length > 0 ? (
          data.map((item, index) => <SingleJob key={index} item={item} />)
        ) : (
          <div
            className="d-flex justify-content-center align-items-center fs-4"
            style={{ height: "70vh" }}
          >
            No Applied offer
          </div>
        )}
      </div>
      <MobileButtons />
    </div>
  );
};

export default AppliedJobs;

function SingleJob({ item }) {
  // const handleBookmark = () => {
  //   setBookmark(!bookmark);
  // };
  const [pdfLoading, setPdfLoading] = useState(false);

  const handleViewPdf = async () => {
    // const blob = new Blob([item.cv]);
    // const url = URL.createObjectURL(blob);
    // window.open(url, "_blank");
    setPdfLoading(true);
    try {
      const response = await axios.get(
        `${
          process.env.NODE_ENV !== "production"
            ? import.meta.env.VITE_LOCAL_API_URL
            : import.meta.env.VITE_LIVE_API_URL
        }/api/v1/job-applies/viewPdf/${item?._id}`,
        {
          responseType: "arraybuffer",
        }
      ); // Replace 'your-pdf-id' with the actual PDF ID
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setPdfLoading(false);
    } catch (error) {
      setPdfLoading(false);
      console.error("Error fetching PDF:", error.message);
    }
    // const blob = new Blob([item.cv], {
    //   type: "application/pdf",
    // });
    // const url = URL.createObjectURL(blob);
    // window.open(url, "_blank");
  };

  return (
    <>
      <div className="job_offers_item p-3">
        <div className="job_offers_item_content d-flex flex-wrap justify-content-between align-items-center">
          <div className=" ">
            <h2 className="mb-2">{item?.name}</h2>
            <p style={{ color: "#747474" }}>{item?.email}</p>

            <div className="d-flex gap-5 mt-4">
              <div>
                <p
                  style={{
                    color: "#0177FB",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Birth Date
                </p>
                <p
                  style={{
                    color: "#222222",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  {convertDate(item?.birth_date)}
                </p>
              </div>
              <div>
                <p
                  style={{
                    color: "#0177FB",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Country
                </p>
                <p
                  style={{
                    color: "#222222",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  {item?.region}
                </p>
              </div>
              <div>
                <p
                  style={{
                    color: "#0177FB",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Expected Salary
                </p>
                <p
                  style={{
                    color: "#222222",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  $ {item?.expected_salary}
                </p>
              </div>
              <div>
                <p
                  style={{
                    color: "#0177FB",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Phone
                </p>
                <p
                  style={{
                    color: "#222222",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  {item?.phone}
                </p>
              </div>
            </div>
          </div>
          <div className="right">
            {pdfLoading ? (
              <div class="text-center me-5">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <button
                className="bg-none d-flex flex-column align-items-center gap-2"
                onClick={handleViewPdf}
                //   disabled={isLoading}
              >
                <img src={pdfIcon} alt="" />
                <span>Download CV</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
