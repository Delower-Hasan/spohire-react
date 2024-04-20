import google from "../../../assets/google.svg";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { useState } from "react";
import { useGetAllJobsQuery } from "../../../features/job/jobApi";
import { useSelector } from "react-redux";
import {
  useGetMyObservationsQuery,
  useToggleObservationMutation,
} from "../../../features/observation/observationApi";

const RelatedJob = ({ data, isBookmarked, handleBookmark }) => {
  const { user } = useSelector((state) => state.auth);

  const { data: allJobs } = useGetAllJobsQuery();

  const relatedJobs = allJobs?.data.filter(
    (item) => item?.category === data?.category
  );

  return (
    <div className="related_job ">
      <p className="title">Related Jobs</p>
      <div className="d-flex flex-column gap-4">
        {relatedJobs?.map((data, index) => (
          <SingleRelatedJob user={user} key={index} item={data} />
        ))}
      </div>
    </div>
  );
};

function SingleRelatedJob({ item, user }) {
  const { data, isSuccess } = useGetMyObservationsQuery();

  const isBookmarked = data?.data?.find((i) => i?.target_id?._id === item?._id);

  const [toggleObservation, { isLoading }] = useToggleObservationMutation();

  const handleBookmark = async (id) => {
    const data = {
      user_id: user?._id,
      target_id: id,
      target_type: "Job",
    };

    try {
      const response = await toggleObservation(data);
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Successsful!",
          text: "Job bookmarked successfully!",
        });
      }
      if (response?.error?.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response?.error?.data?.message}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    }
  };

  return (
    <>
      <div className="jobs">
        <p className="name">{item?.job_title}</p>
        <div className="d-flex align-items-center gap-2 mb-4">
          <button className="status_btn">{item?.jobType}</button>
          <p className="secondary_text">Salary: {item?.salary}</p>
        </div>
        <div className="d-flex  w-100 align-items-center justify-content-between gap-4">
          <div className="d-flex align-items-center   gap-4">
            <img
              src={
                item?.club_logo
                  ? `${
                      process.env.NODE_ENV !== "production"
                        ? import.meta.env.VITE_LOCAL_API_URL
                        : import.meta.env.VITE_LIVE_API_URL
                    }/api/v1/uploads/${item?.club_logo}`
                  : google
              }
              alt=""
            />
            <div>
              <p>{item?.company}</p>
              <div className="d-flex align-items-center gap-1">
                <IoLocationOutline className="icon" />
                <p className="secondary_text">
                  {item?.job_location}, {item?.country}
                </p>
              </div>
            </div>
          </div>

          {item?.creator !== user?._id && (
            <button
              className="bookmark bg-transparent"
              onClick={() => {
                handleBookmark(item?._id);
              }}
              style={{ width: "20px" }}
              disabled={isLoading}
            >
              {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default RelatedJob;
