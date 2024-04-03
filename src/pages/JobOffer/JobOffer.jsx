import { useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import "./JobOffer.css";
import JobOfferHeader from "./JobOfferHeader";
import MatchesJob from "./MatchesJob";
const JobOffer = () => {
  const [filterItems, setFilterItems] = useState({});
  const [searchParams, setSearchParams] = useState({});

  return (
    <>
      <JobOfferHeader
        setFilterItems={setFilterItems}
        filterItems={filterItems}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
      <MatchesJob
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />



    </>
  );
};

export default JobOffer;
