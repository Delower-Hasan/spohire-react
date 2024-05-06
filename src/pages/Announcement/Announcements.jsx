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
        (announceData.category &&
          item?.category?.toLowerCase() ===
            announceData.category?.toLowerCase()) ||
        (announceData.location &&
          item?.country?.toLowerCase() ===
            announceData.location?.toLowerCase()) ||
        (announceData.sport &&
          item?.sports?.toLowerCase() === announceData.sport?.toLowerCase())
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
