import { useCallback, useEffect, useState } from "react";
import { useGetAllJobsQuery } from "../../features/job/jobApi";
import "./JobOffer.css";
import JobOfferHeader from "./JobOfferHeader";
import MatchesJob from "./MatchesJob";
const JobOffer = () => {
  const { data: allJobs } = useGetAllJobsQuery();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [jobData, setJobData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      const { [name]: removedField, ...rest } = jobData;
      setJobData(rest);
    } else {
      setJobData({ ...jobData, [name]: value });
    }
  };

  const filterByDate = (item) => {
    const currentDate = new Date();
    const createdAtDate = new Date(item?.createdAt);
    switch (jobData.postedAt?.trim()) {
      case "Past 24 hours":
        return currentDate - createdAtDate < 24 * 60 * 60 * 1000 ? item : null;
      case "Last week":
        return currentDate - createdAtDate < 7 * 24 * 60 * 60 * 1000
          ? item
          : null;
      case "Last month":
        return currentDate - createdAtDate < 30 * 24 * 60 * 60 * 1000
          ? item
          : null;
      default:
        null;
    }
  };

  useEffect(() => {
    const filtered = allJobs?.data?.filter((item) => {
      return (
        // Category filter
        (jobData.category &&
          item?.category?.toLowerCase() === jobData.category?.toLowerCase()) ||
        (!jobData.category &&
          !jobData.location &&
          !jobData.jobType &&
          !jobData.workplaceType) || // Reset all filters when category is empty
        // Location filter
        (jobData.location &&
          item?.country?.toLowerCase() === jobData.location?.toLowerCase()) ||
        (!jobData.location &&
          !jobData.category &&
          !jobData.jobType &&
          !jobData.workplaceType) || // Reset all filters when location is empty
        // Job Type filter
        (jobData.jobType &&
          item?.jobType?.toLowerCase() === jobData.jobType?.toLowerCase()) ||
        (!jobData.jobType &&
          !jobData.category &&
          !jobData.location &&
          !jobData.workplaceType) || // Reset all filters when jobType is empty
        // Workplace Type filter
        (jobData.workplaceType &&
          item?.workplaceType?.toLowerCase() ===
            jobData.workplaceType?.toLowerCase()) ||
        (!jobData.workplaceType &&
          !jobData.category &&
          !jobData.location &&
          !jobData.jobType) || // Reset all filters when workplaceType is empty
        filterByDate(item)
      );
    });
    setFilteredData(filtered);
  }, [jobData]);

  useEffect(() => {
    setFilteredData(allJobs?.data);
  }, [allJobs?.data]);

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

  return (
    <>
      <JobOfferHeader
        searchText={searchText}
        handleSearch={handleSearch}
        handleInputChange={handleInputChange}
      />
      <MatchesJob filteredData={filteredData?.length > 0 && filteredData} />
    </>
  );
};

export default JobOffer;
