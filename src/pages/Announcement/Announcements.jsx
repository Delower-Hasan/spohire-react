import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import "./Announcement.css";
import AnnouncementHeader from "./AnnouncementHeader";
import AnnouncementList from "./AnnouncementList";
import { useGetAllAnnouncementQuery } from "../../features/announcement/announcementApi";

const Announcements = () => {
  const { data: allAnnouncements, isLoading } = useGetAllAnnouncementQuery();
  const [filteredData, setFilteredData] = useState([]);

  const [announceData, setAnnounceData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      const { [name]: removedField, ...rest } = announceData;
      setAnnounceData(rest);
    } else {
      setAnnounceData({ ...announceData, [name]: value });
    }
  };
  useEffect(() => {
    if (allAnnouncements?.data) {
      setFilteredData(allAnnouncements?.data);
    }
  }, [allAnnouncements?.data]);

  useEffect(() => {
    const filtered = allAnnouncements?.data?.filter((item) => {
      return (
        // Category filter
        (announceData.category &&
          item?.category?.toLowerCase() ===
            announceData.category?.toLowerCase()) ||
        (!announceData.category &&
          !announceData.location &&
          !announceData.sport) || // Reset all filters when category is empty
        // Location filter
        (announceData.location &&
          item?.country?.toLowerCase() ===
            announceData.location?.toLowerCase()) ||
        (!announceData.location &&
          !announceData.category &&
          !announceData.sport) || // Reset all filters when location is empty
        // Sport filter
        (announceData.sport &&
          item?.sports?.toLowerCase() === announceData.sport?.toLowerCase()) ||
        (!announceData.sport &&
          !announceData.category &&
          !announceData.location) // Reset all filters when sport is empty
      );
    });
    setFilteredData(filtered);
  }, [announceData]);

  return (
    <>
      <AnnouncementHeader onFiltersChange={handleInputChange} />
      <AnnouncementList filteredData={filteredData} />
    </>
  );
};

export default Announcements;
