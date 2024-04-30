import React from "react";
import { useGetAllAnnouncementQuery } from "../../features/announcement/announcementApi";
import DeleteModal from "./DeleteModal";
import SingleAnnouncement from "./SingleAnnouncement";

const AnnouncementList = ({ filters }) => {
  const { data: allAnnouncements, isLoading } = useGetAllAnnouncementQuery();

  const applyFilters = (announcement) => {
    const { sport, location, category } = filters;
    return (
      (!sport || announcement.sport === sport) &&
      (!location || announcement.location === location) &&
      (!category || announcement.category === category)
    );
  };

  const filteredAnnouncements = allAnnouncements?.data?.filter(applyFilters);

  return (
    <>
      <div
        className="container"
        style={{ marginTop: "104px", marginBottom: "150px" }}>
        <div className="row">
          {filteredAnnouncements?.length > 0 ? (
            filteredAnnouncements.map((item, index) => (
              <SingleAnnouncement key={index} item={item} />
            ))
          ) : (
            <p className="d-flex justify-content-center align-items-center fs-3">
              No data found
            </p>
          )}
        </div>
      </div>
      <DeleteModal />
    </>
  );
};

export default AnnouncementList;
