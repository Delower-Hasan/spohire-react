import React, { useState } from "react";
import {
  useDeleteJobApplyMutation,
  useGetMyAppliedJobsQuery,
} from "../../../features/job/jobApi";
import MobileButtons from "../players/MobileButtons";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import pdfIcon from "../../../assets/pdfIcon.svg";
import Pagination from "../../Pagination/Pagination";

const MyAppliedJob = () => {
  const { data, isLoading, isSuccess } = useGetMyAppliedJobsQuery();

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

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

  return (
    <div className="job_offers_wrapper">
      <div className="job_offer_items_wrapper">
        {data && isSuccess && data?.length > 0 ? (
          data
            .slice(startIndex, endIndex)
            .map((item, index) => <SingleJob key={index} item={item} />)
        ) : (
          <div
            className="d-flex justify-content-center align-items-center fs-4"
            style={{ height: "70vh" }}
          >
            No Applied Jobs
          </div>
        )}
      </div>
      <MobileButtons />
      {data?.length > itemsPerPage && (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default MyAppliedJob;

function SingleJob({ item }) {
  const [deleteJobApply, { isLoading: deleting }] = useDeleteJobApplyMutation();

  const handleCancleJob = async (job) => {
    try {
      const response = await deleteJobApply(job?._id);
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Successsful!",
        });
      }
      if (response?.error?.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response?.error?.data?.message}`,
        });
      }

      console.log(response, "ress");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    }
  };

  const navigate = useNavigate();
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
      <div
        className="job_offers_item p-3"
        onClick={() => navigate(`/dashboard/jobDetails/${item?.job?._id}`)}
        style={{ cursor: "pointer" }}
      >
        <div className="job_offers_item_content d-flex flex-wrap justify-content-between align-items-center">
          <div className=" ">
            <h2 className="mb-2">{item?.job?.job_title}</h2>
            <p style={{ color: "#0095FF" }}>{item?.job?.company}</p>

            <div className="d-flex gap-2 mt-4">
              <div>
                <p
                  className="p-2 rounded border"
                  style={{
                    color: "#222222",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Job Type:{" "}
                  <span
                    style={{
                      color: "#05CD99",
                    }}
                  >
                    {" "}
                    {item?.job?.jobType}
                  </span>
                </p>
              </div>
              <div>
                <p
                  className="p-2 rounded border"
                  style={{
                    color: "#222222",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Location :{" "}
                  <span
                    style={{
                      color: "#05CD99",
                    }}
                  >
                    {" "}
                    {item?.job?.job_location}
                  </span>
                </p>
              </div>
              <div>
                <p
                  className="p-2 rounded border"
                  style={{
                    color: "#222222",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Salary :{" "}
                  <span
                    style={{
                      color: "#05CD99",
                    }}
                  >
                    {" "}
                    ${item?.job?.salary}
                  </span>
                </p>
              </div>
              <div>
                <p
                  className="p-2 rounded border"
                  style={{
                    color: "#222222",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Role :
                  <span
                    style={{
                      color: "#05CD99",
                    }}
                  >
                    {" "}
                    {item?.job?.category}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="d-flex align-items-center gap-2">
              {pdfLoading ? (
                <div class="text-center me-5">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <button
                  className="bg-none d-flex align-items-center gap-2 border rounded px-3 py-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewPdf();
                  }}
                  //   disabled={isLoading}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.4575 9.93706H6.27284V7.81941H7.57527C7.80611 7.81941 7.99953 7.74106 8.15554 7.58435C8.31155 7.42906 8.38955 7.23565 8.38955 7.00412V5.70177C8.38955 5.47094 8.31155 5.27753 8.15554 5.12153C7.99953 4.96482 7.80611 4.88647 7.57527 4.88647H5.4575V9.93706ZM6.27284 7.00412V5.70177H7.57527V7.00412H6.27284ZM9.48973 9.93706H11.526C11.7568 9.93706 11.9502 9.85871 12.1062 9.702C12.2615 9.54671 12.3392 9.35329 12.3392 9.12177V5.70177C12.3392 5.47094 12.2615 5.27753 12.1062 5.12153C11.9502 4.96482 11.7568 4.88647 11.526 4.88647H9.48973V9.93706ZM10.304 9.12177V5.70177H11.526V9.12177H10.303H10.304ZM13.6437 9.93706H14.458V7.81941H15.9235V7.00412H14.458V5.70177H15.9235V4.88647H13.6437V9.93706ZM4.88676 14.8235C4.39967 14.8235 3.99306 14.6605 3.66692 14.3344C3.34008 14.0075 3.17666 13.6006 3.17666 13.1135V1.71C3.17666 1.22294 3.34008 0.816353 3.66692 0.490235C3.99306 0.163412 4.39932 0 4.8857 0H16.2899C16.777 0 17.1836 0.163412 17.5097 0.490235C17.8366 0.816353 18 1.22294 18 1.71V13.1135C18 13.6006 17.8369 14.0075 17.5108 14.3344C17.184 14.6605 16.777 14.8235 16.2899 14.8235H4.88676ZM1.71328 18C1.22407 18 0.816401 17.8369 0.490264 17.5108C0.164127 17.1847 0.000705924 16.7767 0 16.2868V3.82765H1.05889V16.29C1.05889 16.4524 1.12665 16.6016 1.26219 16.7379C1.39844 16.8734 1.54774 16.9412 1.7101 16.9412H14.1732V18H1.71328Z"
                      fill="#FE6470"
                    />
                  </svg>

                  <span>View CV</span>
                </button>
              )}
              <button
                className="btn btn-primary px-3 py-2"
                style={{ fontWeight: "normal" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancleJob(item);
                }}
                disabled={deleting}
              >
                {deleting ? "Cancling..." : "Cancle"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
