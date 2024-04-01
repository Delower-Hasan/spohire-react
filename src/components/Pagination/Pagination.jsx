/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */

// const Pagination = ({ setCurrentPage, currentPage, totalPages }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   console.log(currentPage, "currentPage");

//   return (
//     <nav aria-label="">
//       <ul classNameName="pagination d-flex justify-content-center gap-3">
//         <li
//           classNameName={`page-item ${currentPage === 1 && "disabled"}`}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//           style={{ cursor: "pointer" }}
//         >
//           <span classNameName="page-link p-0">
//             <i classNameName="fa fa-angle-left"></i>
//           </span>
//         </li>

//         {pageNumbers.map((i) => (
//           <li
//             classNameName={`page-item ${currentPage === i && "active"}`}
//             style={{ cursor: "pointer" }}>
//             <span classNameName="page-link p-0" onClick={() => setCurrentPage(i)}>
//               {i}
//             </span>
//           </li>
//         ))}
//         <li
//           classNameName={`page-item ${currentPage === totalPages && "disabled"}`}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//           style={{ cursor: "pointer" }}
//         >
//           <span classNameName="page-link p-0">
//             {" "}
//             <i classNameName="fa fa-angle-right"></i>
//           </span>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Pagination;

import React from "react";
import LeftArrow from "../../assets/left_arrow.svg";
import RightArrow from "../../assets/right_arrow.svg";

const Pagination = () => {
  return (
    <div className="py-4">
      <nav aria-label="Page navigation example " className="news_pagination">
        <ul
          className="pagination mb-0 d-flex  align-items-center justify-content-center "
          style={{ gap: "20px" }}>
          <li className="">
            <a className="p-0 fs_20 text_clr_49" href="#" aria-label="Previous">
              Page
            </a>
          </li>
          <li className="">
            <a className="page-link p-0 bg-none" href="#" aria-label="Previous">
              <img src={LeftArrow} alt="" />
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link p-0 fs-4 fw-normal" href="#">
              1
            </a>
          </li>

          <li className="">
            <a className="page-link p-0 bg-none" href="#" aria-label="Next">
              <img src={RightArrow} alt="" />
            </a>
          </li>

          <select name="" id="" className="p-3 border-0 bg-none">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
          </select>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
