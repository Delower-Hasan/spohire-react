/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllJobsQuery } from "../../features/job/jobApi";
import ApplyJobs from "./ApplyJobs";
import SingleJobs from "./SingleJobs";
import Pagination from "../../components/Pagination/Pagination";

const MatchesJob = ({ filteredData }) => {
  const navigate = useNavigate();
  const { data: allJobs } = useGetAllJobsQuery();
  const [selectedJob, setSelectedJob] = useState(null);
  const { user } = useSelector((state) => state.auth);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // const totalPages = Math.ceil(data?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleDetails = (jobId) => {
    if (user) {
      navigate(`/jobDetails/${jobId}`);
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

      {filteredData?.length > 0 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          // totalPages={totalPages}
        />
        // <div>fsjkjfsk</div>
      )}

      {/* <Pagination /> */}
    </>
  );
};

export default MatchesJob;
