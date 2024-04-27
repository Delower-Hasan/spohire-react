import React from "react";
import LeftArrow from "../../assets/left_arrow.svg";
import RightArrow from "../../assets/right_arrow.svg";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (e) => {
    setCurrentPage(parseInt(e.target.value));
  };

  return (
    <div className="py-4">
      <nav aria-label="Page navigation example " className="news_pagination">
        <ul
          className="pagination mb-0 d-flex align-items-center justify-content-center"
          style={{ gap: "20px" }}>
          <li>
            <button
              className="p-0 fs_20 text_clr_49"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              aria-label="Previous">
              Page
            </button>
          </li>
          <li>
            <button
              className="page-link p-0 bg-none"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              aria-label="Previous">
              <img src={LeftArrow} alt="" />
            </button>
          </li>
          <li className="page-item active">
            <span className="page-link p-0 fs-4 fw-normal">{currentPage}</span>
          </li>
          <li>
            <button
              className="page-link p-0 bg-none"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              aria-label="Next">
              <img src={RightArrow} alt="" />
            </button>
          </li>
          <li>
            <select
              name=""
              id=""
              className="p-3 border-0 bg-none"
              value={currentPage}
              onChange={handlePageChange}>
              {[...Array(totalPages).keys()].map((page) => (
                <option key={page + 1} value={page + 1}>
                  {page + 1}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
