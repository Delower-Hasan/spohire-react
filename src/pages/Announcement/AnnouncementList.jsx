import React from "react";
import { useGetAllAnnouncementQuery } from "../../features/announcement/announcementApi";
import DeleteModal from "./DeleteModal";
import SingleAnnouncement from "./SingleAnnouncement";

const AnnouncementList = ({ filteredData }) => {
  return (
    <>
      <div
        className="container"
        style={{ marginTop: "104px", marginBottom: "150px" }}
      >
        <div className="row">
          {filteredData?.length > 0 ? (
            filteredData.map((item, index) => (
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
