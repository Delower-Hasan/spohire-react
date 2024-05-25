import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bookmark1 from "../../../assets/bookmark11.png";
import bookmark2 from "../../../assets/bookmark12.svg";
import messageIcon from "../../../assets/messageIcon.svg";
import playerImgOne from "../../../assets/playerImg.svg";
import { useGetFilteredUsersQuery } from "../../../features/auth/authApi";
import {
  useGetMyObservationsQuery,
  useToggleObservationMutation,
} from "../../../features/observation/observationApi";
import { positions } from "../../../utils/PlayersSports";
import { getCountryFlag } from "../../../utils/getFlag";
import Pagination from "../../Pagination/Pagination";
import MobileButtons from "./MobileButtons";
import MobilePlayers from "./MobilePlayers";
import "./Players.css";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const Players = () => {
  const { data: players, isLoading } = useGetFilteredUsersQuery("role=Player");
  const { user, playerFilterParams } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  console.log("playerFilterParams", playerFilterParams);

  const allowedPlans =
    user?.subscriptionName === "Gold"
      ? ["Gold", "Silver", "Bronze"]
      : user?.subscriptionName === "Silver"
      ? ["Silver", "Bronze"]
      : user?.subscriptionName === "Bronze"
      ? ["Bronze"]
      : [];

  if (user?.role === "Player") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You are not allowed to view this Page!",
    });
  }

  const calculateAge = (dateOfBirth) => {
    const currentDate = new Date();
    const dob = new Date(dateOfBirth);

    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDiff = currentDate.getMonth() - dob.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }
    return age;
  };

  const alterPositions = positions.filter(
    (item) => item.type === user.sports
  )[0].alternativePositions;
  console.log("alterPositions", alterPositions);

  const handleFilter = (value) => {
    if (
      playerFilterParams?.positions.length > 0 ||
      playerFilterParams?.status.length > 0 ||
      playerFilterParams?.location ||
      playerFilterParams?.gender ||
      playerFilterParams?.minAge ||
      playerFilterParams?.maxAge ||
      playerFilterParams?.minHeight ||
      playerFilterParams?.maxHeight ||
      playerFilterParams?.dominantHand
    ) {
      return (
        (playerFilterParams?.positions.length > 0 &&
          playerFilterParams?.positions.filter(
            (item) =>
              item === value?.mainPosition || item === value?.alterPosition
          )[0]) ||
        (playerFilterParams?.status.length > 0 &&
          playerFilterParams?.status.filter(
            (item) => item === value?.subscriptionName
          )[0]) ||
        (playerFilterParams?.location &&
          playerFilterParams?.location === value?.country) ||
        (playerFilterParams?.gender &&
          playerFilterParams?.gender === value?.gender) ||
        (playerFilterParams?.minHeight &&
          playerFilterParams?.minHeight <= value?.height) ||
        (playerFilterParams?.maxHeight &&
          playerFilterParams?.maxHeight >= value?.height) ||
        (playerFilterParams?.dominantHand &&
          playerFilterParams?.dominantHand === value?.dominantHand) ||
        (playerFilterParams?.minAge &&
          playerFilterParams?.minAge <= calculateAge(value?.date_of_birth)) ||
        (playerFilterParams?.maxAge &&
          playerFilterParams?.maxAge >= calculateAge(value?.date_of_birth))
      );
    } else {
      return true;
    }
  };

  const filteredData =
    players
      ?.filter(
        (player) =>
          player?.subscriptionName &&
          allowedPlans.includes(player?.subscriptionName) &&
          user?.sports === player?.sports &&
          player?.isActive === true
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
        <h2>Players</h2>

        <Table responsive className="players_desk content">
          <thead className="text-start">
            <tr>
              <th className="fs_14 text_color_36 fw-normal">
                <div className="d-flex align-items-center">
                  <p>Name</p>
                </div>
              </th>
              <th className="text-start">Nation</th>
              <th className="text-start">Date of Birth</th>
              <th className="text-start">Position</th>
              <th className="text-start">Club</th>
              <th className="text-start">Status</th>
              <th className="text-start">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr style={{ textAlign: "center" }}>
                <td align="centre" colSpan="7">
                  <ThreeDots
                    visible={true}
                    height="10"
                    width="100%"
                    color="#2B3674"
                    ariaLabel="line-wave-loading"
                  />
                </td>
              </tr>
            ) : (
              user?.role !== "Player" &&
              currentPageData.map((player, idx) => (
                <SinglePlayer key={idx} player={player} />
              ))
            )}
          </tbody>
        </Table>

        <MobilePlayers />
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

export default Players;

const SinglePlayer = ({ player }) => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { data } = useGetMyObservationsQuery();

  const isBookmarked = data?.data?.find(
    (i) => i?.target_id?._id === player?._id
  );

  const [toggleObservation, { isLoading }] = useToggleObservationMutation();

  const handleMessageRoute = (e, id) => {
    e.stopPropagation();
    navigate(`/dashboard/messages/${id}`);
  };

  const handleBookmark = async (e, id) => {
    e.stopPropagation();
    const data = {
      user_id: user?._id,
      target_id: id,
      target_type: "User",
    };

    try {
      const response = await toggleObservation(data);
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Successsful!",
          text: "Bookmarked successfully!",
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

  const handlePath = (player) => {
    const allowedPlans =
      user?.subscriptionName === "Gold"
        ? ["Gold", "Silver", "Bronze"]
        : user?.subscriptionName === "Silver"
        ? ["Silver", "Bronze"]
        : user?.subscriptionName === "Bronze"
        ? ["Bronze"]
        : [];

    if (allowedPlans.includes(player?.subscriptionName)) {
      navigate(`/dashboard/viewDetails/${player?._id}`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are not allowed to view his profile!",
      });
    }
  };
  return (
    <>
      <tr className="table_hover pointer" onClick={() => handlePath(player)}>
        <td>
          <div className="player_info d-flex align-items-center gap-2">
            <div className="player_info_wrapper d-flex gap-2 align-items-center">
              <div className="player_img">
                <img
                  src={
                    player?.image
                      ? `${
                          process.env.NODE_ENV !== "production"
                            ? import.meta.env.VITE_LOCAL_API_URL
                            : import.meta.env.VITE_LIVE_API_URL
                        }/api/v1/uploads/${player?.image}`
                      : playerImgOne
                  }
                  alt="player-img"
                  style={{
                    height: "35px",
                    width: "35px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div className="player_name">
                <p className="text_color_36 fw-medium fs_14 text-capitalize">
                  {player?.firstName} {player?.lastName}
                </p>
              </div>
            </div>
          </div>
        </td>

        <td>
          <p className="text_color_55 fw-normal fs_14 d-flex align-items-center gap-2">
            {" "}
            <p
              dangerouslySetInnerHTML={{
                __html: getCountryFlag(player?.nationality),
              }}
            />{" "}
            {player?.nationality}{" "}
          </p>
        </td>

        <td>
          <p className="text_color_55 fw-normal fs_14">
            {player?.date_of_birth}
          </p>
        </td>

        <td>
          <p className="text_color_55 fw-normal fs_14 text-capitalize">
            {player.mainPosition ?? "N/A"}
          </p>
        </td>

        <td>
          <p className="text_color_55 fw-normal fs_14 text-capitalize">
            {player.club_name ?? "N/A"}
          </p>
        </td>

        <td>
          <p
            className="text_color_55 fw-normal text-capitalize"
            style={{
              color:
                player?.subscriptionName === "Silver"
                  ? "#AEAEAE"
                  : player?.subscriptionName === "Bronze"
                  ? "#CD7F32"
                  : player?.subscriptionName === "Gold"
                  ? "#FFC21B"
                  : "inherit",
            }}
          >
            {player?.subscriptionName ?? "N/A"}
          </p>
        </td>

        <td>
          <div className="d-flex align-items-center">
            <button
              className="bg-none me-3"
              onClick={(e) => handleBookmark(e, player?._id)}
              style={{ width: "20px" }}
              disabled={isLoading}
            >
              {isBookmarked ? (
                <img
                  style={{ width: "12px", height: "17px" }}
                  src={bookmark2}
                  alt=""
                />
              ) : (
                <img
                  style={{ width: "12px", height: "17px" }}
                  src={bookmark1}
                  alt=""
                />
              )}
            </button>
            <span
              onClick={(e) => handleMessageRoute(e, player?.referral)}
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
