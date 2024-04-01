import { Table } from "react-bootstrap";
import "./Players.css";
import playerImgOne from "../../../assets/playerImg.svg";
import messageIcon from "../../../assets/messageIcon.svg";
import MobileButtons from "./MobileButtons";
import MobilePlayers from "./MobilePlayers";
import { Link, useNavigate } from "react-router-dom";
import b1 from "../../../assets/bookmark.png";
import bookmark1 from "../../../assets/bookmark11.png";
import bookmark2 from "../../../assets/bookmark12.svg";
import bookmarkfill from "../../../assets/bookmark-fill.png";
import { useState } from "react";
import { useGetFilteredUsersQuery } from "../../../features/auth/authApi";
import { useSelector } from "react-redux";
import {
  useGetMyObservationsQuery,
  useToggleObservationMutation,
} from "../../../features/observation/observationApi";
import Swal from "sweetalert2";
import { getCountryFlag } from "../../../utils/getFlag";
import Pagination from "../../Pagination/Pagination";

const Players = () => {
  const { data: players, isLoading } = useGetFilteredUsersQuery("role=Player");
  const { user, playerFilterParams } = useSelector((state) => state.auth);
  const allowedPlans =
    user?.subscriptionName === "Gold"
      ? ["Gold", "Silver", "Bronze"]
      : user?.subscriptionName === "Silver"
      ? ["Silver", "Bronze"]
      : user?.subscriptionName === "Bronze"
      ? ["Bronze"]
      : [];

  const handleFilter = (value) => {
    if (
      playerFilterParams?.position ||
      playerFilterParams?.country ||
      playerFilterParams?.categories
    ) {
      return (
        (playerFilterParams?.position &&
          playerFilterParams?.position === value?.mainPosition) ||
        (playerFilterParams?.country &&
          playerFilterParams?.country === value?.nationality) ||
        (playerFilterParams?.categories &&
          playerFilterParams?.categories === value?.category)
      );
    } else {
      return true;
    }
  };

  console.log(user, "sddd");

  const filteredData =
    players
      ?.filter(
        (player) =>
          player?.subscriptionName &&
          allowedPlans.includes(player?.subscriptionName) &&
          user?.sports === player?.sports &&
          player?.isActive
      )
      .filter(handleFilter) || [];

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
            {players && filteredData?.length > 0 ? (
              filteredData?.map((player, idx) => (
                <SinglePlayer key={idx} player={player} />
              ))
            ) : (
              <tr className="mx-auto">No Players Found</tr>
            )}
          </tbody>
        </Table>

        <MobilePlayers />
        <MobileButtons />
      </div>
      <Pagination />
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
      target_type: "Player",
    };

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

  // const handlePath = (id) => {
  //   navigate(`/dashboard/viewDetails/${id}`);
  // };

  const gg = getCountryFlag("Afghanistan");
  // console.log(gg, "gg");

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
                    // player?.image
                    //   ? `${
                    //       process.env.NODE_ENV !== "production"
                    //         ? import.meta.env.VITE_LOCAL_API_URL
                    //         : import.meta.env.VITE_LIVE_API_URL
                    //     }/api/v1/uploads/${player?.image}`
                    //   :
                    playerImgOne
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
                  {/* {player?.first_name} <br /> {player?.last_name} */}
                  {player?.fullName}
                </p>
                {/* <Link
                  to={`/dashboard/messages/${player?.referral}`}
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
          <p className="text_color_55 fw-normal fs_14">
            {player.mainPosition ? player.mainPosition : "N/A"}
          </p>
        </td>

        <td>
          <p className="text_color_55 fw-normal fs_14">
            {player.club_name ? player.club_name : "N/A"}
          </p>
        </td>

        <td>
          <p
            className="text_color_55 fw-normal"
            style={{
              color:
                player?.subscriptionName === "Silver"
                  ? "#AEAEAE"
                  : player?.subscriptionName === "Bronze"
                  ? "#CD7F32"
                  : player?.subscriptionName === "Gold"
                  ? "#FFC21B"
                  : "inherit",
            }}>
            {player?.subscriptionName ? player?.subscriptionName : "N/A"}
          </p>
        </td>

        <td>
          <div className="d-flex align-items-center">
            <button
              className="bg-none me-3"
              onClick={(e) => handleBookmark(e, player?._id)}
              style={{ width: "20px" }}
              disabled={isLoading}>
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
              className="text_color_55 fw-normal fs_14">
              <img src={messageIcon} alt="message-icon" className="ms-2" />
            </span>
          </div>
        </td>
      </tr>
    </>
  );
};
