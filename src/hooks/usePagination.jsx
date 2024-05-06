import { useState } from "react";

function usePagination(data, itemsPerPage = 5) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  // Calculate index range for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice data array to display only relevant items for current page
  const displayedData = data?.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    displayedData,
    handlePageChange,
  };
}

export default usePagination;
