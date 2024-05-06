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

const MyAnnouncement = ({ isActive }) => {
  const { data: allAnnouncements, isLoading } = useGetAllAnnouncementQuery();

  const { user } = useSelector((state) => state.auth);
  const [announcementType, setAnnouncementType] = useState("My");

  const [deleteAnnouncement, { isLoading: deleting }] =
    useDeleteAnnouncementMutation();

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

  const announcementTypeFilter = (data) => {
    if (announcementType === "My") {
      return data?.creator === user?._id;
    }
  };

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const filtered =
    isActive === "expired"
      ? allAnnouncements?.data?.filter((u) => u.isActive === false)
      : allAnnouncements?.data?.filter((u) => u.isActive);

  const filteredData = filtered?.filter(announcementTypeFilter) || [];

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <>
      <div
        className="announcement"
        // style={{ margin: "30px", paddingTop: "30px" }}
      >
        <div>
          {allAnnouncements?.data && filteredData.length > 0 ? (
            filteredData
              ?.slice(startIndex, endIndex)
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
              style={{ height: "70vh" }}
            >
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
    </>
  );
};

export default MyAnnouncement;

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
                  style={{ gap: "6px" }}
                >
                  <img src={location} alt="" />
                  <span>{announcement?.location}</span>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "6px" }}
                >
                  <img src={flag} alt="" />
                  <span>{announcement?.status}</span>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "6px" }}
                >
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
                  disabled={isLoading}
                >
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
                  onClick={() => handleDelete(announcement)}
                >
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
                style={{ cursor: "pointer" }}
              >
                See More
              </span>
            </>
          )}
        </p>
        <div className="d-flex gap-3 d-lg-none d-block justify-content-end">
          <img src={edit2} alt="" />
          <button
            className="bg-none"
            data-bs-target="#exampleModalToggle2"
            data-bs-toggle="modal"
          >
            <img src={delet} alt="" />
          </button>
        </div>
      </div>
    </>
  );
};
