import { Link } from "react-router-dom";
import footBallCoachImg from "../../../assets/footballCoach.png";
import threedot from "../../../assets/threedot.png";
import { useGetAllJobsQuery } from "../../../features/job/jobApi";
import React from "react";
import { useSubscriptionCheck } from "../../../hooks/useSubscriptionCheck";

const JobOfferOverview = () => {
  const { data: allJobs } = useGetAllJobsQuery();
  const { isSubscriptionCheck } = useSubscriptionCheck();

  return (
    <>
      <div className="job_offer_overrview_wrapper">
        <div className="d-flex justify-content-between">
          <h4>Job Offers</h4>
          {isSubscriptionCheck && allJobs?.data && allJobs.data?.length > 0 && (
            <Link to="/dashboard/jobOffers">View More</Link>
          )}
        </div>
        {isSubscriptionCheck && allJobs?.data && allJobs?.data?.length > 0 ? (
          allJobs?.data.slice(0, 3).map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="d-flex align-items-center justify-content-between joboffer_ov_wrapper">
                <div key={idx} className="d-flex align-items-center gap-2 ">
                  <div className="job_offer_item_img">
                    <img
                      src={
                        item?.club_logo
                          ? `${
                              process.env.NODE_ENV !== "production"
                                ? import.meta.env.VITE_LOCAL_API_URL
                                : import.meta.env.VITE_LIVE_API_URL
                            }/api/v1/uploads/${item?.club_logo}`
                          : footBallCoachImg
                      }
                      alt="img"
                      style={{
                        height: "47px",
                        width: "47px",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div className="job_offer_item_content">
                    <div className="job_offer_nameDesignation">
                      <h5 className="fw-medium fs-6 text_color_36 mb-1">
                        {item?.job_title}
                      </h5>
                      <p className="fs-14 fw-normal text_color_80 mb-1">
                        {item?.company}
                      </p>
                    </div>
                  </div>
                </div>

                <img
                  style={{ width: "24px", height: "24px" }}
                  src={threedot}
                  alt=""
                />
              </div>
            </React.Fragment>
          ))
        ) : (
          <div className="d-flex justify-content-center py-5">
            No job offers found
          </div>
        )}
      </div>
    </>
  );
};

export default JobOfferOverview;
