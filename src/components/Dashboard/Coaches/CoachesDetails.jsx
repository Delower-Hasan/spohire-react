import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { AiOutlineMessage } from "react-icons/ai";
import { FaLink } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import silverIcon from "../../../assets/silver_icon.svg";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useGetPlayerDetailsQuery } from "../../../features/auth/authApi";
import {
  useGetMyObservationsQuery,
  useToggleObservationMutation,
} from "../../../features/observation/observationApi";
import Swal from "sweetalert2";
import { getCountryFlag } from "../../../utils/getFlag";

const CoachesDetails = () => {
  const { id } = useParams();
  const { data: user, isLoading } = useGetPlayerDetailsQuery(id);
  const { data: observation, isSuccess } = useGetMyObservationsQuery();
  const isBookmarked = observation?.data?.find(
    (i) => i?.target_id?._id === user?._id
  );

  const [toggleObservation, { isLoading: observeLoading }] =
    useToggleObservationMutation();

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
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    }
  };

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(
        `${import.meta.env.VITE_DOMAIN_URL}/dashboard/coacheDetails/${id}`
      )
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500); // Reset copied state after 1.5 seconds
      })
      .catch((error) => console.error("Failed to copy:", error));
  };

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

  return (
    <div className="details_information">
      <div className="profile_cover">
        <div className="cover_title">
          <h2>
            <Marquee>
              {user?.fullName
                ? user?.fullName
                : `${user?.firstName} ${user?.lastName}`}{" "}
            </Marquee>
          </h2>
        </div>

        <div className="personal_info d-flex align-items-center justify-content-between">
          <div className="bio_graphy">
            <p className="surname">{user?.firstName}</p>
            <p className="nickname pb-3">{user?.lastName}</p>
            <div className="country d-flex gap-2 align-items-center pb-3">
              {/* <img src={Germany} alt="" /> */}
              {/* <p>{user?.country ? user?.country : user?.nationality}</p> */}
              <div
                dangerouslySetInnerHTML={{
                  __html: getCountryFlag(
                    user?.country ? user?.country : user?.nationality
                  ),
                }}
              />{" "}
              <p>{user?.country ? user?.country : user?.nationality}</p>
            </div>
            <div className="contact_method d-flex gap-3 align-items-center pb-3">
              <Link to={`/dashboard/messages/${user?._id}`}>
                <button className="cm_message">
                  <AiOutlineMessage />
                  <p>Message</p>
                </button>
              </Link>

              <button
                className="cm_link d-flex gap-2 align-items-center justify-content-center"
                onClick={copyToClipboard}
              >
                <FaLink />

                {copied ? (
                  <span style={{ color: "red" }}>Copied!</span>
                ) : (
                  <p>Share</p>
                )}
              </button>

              <button
                className="bg-none me-3"
                onClick={(e) => handleBookmark(e, user?._id)}
                style={{ width: "20px" }}
                disabled={observeLoading}
              >
                {isBookmarked !== undefined &&
                  (isBookmarked ? (
                    <FaRegBookmark
                      style={{
                        color: "#FFF",
                        fontSize: "35px",
                        strokeWidth: "1",
                      }}
                    />
                  ) : (
                    <FaRegBookmark
                      style={{
                        color: "#FFF",
                        fontSize: "35px",
                        strokeWidth: "1",
                      }}
                    />
                  ))}
              </button>
            </div>
          </div>

          <div className="photograph z-1">
            <div className="photograph_border">
              <div className="photograph_img position-relative">
                <img
                  src={`${import.meta.env.VITE_FILE_ROOT_PATH}/${user?.image}`}
                  alt="photograph"
                />

                <div className="subscription_title d-flex align-items-center gap-2 position-absolute">
                  <p
                    className="font-bold d-inline-flex gap-2"
                    style={{
                      fontSize: "10px",
                      color: "#CD7F32",
                      border: "1px solid #CD7F32",
                      padding: "5px 10px",
                      borderRadius: "28px",
                      backgroundColor: "white",
                    }}
                  >
                    <img src={silverIcon} alt="silver-icon" />
                    Silver
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bio_graphy2 d-flex justify-content-center gap-4">
            <div className=" text-center">
              <p className="bio_title">Age</p>
              <p className="bio_info">
                {calculateAge(user?.date_of_birth) ?? "N/A"}
              </p>
              <p className="bio_footer_title text-white">years</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className=" text-center">
              {/* <p className="bio_title">height</p>
              <p className="bio_info">{user?.height ?? "N/A"}</p>
              <p className="bio_footer_title">CM</p> */}
            </div>

            <div className=" text-center">
              {/* <p className="bio_title">Weight</p>
              <p className="bio_info">{user?.weight ?? "N/A"}</p>
              <p className="bio_footer_title">Kgs</p> */}
            </div>
          </div>
        </div>

        <div className="other_information d-flex justify-content-between">
          <div className="other_info_left">
            <div className="info d-flex align-items-center justify-content-between pb-4 gap-5">
              <p className="info_title">Nationality</p>
              <p className="info_des">{user?.nationality ?? "N/A"}</p>
            </div>
            <div className="info d-flex align-items-center justify-content-between pb-4 gap-5">
              <p className="info_title">Residence</p>
              <p className="info_des">{user?.country ?? "N/A"}</p>
            </div>
            <div className="info d-flex align-items-center justify-content-between pb-4 gap-5">
              <p className="info_title">City</p>
              <p className="info_des">{user?.city ?? "N/A"}</p>
            </div>

            <div className="info d-flex align-items-center justify-content-between pb-4 gap-5">
              <p className="info_title">Gender</p>
              <p className="info_des">{user?.gender ?? "N/A"}</p>
            </div>
          </div>
          <div className="other_info_right">
            <div className="info d-flex align-items-center justify-content-between pb-4 gap-5">
              <p className="info_title">Date of birth</p>
              <p className="info_des">{user?.date_of_birth ?? "N/A"}</p>
            </div>
            <div className="info d-flex align-items-center justify-content-between pb-4 gap-5">
              <p className="info_title">Curent club </p>
              <p className="info_des">{user?.club_name ?? "N/A"}</p>
            </div>
            <div className="info d-flex align-items-center justify-content-between pb-4 gap-5">
              <p className="info_title">sport </p>
              <p className="info_des">{user?.sports ?? "N/A"}</p>
            </div>
            <div className="info d-flex align-items-center justify-content-between pb-4 gap-5">
              <p className="info_title">Added by </p>
              <p className="info_des">{user?.referral?.first_name}</p>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div className="social_media d-flex justify-content-between mb-4">
        <div className="media text-center">
          <FaInstagram
            style={{ color: "#2B3674", width: "36px", height: "36px" }}
          />
          <p className="follower_count">126K</p>
          <p className="follower_title">FOLLOWers</p>
        </div>

        <div className="media text-center">
          <FaFacebookF
            style={{ color: "#2B3674", width: "36px", height: "36px" }}
          />
          <p className="follower_count">26M</p>
          <p className="follower_title">FOLLOWers</p>
        </div>

        <div className="media text-center">
          <BsTwitterX
            style={{ color: "#2B3674", width: "36px", height: "36px" }}
          />
          <p className="follower_count">26M</p>
          <p className="follower_title">FOLLOWers</p>
        </div>

        <div className="media text-center">
          <BsTiktok
            style={{ color: "#2B3674", width: "36px", height: "36px" }}
          />
          <p className="follower_count">26M</p>
          <p className="follower_title">FOLLOWers</p>
        </div>
      </div> */}

      <div className="experience mb-4">
        <div className="section_title">
          <h3>Experience</h3>
        </div>
        <div className="top d-flex justify-content-between py-4">
          {user?.experience.length > 0 ? (
            user?.experience?.map((item, index) => (
              <div className="exerience_infomation">
                <p className="year">
                  {item.start_year} –{item.end_year}
                </p>
                <p className="exprince_info">{item.club_name}</p>
              </div>
            ))
          ) : (
            <p className="exprince_info">No Item found</p>
          )}

          {/* <div className="exerience_infomation">
            <p className="year">2003 –2010</p>
            <p className="exprince_info">Cleveland</p>
          </div>
          <div className="exerience_infomation">
            <p className="year">2003 –2010</p>
            <p className="exprince_info">Cleveland</p>
          </div> */}
        </div>
        {/* <div className="top d-flex justify-content-between py-4">
          <div className="exerience_infomation">
            <p className="year">2003 –2010</p>
            <p className="exprince_info">Cleveland</p>
          </div>
          <div className="exerience_infomation">
            <p className="year">2003 –2010</p>
            <p className="exprince_info">Cleveland</p>
          </div>
          <div className="exerience_infomation">
            <p className="year">2003 –2010</p>
            <p className="exprince_info">Cleveland</p>
          </div>
        </div> */}
      </div>

      <div className="advantages mb-4">
        <div className="row">
          <div className="col-lg-6">
            <div className="left">
              <div className="section_title">
                <h3>Strength Advantages</h3>
              </div>

              <ul className="list-unstyled ">
                <li className="d-flex align-items-center gap-2 py-3">
                  {user?.strengths_advantage ?? "N/A"}
                </li>
                {/* <li className="d-flex align-items-center gap-2 py-3">
                  <GoDotFill style={{ width: "10px", height: "10px" }} />
                  When we talk about Virtual Reality (VR), many of us think of
                  science fiction films.
                </li>
                <li className="d-flex align-items-center gap-2 py-3">
                  <GoDotFill style={{ width: "10px", height: "10px" }} />
                  When we talk about Virtual Reality (VR), many of us think of
                  science fiction films.
                </li> */}
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="right">
              <div className="section_title">
                <h3>Expectations From A New Club</h3>
              </div>

              <p className="advantages_content py-4">
                {user?.expectations_from_new_club ?? "N/A"}
              </p>
              {/* <p className="advantages_content">
                When we talk about Virtual Reality (VR), many of us think of
                science fiction films like “Minority Report”. However, the truth
                is that nowadays, this technology completely blends in with our
                daily lives.
              </p> */}
            </div>
          </div>
        </div>
      </div>

      <div className="about_me mb-4">
        <div className="section_title">
          <h3>About Me</h3>
        </div>

        <p className="about_me_des py-4">{user?.about_me ?? "N/A"}</p>
      </div>

      <div className="gallery">
        <div className="section_title">
          <h3>Gallery</h3>
        </div>
        <div className="images_wrapper py-4 d-flex align-items-center justify-content-between">
          <div className="largeImg d-flex flex-wrap align-items-center gap-3">
            {user?.gallary?.length > 0 ? (
              user?.gallary?.map((item, index) => (
                <>
                  <img
                    src={`${import.meta.env.VITE_FILE_ROOT_PATH}/${item}`}
                    alt=""
                    className="rounded"
                    style={{ maxWidth: "150px" }}
                  />
                </>
              ))
            ) : (
              <>
                <p>N/A</p>
              </>
            )}
          </div>
          {/* <div className="miniImg">
            <div className="d-flex gap-2 mb-2">
              <img src={ImageTwoMini} alt="" />
              <img src={ImageThreeMini} alt="" />
            </div>
            <div className="d-flex gap-2 mb-2">
              <img src={ImageFourMini} alt="" />
              <img src={ImageFiveMini} alt="" />
            </div>
          </div>
          <div className="largeImg">
            <img src={ImageOne} alt="" />
          </div>
          <div className="miniImg">
            <div className="d-flex gap-2 mb-2">
              <img src={ImageTwoMini} alt="" />
              <img src={ImageThreeMini} alt="" />
            </div>
            <div className="d-flex gap-2 mb-2">
              <img src={ImageFourMini} alt="" />
              <img src={ImageFiveMini} alt="" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CoachesDetails;
