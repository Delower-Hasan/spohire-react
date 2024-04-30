import { useState } from "react";
import a1 from "../../assets/a11.png";
import flag from "../../assets/flag.png";
import dollar from "../../assets/coin-dollar.png";
import location from "../../assets/location.png";
import bookmark1 from "../../assets/bookmark11.png";
import bookmark2 from "../../assets/bookmark12.svg";
import JobCategory from "./JobCategory";

const SingleAnnouncement = ({ item }) => {
  const [bookmark, setBookmark] = useState(false);

  console.log(item, "item");

  const handleBookmark = () => {
    setBookmark(!bookmark);
  };

  return (
    <>
      <div className="announcelist_wrapper">
        <div className="d-flex flex-wrap justify-content-between align-items-start">
          <div
            className="d-flex flex-nowrap align-items-center"
            style={{ gap: "36px" }}>

            <div className="announcement_pic">
              <img
                src={item.image}
                alt=""
                style={{
                  height: "213px",
                  width: "213px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="recruiment f_sfPro">
              <p className="title">{item.title}</p>
              <p className="position">{item.sports}</p>
              <div
                className="d-flex gap-3 flex-wrap"
                style={{ marginBottom: "31px" }}>
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "6px" }}>
                  <img src={location} alt="" />
                  <span>{item.location}</span>
                </div>
                {/* <div
                   className="d-flex align-items-center"
                   style={{ gap: "6px" }}
                 >
                   <img src={flag} alt="" />
                   <span>{item?.status}</span>
                 </div> */}
                <div
                  className="d-flex  align-items-center"
                  style={{ gap: "6px" }}>
                  <img src={dollar} alt="" />
                  <span>USD {item.budget}</span>
                </div>
              </div>

              <p className="details">{item.description}</p>
            </div>
          </div>
          {/* icon div */}
          <div className="d-lg-block d-none">
            <div>
              <button className="bg-none" onClick={handleBookmark}>
                {bookmark ? (
                  <img
                    style={{ width: "23px", height: "30px" }}
                    src={bookmark2}
                    alt=""
                  />
                ) : (
                  <img
                    style={{ width: "23px", height: "30px" }}
                    src={bookmark1}
                    alt=""
                  />
                )}
              </button>
            </div>
          </div>
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

export default SingleAnnouncement;
