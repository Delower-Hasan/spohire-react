import dollar from "../../assets/coin-dollar.png";
import flag from "../../assets/flag.png";
import location from "../../assets/location.png";
import tennis from "../../assets/tennis.png";

const SingleJobs = ({ handleDetails, item }) => {
  return (
    <>
      <div className="announcelist_wrapper">
        <div>
          <div
            className="d-flex align-items-center"
            style={{ gap: "20px", marginBottom: "20px " }}>
            <div className="announcement_pic">
              <img
                src={
                  item?.club_logo
                    ? `${
                        process.env.NODE_ENV !== "production"
                          ? import.meta.env.VITE_LOCAL_API_URL
                          : import.meta.env.VITE_LIVE_API_URL
                      }/api/v1/uploads/${item?.club_logo}`
                    : tennis
                }
                alt=""
                style={{
                  height: "80px",
                  width: "80px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="recruiment">
              <p>{item.job_title}</p>
              <small>{item.company}</small>
            </div>
          </div>
          <div className="d-flex gap-3 flex-wrap detail_span">
            <div className="d-flex align-items-center" style={{ gap: "6px" }}>
              <img
                style={{ width: "20px", height: "20px" }}
                src={location}
                alt=""
              />
              <span>{item.job_location}</span>
            </div>
            <div className="d-flex align-items-center" style={{ gap: "6px" }}>
              <img
                style={{ width: "20px", height: "20px" }}
                src={flag}
                alt=""
              />
              <span>{item.jobType}</span>
            </div>
            <div className="d-flex align-items-center" style={{ gap: "6px" }}>
              <img
                style={{ width: "20px", height: "20px" }}
                src={dollar}
                alt=""
              />
              <span>{item.salary}</span>
            </div>
          </div>
        </div>
        <p
          className="announcement_details f_sfPro"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 3,
            textOverflow: "ellipsis",
          }}>
          {item.description}
        </p>
        <div className="jobOpen_btn">
          <button onClick={() => handleDetails(1)}>Open</button>
        </div>
        <div className="d-flex gap-3 d-lg-none d-block justify-content-end">
          <button className="bg-none" style={{ color: "#929292" }}>
            <i className="fa-regular fa-bookmark"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleJobs;
