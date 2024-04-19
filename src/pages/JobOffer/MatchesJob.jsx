/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dollar from "../../assets/coin-dollar.png";
import flag from "../../assets/flag.png";
import location from "../../assets/location.png";
import tennis from "../../assets/tennis.png";
import Pagination from "../../components/Pagination/Pagination";
import { useGetAllJobsQuery } from "../../features/job/jobApi";
import ApplyJobs from "./ApplyJobs";
const sports = [
  "Coach",
  "Administration",
  "Marketing",
  "Betting",
  "Customer service",
  "Manager",
  "Agent",
  "Journalist",
  "Scout",
  "Referee",
];
const country = [
  "Paris",
  "London",
  "Finland",
  "Canada ",
  "Paris",
  "London",
  "Finland",
  "Canada ",
  "Paris",
  "London",
  "Finland",
  "Canada ",
  "Paris",
  "London",
  "Finland",
  "Canada ",
  "Paris",
  "London",
  "Finland",
  "Canada ",
  "Paris",
  "London",
  "Finland",
  "Canada ",
];
const jobcategory = [
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Other",
];

const MatchesJob = ({ searchParams, setSearchParams }) => {
  const navigate = useNavigate();
  const { data: allJobs } = useGetAllJobsQuery();
  const [selectedJob, setSelectedJob] = useState(null);
  const { user } = useSelector((state) => state.auth);

  // console.log(searchParams, "paramsssss");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(allJobs?.data?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredJobs = allJobs?.data?.filter((value) => {
    if (
      searchParams?.jobTitle ||
      searchParams?.jobLocation?.length > 0 ||
      searchParams?.jobType?.length > 0 ||
      searchParams?.jobTypeCate?.length > 0
    ) {
      return (
        (searchParams.jobTitle &&
          value?.job_title
            .toLowerCase()
            .includes(searchParams.jobTitle.toLowerCase())) ||
        (searchParams.jobLocation?.length > 0 &&
          searchParams.jobLocation?.includes(value?.country)) ||
        (searchParams.jobType?.length > 0 &&
          searchParams.jobType.includes(value?.role)) ||
        (searchParams?.jobTypeCate?.length > 0 &&
          searchParams?.jobTypeCate.includes(value?.jobType))
      );
    } else {
      return true;
    }
    // return true;
  });

  console.log(allJobs, "jooobbbb");

  const handleDetails = (jobId) => {
    navigate(`/dashboard/jobDetails/${jobId}`);
    console.log("details page for job ID:", jobId);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };


  // const handleClick = () => {
  //   Swal.fire({
  //     icon: "error",
  //     title: "Oops...",
  //     text: `You are a ${user?.role}. You are not permitted to apply for the job!`,
  //   });
  //   console.log("details page for job ID:", jobId);
  // };

  return (
    <>
      <div className="container">
        <h3 className="job_matches_title">
          We found <span style={{ color: "#05CD99" }}>300</span> Job Offers for
          you
        </h3>
        <div className="row">
          {[1, 2, 3, 4, 4, 5, 6, 7, 8].map(() => (
            <div className="col-lg-4">
              <SingleJobs handleDetails={handleDetails} />
            </div>
          ))}

          {/* pagination */}

          {filteredJobs?.length > itemsPerPage && (
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
      <ApplyJobs selectedJob={selectedJob} user={user} />
    </>
  );
};

export default MatchesJob;

const SingleJobs = ({ handleDetails }) => {
  return (
    <>
      <div className="announcelist_wrapper">
        <div>
          <div
            className="d-flex align-items-center"
            style={{ gap: "20px", marginBottom: "20px " }}>
            <div className="announcement_pic">
              <img
                src={tennis}
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
              <p>Senior UX Designer </p>
              <small>HCL Company</small>
            </div>
          </div>
          <div className="d-flex gap-3 flex-wrap detail_span">
            <div className="d-flex align-items-center" style={{ gap: "6px" }}>
              <img
                style={{ width: "20px", height: "20px" }}
                src={location}
                alt=""
              />
              <span>Bari, Haly</span>
            </div>
            <div className="d-flex align-items-center" style={{ gap: "6px" }}>
              <img
                style={{ width: "20px", height: "20px" }}
                src={flag}
                alt=""
              />
              <span>Remote</span>
            </div>
            <div className="d-flex align-items-center" style={{ gap: "6px" }}>
              <img
                style={{ width: "20px", height: "20px" }}
                src={dollar}
                alt=""
              />
              <span>Undisclosed Salary</span>
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
          Learn various UI UX Design materials including UX Research, UI Design,
          UX Writing, and Product Design for 4.5 months with professionals
          product designer practitioners.
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

// /* eslint-disable react/prop-types */
// import tennis from "../../assets/tennis.png";
// import flag from "../../assets/flag.png";
// import dollar from "../../assets/coin-dollar.png";
// import location from "../../assets/location.png";
// import ApplyJobs from "./ApplyJobs";
// import { useGetAllJobsQuery } from "../../features/job/jobApi";
// import { useState } from "react";
// import JobCategory from "../Announcement/JobCategory";
// import { useNavigate } from "react-router-dom";
// import Pagination from "../../components/Pagination/Pagination";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";
// const sports = [
//   "Coach",
//   "Administration",
//   "Marketing",
//   "Betting",
//   "Customer service",
//   "Manager",
//   "Agent",
//   "Journalist",
//   "Scout",
//   "Referee",
// ];
// const country = [
//   "Paris",
//   "London",
//   "Finland",
//   "Canada ",
//   "Paris",
//   "London",
//   "Finland",
//   "Canada ",
//   "Paris",
//   "London",
//   "Finland",
//   "Canada ",
//   "Paris",
//   "London",
//   "Finland",
//   "Canada ",
//   "Paris",
//   "London",
//   "Finland",
//   "Canada ",
//   "Paris",
//   "London",
//   "Finland",
//   "Canada ",
// ];
// const jobcategory = [
//   "Full-time",
//   "Part-time",
//   "Contract",
//   "Temporary",
//   "Other",
// ];

// const MatchesJob = ({ searchParams, setSearchParams }) => {
//   const navigate = useNavigate();
//   const { data: allJobs } = useGetAllJobsQuery();
//   const [selectedJob, setSelectedJob] = useState(null);
//   const { user } = useSelector((state) => state.auth);

//   // console.log(searchParams, "paramsssss");

//   // pagination
//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 10;

//   const totalPages = Math.ceil(allJobs?.data?.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   const filteredJobs = allJobs?.data?.filter((value) => {
//     if (
//       searchParams?.jobTitle ||
//       searchParams?.jobLocation?.length > 0 ||
//       searchParams?.jobType?.length > 0 ||
//       searchParams?.jobTypeCate?.length > 0
//     ) {
//       return (
//         (searchParams.jobTitle &&
//           value?.job_title
//             .toLowerCase()
//             .includes(searchParams.jobTitle.toLowerCase())) ||
//         (searchParams.jobLocation?.length > 0 &&
//           searchParams.jobLocation?.includes(value?.country)) ||
//         (searchParams.jobType?.length > 0 &&
//           searchParams.jobType.includes(value?.role)) ||
//         (searchParams?.jobTypeCate?.length > 0 &&
//           searchParams?.jobTypeCate.includes(value?.jobType))
//       );
//     } else {
//       return true;
//     }
//     // return true;
//   });

//   console.log(allJobs, "jooobbbb");

//   const handleDetails = (jobId) => {
//     navigate(`/jobOffer/jobDetails/${jobId}`);
//     console.log("details page for job ID:", jobId);
//     window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//   };

//   // const handleClick = () => {
//   //   Swal.fire({
//   //     icon: "error",
//   //     title: "Oops...",
//   //     text: `You are a ${user?.role}. You are not permitted to apply for the job!`,
//   //   });
//   //   console.log("details page for job ID:", jobId);
//   // };

//   return (
//     <>
//       <div className="container">
//         <h3 className="job_matches_title">
//           We found <span>{filteredJobs?.length}</span> Matches for you
//         </h3>
//         <div className="row">
//           <>
//             <div className="col-lg-9">
//               <div className="row">
//                 {allJobs?.data &&
//                   allJobs?.data?.length > 0 &&
//                   filteredJobs?.slice(startIndex, endIndex).map((item, idx) => (
//                     <div className="col-lg-6" key={idx}>
//                       <div className="matchedJobs_wrapper">
//                         <div className="d-flex gap-4 align-items-center">
//                           <div className="tennis_logo">
//                             <img
//                               src={`${
//                                 process.env.NODE_ENV !== "production"
//                                   ? import.meta.env.VITE_LOCAL_API_URL
//                                   : import.meta.env.VITE_LIVE_API_URL
//                               }/api/v1/uploads/${item?.club_logo}`}
//                               alt=""
//                               style={{
//                                 objectFit: "cover",
//                                 borderRadius: "8px",
//                               }}
//                             />
//                           </div>
//                           <div className="tennis_desc">
//                             <p>{item?.job_title}</p>
//                             <small>{item?.company}</small>
//                           </div>
//                         </div>
//                         <div className="jobs_details">
//                           <div
//                             className="d-flex align-items-center"
//                             style={{ gap: "10px" }}
//                           >
//                             <img src={location} alt="" />
//                             <span>{item?.job_location}</span>
//                           </div>
//                           <div
//                             className="d-flex align-items-center"
//                             style={{ gap: "10px" }}
//                           >
//                             <img src={flag} alt="" />
//                             <span>{item?.jobType} </span>
//                           </div>
//                           <div
//                             className="d-flex align-items-center"
//                             style={{ gap: "10px" }}
//                           >
//                             <img src={dollar} alt="" />
//                             <span>{item?.salary}</span>
//                           </div>
//                         </div>
//                         <div className="job_details">
//                           {" "}
//                           {item.description}
//                           <button
//                             className="ps-2"
//                             onClick={() => handleDetails(item._id)}
//                           >
//                             {" "}
//                             Learn More
//                           </button>
//                         </div>

//                         {/* {user &&
//                         (user?.role === "Player" ||
//                           user?.role === "Manager" ||
//                           user?.role === "Coach") ? (
//                           <button className="apply_btn" onClick={handleClick}>
//                             Apply
//                           </button>
//                         ) : ( */}
//                         <button
//                           className="apply_btn"
//                           data-bs-toggle="modal"
//                           data-bs-target="#exampleModal"
//                           onClick={() => setSelectedJob(item)}
//                           disabled={item?.creator === user?._id || !user}
//                         >
//                           Apply
//                         </button>
//                         {/* // )} */}
//                       </div>
//                     </div>
//                   ))}
//               </div>

//               {/* pagination */}
//               {filteredJobs?.length > itemsPerPage && (
//                 <Pagination
//                   setCurrentPage={setCurrentPage}
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                 />
//               )}
//             </div>
//           </>
//           <div className="col-lg-3">
//             <JobCategory
//               sports={sports}
//               country={country}
//               jobcategory={jobcategory}
//               setSearchParams={setSearchParams}
//               searchParams={searchParams}
//             />
//           </div>
//         </div>
//       </div>
//       <ApplyJobs selectedJob={selectedJob} user={user} />
//     </>
//   );
// };

// export default MatchesJob;
