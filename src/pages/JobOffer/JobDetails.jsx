/* eslint-disable react/prop-types */
import tennis from "../../assets/tennis.png";
import flag from "../../assets/flag.png";
import dollar from "../../assets/coin-dollar.png";
import location from "../../assets/location.png";
import JobCategory from "./../Announcement/JobCategory";
import { useGetJobByIdQuery } from "../../features/job/jobApi";
import { Link, useParams } from "react-router-dom";
import ApplyJobs from "./ApplyJobs";
import { useSelector } from "react-redux";

const sports = [
  "Coach",
  "Administration",
  "Marketing",
  "betting",
  "Customer service",
  "manager",
  "agent",
  "journalist",
  "scout",
  "referee",
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

const JobDetails = ({ jobId, setSearchParams, searchParams }) => {
  const params = useParams();
  const detailsId = params.id;

  const { data: jobDetails } = useGetJobByIdQuery(detailsId);

  const data = jobDetails?.data;
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container">
      {/* <h3 className="job_matches_title">
                We found <span>300</span> Matches for you
            </h3> */}
      <h3 className="job_matches_title"></h3>
      <div className="row">
        <div className="col-lg-9">
          <div className="matchedJobs_wrapper">
            <div className="d-flex gap-4 align-items-center">
              <div className="tennis_logo">
                <img src={tennis} alt="" />
              </div>
              <div className="tennis_desc">
                <p>{data?.job_title}</p>
                <small>sfsdf</small>
              </div>
            </div>
            <div className="jobs_details">
              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <img src={location} alt="" />
                <span>{data?.job_location}</span>
              </div>
              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <img src={flag} alt="" />
                <span>{data?.workplaceType} </span>
              </div>
              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <img src={dollar} alt="" />
                <span>{data?.salary}</span>
              </div>
            </div>
            {/* description */}
            <div className="job_details_desc">
              <h4> Description</h4>
              <p>{data?.description}.</p>
            </div>
            {user && user?._id === data?.creator ? (
              // (user?.role === "Player" ||
              //   user?.role === "Manager" ||
              //   user?.role === "Coach" ||
              //   user?._id === data?.creator) ? (
              <Link to={`/dashboard/jobApplicants/${detailsId}`}>
                See Applicant
              </Link>
            ) : (
              <button
                className="apply_btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                // onClick={() => setSelectedJob(item?._id)}
              >
                Apply
              </button>
            )}
          </div>
        </div>

        <div className="col-lg-3">
          <JobCategory
            sports={sports}
            country={country}
            jobcategory={jobcategory}
            setSearchParams={setSearchParams}
            searchParams={searchParams}
          />
        </div>
      </div>
      <ApplyJobs user={user} />
    </div>
  );
};

export default JobDetails;
