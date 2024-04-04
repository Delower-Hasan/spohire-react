/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./Announcements.css";
import a1 from "../../../assets/a11.png";
import flag from "../../../assets/flag.png";
import dollar from "../../../assets/coin-dollar.png";
import location from "../../../assets/location.png";
import b1 from "../../../assets/bookmark.png";
import bookmarkfill from "../../../assets/bookmark-fill.png";
import edit2 from "../../../assets/edit2.png";
import delet from "../../../assets/delete.png";
import DeleteModal from "../../../pages/Announcement/DeleteModal";
import { useState } from "react";
import {
  useDeleteAnnouncementMutation,
  useGetAllAnnouncementQuery,
} from "../../../features/announcement/announcementApi";
import {
  useGetMyObservationsQuery,
  useToggleObservationMutation,
} from "../../../features/observation/observationApi";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";

const DashboardAnnouncements = () => {
  const { data: allAnnouncements, isLoading } = useGetAllAnnouncementQuery();
  const { dashboardFilterParams } = useSelector((state) => state.announcement);
  console.log(dashboardFilterParams, "dashboardFilterParams");
  const { user } = useSelector((state) => state.auth);
  const [announcementType, setAnnouncementType] = useState("All");
  const [deleteAnnouncement, { isLoading: deleting }] =
    useDeleteAnnouncementMutation();
  // const sorting = allAnnouncements?.data?.sort(
  //   (a, b) => a.createdAt - b.createdAt
  // );
  const handleDelete = async (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteAnnouncement(item?._id);
        console.log(res, "ddd");
        if (res?.data?.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  // console.log(allAnnouncements, "sss");
  const announcementTypeFilter = (data) => {
    if (announcementType === "My") {
      return data?.creator === user?._id;
    } else {
      return data?.creator !== user?._id;
    }
  };

  const filtering = (data) => {
    if (
      dashboardFilterParams?.sports ||
      dashboardFilterParams?.country ||
      dashboardFilterParams?.categories
    ) {
      return (
        (dashboardFilterParams?.sports &&
          dashboardFilterParams.sports === data?.sports) ||
        (dashboardFilterParams?.country &&
          dashboardFilterParams?.country === data?.country) ||
        (dashboardFilterParams?.categories &&
          dashboardFilterParams?.categories === data?.category)
      );
    } else {
      return true;
    }
  };

  const filteredData =
    allAnnouncements?.data?.filter(filtering)?.filter(announcementTypeFilter) ||
    [];

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <>
      <div
        className="announcement bg-white rounded-2"
        style={{ margin: "30px", padding: "30px" }}>
        <div className="job_offers_topBtn d-flex align-items-center justify-content-between mb-3">
          <div className="job_offers_topBtn_left d-flex gap-4">
            <button
              className={`fs-6 fw-medium text_color_80 ${
                announcementType === "All" && "activeBtn"
              }`}
              onClick={() => setAnnouncementType("All")}>
              All
            </button>

            {/* <button
              className={`fs-6 fw-medium text_color_80 ${
                announcementType === "All" && "border-primary"
              }`}
              onClick={() => setAnnouncementType("All")}>
              All
            </button> */}

            <button
              className={`fs-6 fw-medium text_color_80 ${
                announcementType === "My" && "activeBtn"
              }`}
              onClick={() => setAnnouncementType("My")}>
              My Announcement
            </button>
          </div>

          {/* <div className="job_offers_topBtn_right">
          <button className="bg-transparent border-0 text_color_fb">
            Clear All
          </button>
        </div> */}
        </div>
        <div>
          {allAnnouncements?.data && filteredData?.length > 0 ? (
            filteredData
              .slice(startIndex, endIndex)
              .map((announcement, idx) => (
                <SingleAnnouncement
                  key={idx}
                  announcement={announcement}
                  handleDelete={handleDelete}
                />
              ))
          ) : (
            <div
              className="d-flex justify-content-center align-items-center fs-4"
              style={{ height: "70vh" }}>
              No Announcements
            </div>
          )}
        </div>
        {filteredData?.length > itemsPerPage && (
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
          // <div>fsjkjfsk</div>
        )}
      </div>

      <DeleteModal />
      <Pagination />
    </>
  );
};

export default DashboardAnnouncements;

const SingleAnnouncement = ({ announcement, handleDelete }) => {
  const [bookmark, setBookmark] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const { data, isSuccess } = useGetMyObservationsQuery();
  const [seeMore, setSeeMore] = useState(250);

  const isBookmarked = data?.data?.find(
    (i) => i?.target_id?._id === announcement?._id
  );

  const [toggleObservation, { isLoading }] = useToggleObservationMutation();

  const handleBookmark = async (id) => {
    const data = {
      user_id: user?._id,
      target_id: id,
      target_type: "Announcement",
    };

    // console.log(data, "jjjDD");

    try {
      const response = await toggleObservation(data);
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Successsful!",
          text: "Announcement bookmarked successfully!",
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
      <div className="announcelist_wrapper">
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex align-items-center" style={{ gap: "20px" }}>
            <div className="announcement_pic">
              <img
                src={
                  announcement?.image
                    ? `${
                        process.env.NODE_ENV !== "production"
                          ? import.meta.env.VITE_LOCAL_API_URL
                          : import.meta.env.VITE_LIVE_API_URL
                      }/api/v1/uploads/${announcement?.image}`
                    : a1
                }
                alt=""
                style={{
                  height: "57px",
                  width: "57px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
            <div className="recruiment f_sfPro">
              <p>{announcement?.title}</p>
              <div className="d-flex gap-3 flex-wrap">
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "6px" }}>
                  <img src={location} alt="" />
                  <span>{announcement?.location}</span>
                </div>
                {/* <div
                  className="d-flex align-items-center"
                  style={{ gap: "6px" }}
                >
                  <img src={flag} alt="" />
                  <span>{announcement?.status}</span>
                </div> */}
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "6px" }}>
                  <img src={dollar} alt="" />
                  <span>USD {announcement?.budget}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="d-lg-block d-none">
            <div className="d-flex gap-3 align-items-center">
              {announcement?.creator !== user?._id && (
                <button
                  className="bg-none"
                  style={{ width: "20px" }}
                  onClick={() => handleBookmark(announcement?._id)}
                  disabled={isLoading}>
                  {isBookmarked ? (
                    <img src={bookmarkfill} alt="" />
                  ) : (
                    <img src={b1} alt="" />
                  )}
                </button>
              )}
              {announcement?.creator === user?._id && (
                <Link to={`/dashboard/editAnnouncements/${announcement?._id}`}>
                  {" "}
                  <img src={edit2} alt="edit" />{" "}
                </Link>
              )}
              {announcement?.creator === user?._id && (
                <button
                  className="bg-none"
                  // data-bs-target="#exampleModalToggle2"
                  // data-bs-toggle="modal"
                  onClick={() => handleDelete(announcement)}>
                  <img src={delet} alt="" />
                </button>
              )}
            </div>
          </div>
        </div>
        <p className="announcement_details f_sfPro">
          {/* We cant wait to share this milestone with our incredible sports
          community. Your passion and support have fueled our journey, and were
          thrilled to <br className="d-lg-block d-none" /> take it to the next
          level together. */}
          {announcement?.description.slice(0, seeMore)}{" "}
          {announcement?.description?.length > seeMore && (
            <>
              ...
              <span
                className="text-primary"
                onClick={() => setSeeMore(announcement?.description.length)}
                style={{ cursor: "pointer" }}>
                See More
              </span>
            </>
          )}
        </p>
        <div className="d-flex gap-3 d-lg-none d-block justify-content-end">
          <button
            className="bg-none"
            style={{ width: "20px" }}
            onClick={handleBookmark}>
            {bookmark ? (
              <img src={bookmarkfill} alt="" />
            ) : (
              <img src={b1} alt="" />
            )}
          </button>
          <img src={edit2} alt="" />
          <button
            className="bg-none"
            data-bs-target="#exampleModalToggle2"
            data-bs-toggle="modal">
            <img src={delet} alt="" />
          </button>
        </div>
      </div>
    </>
  );
};
