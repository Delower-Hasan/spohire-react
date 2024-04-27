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
            <p style={{ color: "#747474" }}>{item?.job?.company}</p>

            <div className="d-flex gap-5 mt-4">
              <div>
                <p
                  style={{
                    color: "#0177FB",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Job Type
                </p>
                <p
                  style={{
                    color: "#222222",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  {/* {convertDate(item?.birth_date)} */}
                  {item?.job?.jobType}
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
                  Location
                </p>
                <p
                  style={{
                    color: "#222222",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  {item?.job?.job_location}
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
                  Salary
                </p>
                <p
                  style={{
                    color: "#222222",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  $ {item?.job?.salary}
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
                  Role
                </p>
                <p
                  style={{
                    color: "#222222",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  {item?.job?.role}
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
                  className="bg-none d-flex flex-column align-items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewPdf();
                  }}
                  //   disabled={isLoading}
                >
                  <img src={pdfIcon} alt="" />
                  <span>View CV</span>
                </button>
              )}
              <button
                className="btn btn-sm btn-primary"
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
