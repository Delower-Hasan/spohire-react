/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllJobsQuery } from "../../features/job/jobApi";
import ApplyJobs from "./ApplyJobs";
import SingleJobs from "./SingleJobs";

const MatchesJob = ({ filteredData }) => {
  const navigate = useNavigate();
  const { data: allJobs } = useGetAllJobsQuery();
  const [selectedJob, setSelectedJob] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const handleDetails = (jobId) => {
    if (user) {
      navigate(`/dashboard/jobDetails/${jobId}`);
      console.log("details page for job ID:", jobId);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {/* fasdfsadf */}
      <div className="container">
        <h3 className="job_matches_title">
          We found{" "}
          <span style={{ color: "#05CD99" }}>{filteredData?.length}</span> Job
          Offers for you
        </h3>
        <div className="row">
          {filteredData?.length > 0 ? (
            filteredData?.map((item, index) => (
              <div className="col-lg-4" key={index}>
                <SingleJobs item={item} handleDetails={handleDetails} />
              </div>
            ))
          ) : (
            <p>No matching jobs found</p>
          )}
        </div>
      </div>
      <ApplyJobs selectedJob={selectedJob} user={user} />
    </>
  );
};

export default MatchesJob;
