import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import Germany from "../../../assets/germany.png";
import { AiOutlineMessage } from "react-icons/ai";
import { FaLink } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import photographImg from "../../../assets/coach_img.png";
import goldIcon from "../../../assets/gold_icon.png";
import silverIcon from "../../../assets/silver_icon.svg";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { BsTiktok } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import ImageOne from "../../../assets/imagesOne.png";
import ImageTwoMini from "../../../assets/imagesTwoMini.png";
import ImageThreeMini from "../../../assets/imagesThreeMini.png";
import ImageFourMini from "../../../assets/imagesFourMini.png";
import ImageFiveMini from "../../../assets/imagesFiveMini.png";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useGetPlayerDetailsQuery } from "../../../features/auth/authApi";
import {
  useGetMyObservationsQuery,
  useToggleObservationMutation,
} from "../../../features/observation/observationApi";
import Swal from "sweetalert2";
import { getCountryFlag } from "../../../utils/getFlag";
import { RotatingLines } from "react-loader-spinner";

const ViewDetails = () => {
  const { id } = useParams();
  const authUser = useSelector((item) => item.auth);

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
      user_id: authUser?.user?._id,
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

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(
        `${import.meta.env.VITE_DOMAIN_URL}/dashboard/viewDetails/${id}`
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
  // if (user?.experience !== undefined) {
  //   console.log("user?.experienceaa", a);
  // }
  if (isLoading) {
    return (
      <div
        style={{ height: "70vh", width: "100%" }}
        className="d-flex justify-content-center align-items-center"
      >
        {" "}
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className="details_information">
      <div className="profile_cover">
        <div className="cover_title">
          <h2>
            <Marquee>
              {user?.fullName
                ? user?.fullName
                : `${user?.firstName} ${user?.lastName}`}
            </Marquee>
          </h2>
        </div>

        <div className="personal_info d-flex align-items-center justify-content-between">
          <div className="bio_graphy">
            <p className="surname">{user?.firstName}</p>
            <p className="nickname pb-3">{user?.lastName}</p>
            <div className="country d-flex gap-2 align-items-center pb-3">
              {/* <img src={Germany} alt="" /> */}
              <div
                dangerouslySetInnerHTML={{
                  __html: getCountryFlag(user?.nationality),
                }}
              />{" "}
              <p>{user?.nationality}</p>
            </div>
            <div className="contact_method d-flex gap-3 align-items-center pb-3">
              {user?.referral._id !== authUser?.user._id && (
                <Link to={`/dashboard/messages/${user?.referral?._id}`}>
                  <button className="cm_message">
                    <AiOutlineMessage />
                    <p>Message</p>
                  </button>
                </Link>
              )}

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

                <div className="subscription_title  position-absolute">
                  {user?.isSubsCribed &&
                    user?.subscriptionName === "Silver" && (
                      <div className="d-flex align-items-center gap-2 text-uppercase">
                        <p
                          className="font-bold d-inline-flex gap-2"
                          style={{
                            fontSize: "16px",
                            color: "#2B3674",
                            border: "1px solid #F2F2F2",
                            padding: "8px 40px",
                            borderRadius: "13px",
                            backgroundColor: "#F2F2F2",
                          }}
                        >
                          <img src={silverIcon} alt="silver-icon" />
                          {user?.subscriptionName}
                        </p>
                      </div>
                    )}

                  {user?.isSubsCribed && user?.subscriptionName === "Gold" && (
                    <div className="d-flex align-items-center gap-2 text-uppercase">
                      <p
                        className="font-bold d-inline-flex gap-2"
                        style={{
                          fontSize: "16px",
                          color: "#fff",
                          border: "1px solid #FFD029",
                          padding: "8px 40px",
                          borderRadius: "13px",
                          backgroundColor: "#FFD029",
                        }}
                      >
                        <img src={goldIcon} alt="silver-icon" />
                        {user?.subscriptionName}
                      </p>
                    </div>
                  )}

                  {user?.isSubsCribed &&
                    user?.subscriptionName === "Bronze" && (
                      <div className="d-flex align-items-center gap-2 text-uppercase">
                        <p
                          className="font-bold d-inline-flex gap-2"
                          style={{
                            fontSize: "16px",
                            color: "#fff",
                            border: "1px solid #FB5A00",
                            padding: "8px 40px",
                            borderRadius: "13px",
                            backgroundColor: "#FB5A00",
                          }}
                        >
                          <img src={silverIcon} alt="silver-icon" />
                          {user?.subscriptionName}
                        </p>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          <div className="bio_graphy2 d-flex gap-4">
            <div className="age text-center">
              <p className="bio_title">Age</p>
              <p className="bio_info">
                {calculateAge(user?.date_of_birth) ?? "N/A"}
              </p>
              <p className="bio_footer_title">years</p>
            </div>

            <div className="height text-center">
              <p className="bio_title">height</p>
              <p className="bio_info">{user?.height ?? "N/A"}</p>
              <p className="bio_footer_title">CM</p>
            </div>

            <div className="wight text-center">
              <p className="bio_title">Weight</p>
              <p className="bio_info">{user?.weight ?? "N/A"}</p>
              <p className="bio_footer_title">Kgs</p>
            </div>
          </div>
        </div>

        <div className="other_information d-flex justify-content-between">
          <div className="other_info_left">
            <div className="info d-flex align-items-center justify-content-between pb-2 gap-5">
              <p className="info_title">Main position</p>
              <p className="info_des">{user?.mainPosition ?? "N/A"}</p>
            </div>
            <div className="info d-flex align-items-center justify-content-between pb-2 gap-5">
              <p className="info_title">Alternative</p>
              <p className="info_des">{user?.alterPosition ?? "N/A"}</p>
            </div>
            <div className="info d-flex align-items-center justify-content-between pb-2 gap-5">
              <p className="info_title">Date of birth</p>
              <p className="info_des">{user?.date_of_birth ?? "N/A"}</p>
            </div>
            <div className="info d-flex align-items-center justify-content-between pb-2 gap-5">
              <p className="info_title">Gender</p>
              <p className="info_des">{user?.gender ?? "N/A"}</p>
            </div>
          </div>
          <div className="other_info_right">
            <div className="info d-flex align-items-center justify-content-between pb-2 gap-5">
              <p className="info_title">Nationality </p>
              <p className="info_des">{user?.nationality ?? "N/A"}</p>
            </div>
            <div className="info d-flex align-items-center justify-content-between pb-2 gap-5">
              <p className="info_title">residence </p>
              <p className="info_des text-uppercase">{user?.city ?? "N/A"}</p>
            </div>
            <div className="info d-flex align-items-center justify-content-between pb-2 gap-5">
              <p className="info_title">sport </p>
              <p className="info_des">{user?.sports ?? "N/A"}</p>
            </div>
            <div className="info d-flex align-items-center justify-content-between pb-2 gap-5">
              <p className="info_title">Added by </p>
              <p className="info_des">{user?.referral?.first_name}</p>
            </div>
          </div>
        </div>
      </div>

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
      </div>

      {/* social  */}
      <div className="advantages mb-4">
        <div className="row">
          <div className="col-lg-3 mb-3">
            <div className="right text-center py-5">
              <div className="section_title text-uppercase text-center">
                <h3>{user?.dominantHand ?? "N/A"}</h3>
              </div>
              <p className="advantages_content text-uppercase">Dominant Hand</p>
            </div>
          </div>
          <div className="col-lg-3 mb-3">
            <div className="right text-center py-5">
              <div className="section_title text-uppercase text-center">
                <h3>{user?.city ?? "N/A"}</h3>
              </div>
              <p className="advantages_content text-uppercase">
                City of residence{" "}
              </p>
            </div>
          </div>
          <div className="col-lg-3 mb-3">
            <div className="right text-center py-5">
              <div className="section_title text-uppercase text-center">
                <h3>{user?.club_name ?? "N/A"}</h3>
              </div>
              <p className="advantages_content text-uppercase">Current club </p>
            </div>
          </div>
          <div className="col-lg-3 mb-3">
            <div className="right text-center py-5">
              <div className="section_title text-uppercase text-center">
                <h3>{user?.additional_passport ?? "N/A"}</h3>
              </div>
              <p className="advantages_content text-uppercase">
                Additional passport
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="experience mb-4">
        <div className="section_title">
          <h3>Experience</h3>
        </div>
        <div className="top d-flex justify-content-between py-4">
          {user?.experience !== undefined && user?.experience?.length > 0 ? (
            user?.experience?.map((item, index) => (
              <div key={index} className="exerience_infomation">
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
                    key={index}
                    className="rounded"
                    src={`${import.meta.env.VITE_FILE_ROOT_PATH}/${item}`}
                    alt=""
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

export default ViewDetails;
