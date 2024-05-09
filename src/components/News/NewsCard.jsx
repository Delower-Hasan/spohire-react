import React from "react";
import { Link, useLocation } from "react-router-dom";
import RightButton from "../../assets/news/RightButton.png";

const NewsCard = ({ data }) => {
  const path = useLocation();
  const date = new Date(data?.createdAt);
  const currentDate = new Date(); // Current date and time
  const timeDifference = currentDate - date; // Difference in milliseconds
  const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();

  // Depending on the days passed, you might want to format the output differently
  let timePassedString = "";
  if (daysPassed === 0) {
    timePassedString = "today";
  } else if (daysPassed === 1) {
    timePassedString = "1 day ago";
  } else {
    timePassedString = `${daysPassed} days ago`;
  }

  return (
    <>
      <div className="news_card">
        <div className="row">
          <div className="col-lg-7">
            <div className="d-flex gap-5">
              {path.pathname === "/articles" ? (
                ""
              ) : (
                <>
                  <div className="date_wrapper">
                    <h3>{month ? month : "Jan"}</h3>
                    <div className="date_line"></div>
                    <h2>{day ? day : "22"}</h2>
                  </div>
                </>
              )}

              <div
                style={{
                  maxWidth: "770px",
                  width: "100%",
                }}>
                <img
                  className=" img-fluid"
                  src={
                    data?.image
                      ? `${
                          process.env.NODE_ENV !== "production"
                            ? import.meta.env.VITE_LOCAL_API_URL
                            : import.meta.env.VITE_LIVE_API_URL
                        }/api/v1/uploads/${data?.image}`
                      : profileImage
                  }
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card_details">
              <div className="pb-4">
                <h2 className="text-capitalize">{data?.title}</h2>
                <span className="text-black">{timePassedString}</span>
              </div>

              <p
                dangerouslySetInnerHTML={{ __html: data?.short_description }}
              />

              <div className="desc_line"></div>
              <div className="view_morebtn">
                <Link to={`/newsDetails/${data._id}`}>
                  <button>
                    View More <img src={RightButton} alt="RightButton" />{" "}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
