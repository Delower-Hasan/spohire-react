/* eslint-disable no-unused-vars */
import a1 from "../../../assets/a11.png";
import publishedFlag from "../../../assets/publishedFlag.png";
import dollar from "../../../assets/coin-dollar.png";
import location from "../../../assets/location.png";
import threedot from "../../../assets/threedot.png";
import { Link } from "react-router-dom";
import { useGetAllAnnouncementQuery } from "../../../features/announcement/announcementApi";
import { useSubscriptionCheck } from "../../../hooks/useSubscriptionCheck";
import { ThreeDots } from "react-loader-spinner";

const AnnouncementOverview = () => {
  const { data: allAnnouncements, isLoading } = useGetAllAnnouncementQuery();
  const { isSubscriptionCheck } = useSubscriptionCheck();

  return (
    <>
      <div
        className="job_offer_overrview_wrapper"
        style={{ backgroundColor: "#FDFEFF" }}
      >
        <div className="d-flex justify-content-between">
          <h4>Announcements</h4>
          {isSubscriptionCheck &&
            allAnnouncements?.data &&
            allAnnouncements?.data?.length > 0 && (
              <Link to="/dashboard/announcements">View More</Link>
            )}
        </div>
        {/* list */}
        {isLoading ? (
          <ThreeDots
            visible={true}
            height="8"
            width="100%"
            color="#2B3674"
            ariaLabel="line-wave-loading"
          />
        ) : isSubscriptionCheck &&
          allAnnouncements?.data &&
          allAnnouncements?.data.length > 0 ? (
          allAnnouncements?.data.slice(0, 3).map((item, idx) => (
            <div
              className="announcelist_wrapper1 d-flex  justify-content-between align-items-center"
              style={{ marginTop: "20px" }}
              key={idx}
            >
              <div className="d-flex justify-content-between align-items-start">
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "20px" }}
                >
                  <div className="announcement_pic">
                    <img
                      src={
                        item?.image
                          ? `${
                              process.env.NODE_ENV !== "production"
                                ? import.meta.env.VITE_LOCAL_API_URL
                                : import.meta.env.VITE_LIVE_API_URL
                            }/api/v1/uploads/${item?.image}`
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
                    <p>{item?.title}</p>
                    <div className="d-flex flex-wrap" style={{ gap: "30px" }}>
                      <div
                        className="d-flex align-items-center"
                        style={{ gap: "6px" }}
                      >
                        <img src={location} alt="" />
                        <span>{item?.location}</span>
                      </div>
                      <div
                        className="d-flex align-items-center"
                        style={{ gap: "6px" }}
                      >
                        <img src={publishedFlag} alt="" />
                        <span style={{ color: "#05CD99" }}>
                          {item?.status ? item.status : "Not Published"}
                        </span>
                      </div>
                      <div
                        className="d-flex align-items-center"
                        style={{ gap: "6px" }}
                      >
                        <img src={dollar} alt="" />
                        <span>USD {item?.budget}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <img
                style={{ width: "24px", height: "24px" }}
                src={threedot}
                alt=""
              />
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center py-5">
            No announcement found
          </div>
        )}
      </div>
    </>
  );
};

export default AnnouncementOverview;
