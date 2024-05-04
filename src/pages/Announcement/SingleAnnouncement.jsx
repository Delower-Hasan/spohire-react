import { useState } from "react";
import a1 from "../../assets/a11.png";
import flag from "../../assets/flag.png";
import dollar from "../../assets/coin-dollar.png";
import location from "../../assets/location.png";
import bookmark1 from "../../assets/bookmark11.png";
import bookmark2 from "../../assets/bookmark12.svg";
import JobCategory from "./JobCategory";
import {
  useGetMyObservationsQuery,
  useToggleObservationMutation,
} from "../../features/observation/observationApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const SingleAnnouncement = ({ item }) => {
  // const [bookmark, setBookmark] = useState(false);

  // const handleBookmark = () => {
  //   setBookmark(!bookmark);
  // };
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { data, isSuccess } = useGetMyObservationsQuery();
  const [seeMore, setSeeMore] = useState(250);

  const isBookmarked = data?.data?.find((i) => i?.target_id?._id === item?._id);

  const [toggleObservation, { isLoading }] = useToggleObservationMutation();

  const handleBookmark = async (id) => {
    const data = {
      user_id: user?._id,
      target_id: id,
      target_type: "Announcement",
    };

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

  const bookmarkOrRedirectHandler = (id) => {
    if (user) {
      handleBookmark(id);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="announcelist_wrapper">
        <div className="d-flex justify-content-between align-items-start">
          <div
            className="d-flex flex-wrap align-items-center"
            style={{ gap: "36px" }}
          >
            <div className="announcement_pic">
              <img
                src={item.image}
                alt=""
                style={{
                  height: "213px",
                  width: "213px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="recruiment f_sfPro">
              <p className="title">{item.title}</p>
              <p className="position">{item.sports}</p>
              <div
                className="d-flex gap-3 flex-wrap"
                style={{ marginBottom: "31px" }}
              >
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "6px" }}
                >
                  <img src={location} alt="" />
                  <span>{item.location}</span>
                </div>
                <div
                  className="d-flex  align-items-center"
                  style={{ gap: "6px" }}
                >
                  <img src={dollar} alt="" />
                  <span>USD {item.budget}</span>
                </div>
              </div>

              <p className="details">{item.description}</p>
            </div>
          </div>
          {/* icon div */}
          <div>
            <div>
              <button
                className="bg-none"
                onClick={() => bookmarkOrRedirectHandler(item?._id)}
              >
                {isBookmarked ? (
                  <img
                    style={{ width: "18px", height: "25px" }}
                    src={bookmark2}
                    alt=""
                  />
                ) : (
                  <img
                    style={{ width: "23px", height: "30px" }}
                    src={bookmark1}
                    alt=""
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleAnnouncement;
