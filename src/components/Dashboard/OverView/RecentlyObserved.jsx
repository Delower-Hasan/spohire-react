import footBallCoachImg from "../../../assets/footballCoach.png";
import a1 from "../../../assets/a11.png";
import flag from "../../../assets/flag.png";
import dollar from "../../../assets/coin-dollar.png";
import location from "../../../assets/location.png";
import { Link } from "react-router-dom";
import { useGetMyObservationsQuery } from "../../../features/observation/observationApi";
const RecentlyObserved = () => {
  const { data, isLoading, isSuccess } = useGetMyObservationsQuery();

  return (
    <>
      <div className="job_offer_overrview_wrapper">
        <div
          className="d-flex justify-content-between"
          style={{ marginBottom: "0px" }}
        >
          <h4>Recently Observed</h4>
          {data?.data?.length > 0 && (
            <Link to="/dashboard/observed">View More</Link>
          )}
        </div>
        {data?.data && data?.data?.length > 0 ? (
          data?.data.slice(0, 5).map((item, idx) => (
            <div key={idx}>
              {item?.target_type === "Job" && (
                <div
                  className="d-flex align-items-center gap-2 joboffer_ov_wrapper"
                  style={{ marginTop: "20px" }}
                >
                  <div className="job_offer_item_img">
                    <img
                      src={
                        // item?.target_id?.club_logo
                        //   ? `${
                        //       process.env.NODE_ENV !== "production"
                        //         ? import.meta.env.VITE_LOCAL_API_URL
                        //         : import.meta.env.VITE_LIVE_API_URL
                        //     }/api/v1/uploads/${item?.target_id?.club_logo}`
                        //   :
                        footBallCoachImg
                      }
                      alt="img"
                      style={{
                        height: "46px",
                        width: "46px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>

                  <div className="job_offer_item_content d-flex">
                    <div className="job_offer_nameDesignation">
                      <h5 className="fw-medium fs-6 text_color_36 mb-1">
                        {item?.target_id?.job_title}
                      </h5>
                      <p className="fs-14 fw-normal text_color_80 mb-1">
                        {item?.target_id?.company}
                      </p>
                    </div>
                    <div className="align-self-lg-center align-self-end observed_links">
                      <Link to="/dashboard/jobOffers">Job Offers</Link>
                    </div>
                  </div>
                </div>
              )}
              {/* announcement */}
              {item?.target_type === "Announcement" && (
                <div
                  className="announcelist_wrapper1"
                  style={{ marginTop: "20px" }}
                >
                  <div className="announcement_details_wrapper">
                    <div className="d-flex align-items-center gap-2">
                      <div className="announcement_pic">
                        <img
                          src={
                            // item?.target_id?.image
                            //   ? `${
                            //       process.env.NODE_ENV !== "production"
                            //         ? import.meta.env.VITE_LOCAL_API_URL
                            //         : import.meta.env.VITE_LIVE_API_URL
                            //     }/api/v1/uploads/${item?.target_id?.image}`
                            //   :
                            a1
                          }
                          alt=""
                          style={{
                            height: "46px",
                            width: "46px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                      <div className="recruiment1 f_sfPro">
                        <p>{item?.target_id?.title}</p>
                        <div className="d-flex gap-3 flex-wrap">
                          <div
                            className="d-flex align-items-center"
                            style={{ gap: "6px" }}
                          >
                            <img src={location} alt="" />
                            <span>{item?.target_id?.location}</span>
                          </div>
                          {/* <div
                            className="d-flex align-items-center"
                            style={{ gap: "6px" }}
                          >
                            <img src={flag} alt="" />
                            <span>{item?.target_id?.status}</span>
                          </div> */}
                          <div
                            className="d-flex align-items-center"
                            style={{ gap: "6px" }}
                          >
                            <img src={dollar} alt="" />
                            <span>USD {item?.target_id?.budget}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{ paddingRight: "15px" }}
                      className="align-self-lg-center align-self-end"
                    >
                      <Link to="/dashboard/announcements">Announcement</Link>
                    </div>
                  </div>
                </div>
              )}
              {item?.target_type === "User" && (
                <div
                  className="announcelist_wrapper1"
                  style={{ marginTop: "20px" }}
                >
                  <div className="announcement_details_wrapper">
                    <div className="d-flex align-items-center gap-2">
                      <div className="announcement_pic">
                        <img
                          src={
                            item?.target_id?.image
                              ? `${
                                  process.env.NODE_ENV !== "production"
                                    ? import.meta.env.VITE_LOCAL_API_URL
                                    : import.meta.env.VITE_LIVE_API_URL
                                }/api/v1/uploads/${item?.target_id?.image}`
                              : a1
                          }
                          alt=""
                          style={{
                            height: "46px",
                            width: "46px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                      <div className="recruiment1 f_sfPro">
                        <p>
                          {item?.target_id?.first_name}{" "}
                          {item?.target_id?.last_name}
                        </p>
                        <div className="d-flex gap-3 flex-wrap">
                          <div
                            className="d-flex align-items-center"
                            style={{ gap: "6px" }}
                          >
                            <img src={location} alt="" />
                            <span>{item?.target_id?.nationality}</span>
                          </div>
                          {/* <div
                            className="d-flex align-items-center"
                            style={{ gap: "6px" }}
                          >
                            <img src={flag} alt="" />
                            <span>{item?.target_id?.status}</span>
                          </div> */}
                          <div
                            className="d-flex align-items-center"
                            style={{ gap: "6px" }}
                          >
                            <img src={dollar} alt="" />
                            <span>USD {item?.target_id?.budget}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{ paddingRight: "15px" }}
                      className="align-self-lg-center align-self-end"
                    >
                      <Link
                        to={`${
                          item?.target_id?.role === "Coach"
                            ? "/dashboard/coaches"
                            : "/dashboard/players"
                        }`}
                      >
                        {item?.target_id?.role}
                        {item?.target_id?.role === "Coach" ? "es" : "s"}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center pb-5 ">
            No observed items found
          </div>
        )}
      </div>
    </>
  );
};

export default RecentlyObserved;
