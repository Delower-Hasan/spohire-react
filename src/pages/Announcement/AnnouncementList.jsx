// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import a1 from "../../assets/a11.png";
// import flag from "../../assets/flag.png";
// import dollar from "../../assets/coin-dollar.png";
// import location from "../../assets/location.png";
// import JobCategory from "./JobCategory";
// import DeleteModal from "./DeleteModal";
// import { useState } from "react";
// import { useGetAllAnnouncementQuery } from "../../features/announcement/announcementApi";
// import { useSelector } from "react-redux";
// import { setFilterParams } from "../../features/announcement/announcementSlice";
// import AnnouncementFilterCategory from "./AnnouncementFilterCategory";

// const sports = ["Football", "Basketball", "Handball", "Volleyball"];
// const country = [
//   "Paris",
//   "London",
//   "Finland",
//   "Canada",
//   "Canada",
//   "Canada",
//   "Canada",
// ];
// const jobcategory = [
//   "Tournament",
//   "Championship",
//   "Friendly matches",
//   "Camps",
//   "Tournaments",
//   "Player recruitment",
//   "Others",
// ];
// const AnnouncementList = () => {
//   const { data: allAnnouncements, isLoading } = useGetAllAnnouncementQuery();
//   const [sortedItems, setSortedItems] = useState([]);

//   const { filterParams } = useSelector((state) => state.announcement);

//   const handleFilter = (value) => {
//     if (
//       filterParams?.sports?.length > 0 ||
//       filterParams?.country?.length > 0 ||
//       filterParams?.categories?.length > 0
//     ) {
//       return (
//         (filterParams?.sports?.length > 0 &&
//           filterParams?.sports?.includes(value?.sports)) ||
//         (filterParams?.country?.length > 0 &&
//           filterParams?.country?.includes(value?.country)) ||
//         (filterParams?.categories?.length > 0 &&
//           filterParams?.categories?.includes(value?.category))
//       );
//     } else {
//       return true;
//     }
//   };

//   const filteredAnnouncements = allAnnouncements?.data?.filter(handleFilter);

//   return (
//     <>
//       <div
//         className="container"
//         style={{ marginTop: "104px", marginBottom: "150px" }}
//       >
//         <div className="row">
//           <div className="col-lg-9">
//             {/* {allAnnouncements?.data &&
//               allAnnouncements?.data?.length > 0 &&
//               allAnnouncements?.data
//                 ?.filter(handleFilter)
//                 .map((item, index) => {
//                   <SingleAnnouncement key={index} item={item} />
//                 })}
//             {(!allAnnouncements?.data || allAnnouncements?.data?.length === 0) && (
//               <p>No data found</p>
//             )} */}
//             {filteredAnnouncements?.length > 0
//               ? filteredAnnouncements.map((item, index) => (
//                   <SingleAnnouncement key={index} item={item} />
//                 ))
//               : allAnnouncements?.data?.length > 0 && (
//                   <p className="d-flex justify-content-center align-items-center  fs-3">
//                     No data found
//                   </p>
//                 )}
//           </div>
//           <div className="col-lg-3">
//             <AnnouncementFilterCategory
//               setSortedItems={setSortedItems}
//               sortedItems={sortedItems}
//               sports={sports}
//               country={country}
//               jobcategory={jobcategory}
//             />
//           </div>
//         </div>
//       </div>
//       <DeleteModal />
//     </>
//   );
// };

// export default AnnouncementList;

// const SingleAnnouncement = ({ item }) => {
//   const [bookmark, setBookmark] = useState(false);

//   console.log(item, "item");
//   const handleBookmark = () => {
//     setBookmark(!bookmark);
//   };
//   return (
//     <>
//       <div className="announcelist_wrapper">
//         <div className="d-flex justify-content-between align-items-start">
//           <div className="d-flex align-items-center" style={{ gap: "20px" }}>
//             <div className="announcement_pic">
//               <img
//                 src={`${
//                   process.env.NODE_ENV !== "production"
//                     ? import.meta.env.VITE_LOCAL_API_URL
//                     : import.meta.env.VITE_LIVE_API_URL
//                 }/api/v1/uploads/${item?.image}`}
//                 alt=""
//                 style={{
//                   height: "56px",
//                   width: "56px",
//                   borderRadius: "8px",
//                   objectFit: "cover",
//                 }}
//               />
//             </div>
//             <div className="recruiment f_sfPro">
//               <p>{item?.title}</p>
//               <div className="d-flex gap-3 flex-wrap">
//                 <div
//                   className="d-flex align-items-center"
//                   style={{ gap: "6px" }}
//                 >
//                   <img src={location} alt="" />
//                   <span>{item?.location}</span>
//                 </div>
//                 {/* <div
//                   className="d-flex align-items-center"
//                   style={{ gap: "6px" }}
//                 >
//                   <img src={flag} alt="" />
//                   <span>{item?.status}</span>
//                 </div> */}
//                 <div
//                   className="d-flex align-items-center"
//                   style={{ gap: "6px" }}
//                 >
//                   <img src={dollar} alt="" />
//                   <span>USD {item?.budget}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* icon div */}
//           <div className="d-lg-block d-none">
//             {/* <div>
//               <button
//                 className="bg-none"
//                 style={{ width: "20px" }}
//                 onClick={handleBookmark}
//               >
//                 {bookmark ? (
//                   <img src={bookmarkfill} alt="" />
//                 ) : (
//                   <img src={b1} alt="" />
//                 )}
//               </button>
//             </div> */}
//           </div>
//         </div>
//         <p
//           className="announcement_details f_sfPro"
//           style={{
//             display: "-webkit-box",
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//             WebkitLineClamp: 3, // Number of lines to show
//             textOverflow: "ellipsis",
//           }}
//         >
//           {item?.description}
//         </p>
//         <div className="d-flex gap-3 d-lg-none d-block justify-content-end">
//           <button className="bg-none" style={{ color: "#929292" }}>
//             {" "}
//             <i className="fa-regular fa-bookmark"></i>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
import a1 from "../../assets/a11.png";
import flag from "../../assets/flag.png";
import dollar from "../../assets/coin-dollar.png";
import location from "../../assets/location.png";
import bookmark1 from "../../assets/bookmark11.png";
import bookmark2 from "../../assets/bookmark12.svg";
import JobCategory from "./JobCategory";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import { useGetAllAnnouncementQuery } from "../../features/announcement/announcementApi";
import { useSelector } from "react-redux";
import { setFilterParams } from "../../features/announcement/announcementSlice";
import AnnouncementFilterCategory from "./AnnouncementFilterCategory";

const sports = ["Football", "Basketball", "Handball", "Volleyball"];
const country = [
  "Paris",
  "London",
  "Finland",
  "Canada",
  "Canada",
  "Canada",
  "Canada",
];
const jobcategory = [
  "Tournament",
  "Championship",
  "Friendly matches",
  "Camps",
  "Tournaments",
  "Player recruitment",
  "Others",
];
const AnnouncementList = () => {
  const { data: allAnnouncements, isLoading } = useGetAllAnnouncementQuery();
  const [sortedItems, setSortedItems] = useState([]);

  const { filterParams } = useSelector((state) => state.announcement);

  const handleFilter = (value) => {
    if (
      filterParams?.sports?.length > 0 ||
      filterParams?.country?.length > 0 ||
      filterParams?.categories?.length > 0
    ) {
      return (
        (filterParams?.sports?.length > 0 &&
          filterParams?.sports?.includes(value?.sports)) ||
        (filterParams?.country?.length > 0 &&
          filterParams?.country?.includes(value?.country)) ||
        (filterParams?.categories?.length > 0 &&
          filterParams?.categories?.includes(value?.category))
      );
    } else {
      return true;
    }
  };

  const filteredAnnouncements = allAnnouncements?.data?.filter(handleFilter);

  return (
    <>
      <div
        className="container"
        style={{ marginTop: "104px", marginBottom: "150px" }}
      >
        <div className="row">
          <SingleAnnouncement />
          <SingleAnnouncement />
          <SingleAnnouncement />
          <SingleAnnouncement />
          <SingleAnnouncement />
        </div>
      </div>
      <DeleteModal />
    </>
  );
};

export default AnnouncementList;

const SingleAnnouncement = ({ item }) => {
  const [bookmark, setBookmark] = useState(false);

  console.log(item, "item");
  const handleBookmark = () => {
    setBookmark(!bookmark);
  };

  return (<>
    <div className="announcelist_wrapper">
      <div className="d-flex flex-wrap justify-content-between align-items-start">
        <div className="d-flex flex-wrap align-items-center" style={{ gap: "36px" }}>
          <div className="announcement_pic">
            <img
              src={a1}
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
            <p className="title">Player recruitment</p>
            <p className="position">Korner Kick</p>
            <div className="d-flex gap-3 flex-wrap" style={{ marginBottom: "31px" }}>
              <div
                className="d-flex align-items-center"
                style={{ gap: "6px" }}
              >
                <img src={location} alt="" />
                <span>Vegas Street Circuit</span>
              </div>
              {/* <div
                   className="d-flex align-items-center"
                   style={{ gap: "6px" }}
                 >
                   <img src={flag} alt="" />
                   <span>{item?.status}</span>
                 </div> */}
              <div
                className="d-flex align-items-center"
                style={{ gap: "6px" }}
              >
                <img src={dollar} alt="" />
                <span>USD 5000</span>
              </div>
            </div>

            <p className="details">We can't wait to share this milestone with our incredible sports community. Your passion and support have fueled our  journey, and we're  <br /> thrilled to  fueled our take it to the next level together.</p>
          </div>
        </div>
        {/* icon div */}
        <div className="d-lg-block d-none">
          <div>
            <button
              className="bg-none"

              onClick={handleBookmark}
            >
              {bookmark ? (
                <img style={{ width: "23px",height:"30px" }} src={bookmark2} alt="" />
              ) : (
                <img style={{ width: "23px",height:"30px" }} src={bookmark1} alt="" />
              )}
            </button>
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
        }}
      >
        {item?.description}
      </p>
      <div className="d-flex gap-3 d-lg-none d-block justify-content-end">
        <button className="bg-none" style={{ color: "#929292" }}>
          {" "}
          <i className="fa-regular fa-bookmark"></i>
        </button>
      </div>
    </div>
  </>
  );
};
