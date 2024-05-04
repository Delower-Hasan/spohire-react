import { useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import "./Announcement.css";
import AnnouncementHeader from "./AnnouncementHeader";
import AnnouncementList from "./AnnouncementList";

const Announcements = () => {
  const [filters, setFilters] = useState({});

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <AnnouncementHeader onFiltersChange={handleFiltersChange} />
      <AnnouncementList filters={filters} />
    </>
  );
};

export default Announcements;
