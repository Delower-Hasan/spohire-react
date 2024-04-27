/* eslint-disable react/prop-types */
import { useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bookmarkfill from "../../../assets/bookmark-fill.png";
import b1 from "../../../assets/bookmark.png";
import messageIcon from "../../../assets/messageIcon.svg";
import playerImgOne from "../../../assets/playerImg.svg";
import { useGetFilteredUsersQuery } from "../../../features/auth/authApi";
import {
  useGetMyObservationsQuery,
  useToggleObservationMutation,
} from "../../../features/observation/observationApi";
import { convertAge } from "../../../utils/TimeConverter";
import { getCountryFlag } from "../../../utils/getFlag";
import Pagination from "../../Pagination/Pagination";
import MobileButtons from "../players/MobileButtons";
import MobilePlayers from "../players/MobilePlayers";
const Coaches = () => {
  const { data: coachs, isLoading } = useGetFilteredUsersQuery("role=Coach");
  const { user, coachFilterParams } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;



  const allowedPlans =
    user?.subscriptionName === "Gold"
      ? ["Gold", "Silver", "Bronze"]
      : user?.subscriptionName === "Silver"
      ? ["Silver", "Bronze"]
      : user?.subscriptionName === "Bronze"
      ? ["Bronze"]
      : [];

  const handleFilter = (value) => {
    if (coachFilterParams?.country || coachFilterParams?.categories) {
      return (
        (coachFilterParams?.country &&
          coachFilterParams?.country === value?.nationality) ||
        (coachFilterParams?.categories &&
          coachFilterParams?.categories === value?.category)
      );
    } else {
      return true;
    }
  };

  const handleAgeFilter = (a, b) => {
    if (coachFilterParams?.age) {
      if (coachFilterParams?.age === "youngest") {
        return new Date(b?.date_of_birth) - new Date(a?.date_of_birth);
      } else {
        return new Date(a?.date_of_birth) - new Date(b?.date_of_birth);
      }
    } else {
      return true;
    }
  };

  const filteredData =
    coachs
      ?.filter(
        (coachs) =>
          coachs?.subscriptionName &&
          allowedPlans.includes(coachs?.subscriptionName) &&
          user?.sports === coachs?.sports &&
          coachs?.isActive
      )
      .filter(handleFilter) || [];

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentPageData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <>
      <div className="players">
        <Table responsive className="players_desk content">
          <thead>
            <tr>
              <th className="fs_14 text_color_36 fw-normal">
                <div className="d-flex align-items-center">
                  <p>Name</p>
                </div>
              </th>
              <th className="fs_14 text_color_36 fw-normal">Nation</th>
              <th className="fs_14 text_color_36 fw-normal">Date of Birth</th>
              <th className="fs_14 text_color_36 fw-normal">Age</th>
              <th className="fs_14 text_color_36 fw-normal">Club</th>
              <th className="fs_14 text_color_36 fw-normal">Status</th>
              <th className="fs_14 text_color_36 fw-normal">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {coachs && filteredData?.length > 0 ? (
              filteredData.sort(handleAgeFilter).map((coach, idx) => (
                <>
                  <SingleCoach key={idx} coach={coach} />
                </>
              ))
            ) : (
              <tr className="mx-auto">No Coaches Found</tr>
            )} */}

            {currentPageData.map((coach, idx) => (
              <SingleCoach key={idx} coach={coach} />
            ))}
          </tbody>
        </Table>
        <MobilePlayers></MobilePlayers>
        <MobileButtons />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default Coaches;

const SingleCoach = ({ coach }) => {
  const [bookmark, setBookmark] = useState(false);

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { data, isSuccess } = useGetMyObservationsQuery();

  const isBookmarked = data?.data?.find(
    (i) => i?.target_id?._id === coach?._id
  );

  const [toggleObservation, { isLoading }] = useToggleObservationMutation();

  const handleBookmark = async (e, id) => {
    e.stopPropagation();
    const data = {
      user_id: user?._id,
      target_id: id,
      // target_type: "User",
      target_type: "Player",
    };

    // console.log(data, "jjjDD");

    try {
      const response = await toggleObservation(data);
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Successsful!",
          // text: "Job bookmarked successfully!",
        });
      }
      if (response?.error?.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response?.error?.data?.message}`,
        });
      }

      // console.log(response, "ress");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    }
  };
  const handlePath = (coach) => {
    const allowedPlans =
      user?.subscriptionName === "Gold"
        ? ["Gold", "Silver", "Bronze"]
        : user?.subscriptionName === "Silver"
        ? ["Silver", "Bronze"]
        : user?.subscriptionName === "Bronze"
        ? ["Bronze"]
        : [];

    console.log(allowedPlans, "ddddallow");

    if (allowedPlans.includes(coach?.subscriptionName)) {
      navigate(`/dashboard/coacheDetails/${coach?._id}`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are not allowed to view his profile!",
      });
    }
  };

  const hancleMessageLink = (e, id) => {
    e.stopPropagation();
    navigate(`/dashboard/messages/${id}`);
  };
  return (
    <>
      <tr className="table_hover pointer" onClick={() => handlePath(coach)}>
        <td>
          <div className="player_info d-flex align-items-center gap-2 ">
            <div className="player_info_wrapper d-flex gap-2 align-items-center">
              <div className="player_img">
                <img
                  src={
                    coach?.image
                      ? `${
                          process.env.NODE_ENV !== "production"
                            ? import.meta.env.VITE_LOCAL_API_URL
                            : import.meta.env.VITE_LIVE_API_URL
                        }/api/v1/uploads/${coach?.image}`
                      : playerImgOne
                  }
                  alt="player-img"
                  style={{
                    height: "35px",
                    width: "35px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <div className="player_name">
                <p className="text_color_36 fw-medium fs_14">
                  {/* {coach?.first_name} <br /> {coach?.last_name} */}
                  {coach?.fullName}
                </p>
                {/* <Link
                  to={`/dashboard/messages/${coach?.referral}`}
                  onClick={(e) => e.stopPropagation()}
                  style={{ fontSize: "12px", textDecoration: "underline" }}
                  className="text-primary"
                >
                  Contact with Owner
                </Link> */}
              </div>
            </div>
          </div>
        </td>
        <td>
          <p className="text_color_55 fw-normal fs_14 d-flex align-items-center gap-2">
            <p
              dangerouslySetInnerHTML={{
                __html: getCountryFlag(coach?.nationality),
              }}
            />
            {coach?.nationality}
          </p>
        </td>
        <td>
          <p className="text_color_55 fw-normal fs_14">
            {coach?.date_of_birth}
          </p>
        </td>
        <td>
          <p className="text_color_55 fw-normal fs_14">
            {coach?.date_of_birth ? convertAge(coach?.date_of_birth) : "N/A"}
          </p>
        </td>

        <td>
          <p className="text_color_55 fw-normal fs_14">
            {coach?.club_name ? coach?.club_name : "N/A"}
          </p>
        </td>

        <td>
          <p className="text_color_55 fw-normal fs_14">
            {coach?.subscriptionName ? coach?.subscriptionName : "N/A"}
          </p>
        </td>

        <td>
          <div className="d-flex align-items-center">
            <button
              className="bg-none me-3"
              onClick={(e) => handleBookmark(e, coach?._id)}
              style={{ width: "20px" }}
              disabled={isLoading}
            >
              {isBookmarked ? (
                <img src={bookmarkfill} alt="" />
              ) : (
                <img src={b1} alt="" />
              )}
            </button>
            <span
              // to={`/dashboard/messages/${coach?._id}`}
              onClick={(e) => hancleMessageLink(e, coach?.referral)}
              className="text_color_55 fw-normal fs_14"
            >
              <img src={messageIcon} alt="message-icon" className="ms-2" />
            </span>
          </div>
        </td>
      </tr>
    </>
  );
};
