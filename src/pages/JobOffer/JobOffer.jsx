import { useCallback, useEffect, useState } from "react";
import { useGetAllJobsQuery } from "../../features/job/jobApi";
import "./JobOffer.css";
import JobOfferHeader from "./JobOfferHeader";
import MatchesJob from "./MatchesJob";
const JobOffer = () => {
  const { data: allJobs } = useGetAllJobsQuery();

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(allJobs?.data);
  const [categories, setCategories] = useState([]);

  const [jobData, setJobData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setJobData({ ...jobData, [name]: value });
  };

  useEffect(() => {
    const filtered = allJobs?.data?.filter(
      (item) =>
        item?.category?.toLowerCase() === jobData.category?.toLowerCase() ||
        item?.country?.toLowerCase() === jobData.location?.toLowerCase() ||
        item?.jobType?.toLowerCase() === jobData.jobType?.toLowerCase()
    );
    // .filter(filterByDate);
    setFilteredData(filtered);
  }, [jobData]);

  const filterByDate = (item) => {
    const currentDate = new Date();
    const createdAtDate = new Date(item?.createdAt);

    switch (jobData.postedAt?.trim()) {
      case "Past 24 hours":
        return currentDate - createdAtDate < 24 * 60 * 60 * 1000;
      case "Last week":
        return currentDate - createdAtDate < 7 * 24 * 60 * 60 * 1000;
      case "Last month":
        return currentDate - createdAtDate < 30 * 24 * 60 * 60 * 1000;
      default:
        return false;
    }
  };

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
      <JobOfferHeader
        searchText={searchText}
        handleSearch={handleSearch}
        handleInputChange={handleInputChange}
      />
      <MatchesJob filteredData={filteredData} />
    </>
  );
};

export default JobOffer;
