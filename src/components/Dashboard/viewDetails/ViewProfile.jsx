import { FaLink } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import bronze from "../../../assets/bronze.png";
import facebook from "../../../assets/facebook.png";
import gold from "../../../assets/gold.png";
import instagram from "../../../assets/instagram.png";
import nationalityImg from "../../../assets/nationality_flag.png";
import profileImage from "../../../assets/profile_avatar.png";
import silver from "../../../assets/silver1.png";
import Gallary from "./Gallary";
import "./ViewDetails.css";
import ViewDetailsMobile from "./ViewDetailsMobile";
import { useEffect, useState } from "react";

const ViewProfile = () => {
  const { user } = useSelector((state) => state.auth);

  const convertAge = (dateString) => {
    const dob = new Date(dateString);
    const currentDate = new Date();
    const timeDiff = currentDate - dob;
    const age = Math.floor(timeDiff / (365.25 * 24 * 60 * 60 * 1000));
    return age;
  };
  const [socialMedia, setSocialMedia] = useState([]);

  useEffect(() => {
    let values = {};

    for (let i = 0; i < user?.social_media?.length; i++) {
      const element = user?.social_media[i];
      if (element.includes("twitter.com")) {
        values.twitter = element;
      } else if (element?.includes("instagram.com")) {
        values.instagram = element;
      } else if (element?.includes("facebook.com")) {
        values.facebook = element;
      } else if (element?.includes("youtube.com")) {
        values.youtube = element;
      } else {
        values.others = element;
      }
    }
    setSocialMedia(values);
  }, [user]);
  console.log("user", user);

  console.log("socialMedia", socialMedia);
  return (
    <>
      <div className="profile_heading d-flex align-items-center justify-content-between py-5">
        <h2>My Profile</h2>
        <div className="btn_group d-flex align-items-center gap-4">
          <Link to={"/dashboard/editPlayerDetals"} className="edit d-block">
            Edit
          </Link>
        </div>
      </div>

      <div className="View_details container p-0 overflow-hidden bg-white">
        <div className="personal_information d-flex justify-content-between mb-4">
          <div className="user_information d-flex align-items-center gap-4">
            <div className="user_img">
              <img
                className="img-fluid img-fluid profiles"
                src={
                  user?.image
                    ? `${
                        process.env.NODE_ENV !== "production"
                          ? import.meta.env.VITE_LOCAL_API_URL
                          : import.meta.env.VITE_LIVE_API_URL
                      }/api/v1/uploads/${user?.image}`
                    : profileImage
                }
                // src={profileImage}
                style={{
                  objectFit: "cover",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                }}
                alt="Profile"
              />
            </div>

            <div className="user_details">
              <p className="text_color_36 f_sfPro fs-4 user_title">
                {user?.first_name} {user?.last_name}
              </p>
              <span className="d-block f_sfPro text_color_cb user_designation">
                {user?.sports}
              </span>
              <p className="nationality d-flex align-items-center gap-2">
                <img src={nationalityImg} alt="nationaliy" />
                {user?.nationality}
              </p>
            </div>
          </div>

          <div className="user_otherInformation text-center ">
            <div>
              {user?.subscriptionName ? (
                <button className="gold_btn">
                  <img
                    src={
                      user?.subscriptionName === "Gold"
                        ? gold
                        : user?.subscriptionName === "Silver"
                        ? silver
                        : bronze
                    }
                    alt=""
                  />
                  {user?.subscriptionName}
                </button>
              ) : (
                <button className="gold_btn">No Plan</button>
              )}
            </div>

            <button className="update_plan">Upgrade</button>

            <div className="social_media_icon d-flex items-center gap-3">
              <Link className="link_btn" to="#">
                <FaLink /> Copy Profile Link
              </Link>

              {socialMedia.instagram && (
                <Link className="icon" to={socialMedia.instagram}>
                  <img src={instagram} alt="" />
                </Link>
              )}

              {socialMedia.facebook && (
                <Link className="icon" to={socialMedia.facebook}>
                  <img src={facebook} alt="" />
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="experience_information d-flex justify-content-between mb-5">
          <div className="ei_left" style={{ width: "500px" }}>
            <p className="f_sfPro text_color_36 fs-4 mb-4">
              Personal Information
            </p>

            <div className="d-flex flex-column align-items-start gap-3">
              <div className="d-flex" style={{ gap: "145px" }}>
                <div>
                  <span className="user_name">Name</span>
                  <p className="user_data_info fs-6">
                    {user?.first_name} {user?.last_name}
                  </p>
                </div>

                <div>
                  <span className="fuser_name user_name">Age</span>
                  <p className="user_data_info fs-6">
                    {convertAge(user?.date_of_birth)}
                  </p>
                </div>
              </div>

              <div className="d-flex" style={{ gap: "78px" }}>
                <div>
                  <span className="user_name">Nationality-Passport</span>
                  <p className="user_data_info fs-6">{user?.nationality}</p>
                </div>

                {/* <div>
                  <span className="user_name">Position</span>
                  <p className="user_data_info fs-6">
                    {user?.position ? user?.position : "N/A"}
                  </p>
                </div> */}
              </div>
            </div>
          </div>
          <div className="ei_right" style={{ width: "500px" }}>
            <div>
              <p className="f_sfPro mb-2 experience">Experience</p>
              <div className="d-flex flex-column flex-lg-row align-items-start gap-5">
                <div>
                  {user?.experience?.length > 0 &&
                    user?.experience.map((item, idx) => (
                      <p className="f_sfPro text_color_36 fs_18" key={idx}>
                        {item?.start_year}-{item?.end_year} {item?.club_name}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ViewDetailsMobile user={user} />
        <Gallary user={user} gallary={user?.gallary} />
      </div>
    </>
  );
};

export default ViewProfile;
