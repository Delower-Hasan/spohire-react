import { useEffect, useState } from "react";
import "./JobOffer.css";
import JobOfferHeader from "./JobOfferHeader";
import MatchesJob from "./MatchesJob";
import { useGetAllJobsQuery } from "../../features/job/jobApi";
const JobOffer = () => {
  const { data: allJobs } = useGetAllJobsQuery();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(allJobs?.data);

  // Function to handle the search
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);

    if (searchValue === "") {
      setFilteredData(allJobs?.data);
      return;
    }
    const filtered = allJobs?.data?.filter((item) =>
      item.job_title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    if (allJobs?.data) {
      setFilteredData(allJobs?.data);
    }
  }, [allJobs?.data]);
  return (
    <>
      <JobOfferHeader searchText={searchText} handleSearch={handleSearch} />
      <MatchesJob filteredData={filteredData} />
    </>
  );
};

export default JobOffer;
