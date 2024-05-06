import React, { useState } from "react";
import { useGetAllAnnouncementQuery } from "../../features/announcement/announcementApi";
import DeleteModal from "./DeleteModal";
import SingleAnnouncement from "./SingleAnnouncement";
import Pagination from "../../components/Pagination/Pagination";
import usePagination from "../../hooks/usePagination";

const AnnouncementList = ({ filteredData }) => {
  const { currentPage, setCurrentPage, totalPages, displayedData, handlePageChange } = usePagination(filteredData);

  return (
    <>
      <div
        className="container"
        style={{ marginTop: "104px", marginBottom: "150px" }}
      >
        <div className="row">
          {displayedData?.length > 0 ? (
            displayedData.map((item, index) => (
              <SingleAnnouncement key={index} item={item} />
            ))
          ) : (
            <p className="d-flex justify-content-center align-items-center fs-3">
              No data found
            </p>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <DeleteModal />
    </>
  );
};

export default AnnouncementList;
