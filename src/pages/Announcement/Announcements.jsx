import Pagination from "../../components/Pagination/Pagination";
import "./Announcement.css";
import AnnouncementHeader from "./AnnouncementHeader";
import AnnouncementList from "./AnnouncementList";

const Announcements = () => {
  return (
    <>
      <AnnouncementHeader />
      <AnnouncementList />
    </>
  );
};

export default Announcements;
