import MobilePlayers from "../players/MobilePlayers";
import playerImgOne from "../../../assets/playerImg.svg";
import messageIcon from "../../../assets/messageIcon.svg";
import more from "../../../assets/More.png";
import nation from "../../../assets/nation.png";
import nosubplayer from "../../../assets/nosubplayer.png";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetFilteredUsersQuery } from "../../../features/auth/authApi";
import { ThreeDots } from "react-loader-spinner";

const PlayerOverview = ({ user }) => {
  const { data, isLoading } = useGetFilteredUsersQuery(
    user?.role === "Manager"
      ? ""
      : user?.role === "Player"
      ? "role=Coach"
      : "role=Player"
  );
  // console.log(data, "duser");

  const allowedPlans =
    user?.subscriptionName === "Gold"
      ? ["Gold", "Silver", "Bronze"]
      : user?.subscriptionName === "Silver"
      ? ["Silver", "Bronze"]
      : user?.subscriptionName === "Bronze"
      ? ["Bronze"]
      : [];

  return (
    <>
      <div className="overview player_overview">
        <div className="d-flex justify-content-between mt-lg-0 mb-lg-0 mb-3">
          {/* {(user?.role === "Manager" || user?.role === "Coach") && ( */}
          <h4 className="players_title"> Players</h4>

          {data && data?.length > 0 && (
            <Link
              to={`${
                user?.role === "manager" || user?.role === "coach"
                  ? "/dashboard/players"
                  : null
              }`}
            >
              <img src={more} alt="more" />
            </Link>
          )}
        </div>
        <Table
          responsive
          className="players_desk content overview_table1"
          style={{
            background: "#FFFDFD",
          }}
        >
          <thead>
            <tr className="players_table_head">
              <th scope="col">Name</th>
              <th scope="col">Nation</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Position</th>
              <th scope="col">Club</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody align="center">
            {isLoading ? (
              <tr style={{ textAlign: "center" }}>
                <td align="centre" colSpan="7">
                  <ThreeDots
                    visible={true}
                    height="8"
                    width="100%"
                    color="#2B3674"
                    ariaLabel="line-wave-loading"
                  />
                </td>
              </tr>
            ) : (
              data &&
              data?.length > 0 &&
              data
                ?.filter(
                  (i) =>
                    i?.subscriptionName &&
                    allowedPlans.includes(i?.subscriptionName)
                )
                .slice(1, 5)
                .map((item, idx) => (
                  <tr className="table_hover" key={idx}>
                    {item?.subscriptionName ? (
                      <>
                        <td>
                          <div class="player_info">
                            <div class="player_info_wrapper d-flex gap-2 align-items-center">
                              <div className="player_img">
                                <img
                                  src={
                                    data?.image
                                      ? `${
                                          process.env.NODE_ENV !== "production"
                                            ? import.meta.env.VITE_LOCAL_API_URL
                                            : import.meta.env.VITE_LIVE_API_URL
                                        }/api/v1/uploads/${data?.image}`
                                      : playerImgOne
                                  }
                                  alt="player-img"
                                  style={{
                                    width: "35px",
                                    height: "35px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                  }}
                                />
                              </div>
                              <div class="player_name">
                                <p className="text_color_36 fw-medium mb-0">
                                  {item?.firstName} {item?.lastName}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text_color_55 fw-normal ">
                            <img className="me-2" src={nation} alt="nation" />{" "}
                            {item?.nationality}
                          </p>
                        </td>

                        <td>
                          <p className="text_color_55 fw-normal ">
                            {item?.date_of_birth}
                          </p>
                        </td>

                        <td>
                          <p className="text_color_55 fw-normal ">
                            {item?.mainPosition ? item?.mainPosition : "N/A"}
                          </p>
                        </td>

                        <td>
                          <p className="text_color_55 fw-normal ">
                            {item?.club_name ? item?.club_name : "N/A"}
                          </p>
                        </td>

                        <td>
                          <p
                            className="text_color_55 fw-normal"
                            style={{
                              color:
                                item?.subscriptionName === "Silver"
                                  ? "#AEAEAE"
                                  : item?.subscriptionName === "Bronze"
                                  ? "#CD7F32"
                                  : "inherit",
                            }}
                          >
                            {item?.subscriptionName
                              ? item?.subscriptionName
                              : "N/A"}
                          </p>
                        </td>

                        <td>
                          <div className="d-flex align-items-center">
                            <p className="text_color_55 fw-normal ">
                              <Link
                                to={`/dashboard/messages/${item?.referral}`}
                              >
                                {" "}
                                <img
                                  src={messageIcon}
                                  alt="message-icon"
                                  className="ms-2"
                                />
                              </Link>
                            </p>
                          </div>
                        </td>
                      </>
                    ) : (
                      <td colSpan="7">
                        <img src={nosubplayer} alt="Subscription required" />
                      </td>
                    )}
                  </tr>
                ))
            )}
          </tbody>
        </Table>
        <MobilePlayers className="m-lg-0 ms-4 me-4"></MobilePlayers>
      </div>
    </>
  );
};

export default PlayerOverview;
