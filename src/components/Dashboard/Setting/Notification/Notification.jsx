import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import deleteIcon from "../../../../assets/deleteIcon.png";
import {
    useDeleteNotificationMutation,
    useGetMyNotificationsQuery,
} from "../../../../features/notification/notificationApi";
import Pagination from './../../../Pagination/Pagination';
import "./Notification.css";


const Notification = () => {
  const { data } = useGetMyNotificationsQuery();
  const [deleteNotification] = useDeleteNotificationMutation();

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
    const [jobOffersType, setJobOffersType] = useState("All");

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteNotification(item?._id);
        console.log(res, "ddd");
        if (res?.data?.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    // <div style={{ paddingTop: "76px" }}>
    //   <div className="notification_wrapper">
    //     <div className="notification_items">
    //       <h3>Emails</h3>
    //       <div className="d-flex justify-content-between align-items-center w-100 gap-5">
    //         <p>New notifications</p>
    //         <div className="form-check">
    //           <input
    //             className="form-check-input"
    //             type="checkbox"
    //             value=""
    //             id="flexCheckChecked"
    //             defaultChecked={true}
    //           />
    //         </div>
    //       </div>
    //       <div className="d-flex justify-content-between align-items-center w-100 gap-5">
    //         <p>Update Notifications</p>
    //         <div className="form-check">
    //           <input
    //             className="form-check-input"
    //             type="checkbox"
    //             value=""
    //             id="flexCheckChecked"
    //             defaultChecked={true}
    //           />
    //         </div>
    //       </div>
    //       <div className="d-flex justify-content-between align-items-center w-100 gap-5">
    //         <p>Chat Notifications</p>
    //         <div className="form-check">
    //           <input
    //             className="form-check-input"
    //             type="checkbox"
    //             value=""
    //             id="flexCheckChecked"
    //             defaultChecked={true}
    //           />
    //         </div>
    //       </div>
    //       <hr />
    //     </div>

    //     {/* form items */}
    //     <div className="notification_items1">
    //       <h3>From team</h3>
    //       <div className="d-flex justify-content-between align-items-center w-100">
    //         <p>New notifications</p>
    //         <div className="form-check">
    //           <input
    //             className="form-check-input"
    //             type="checkbox"
    //             value=""
    //             id="flexCheckChecked"
    //             defaultChecked={false}
    //           />
    //         </div>
    //       </div>
    //       <div className="d-flex justify-content-between align-items-center w-100 mb-5">
    //         <p>Other Notifications</p>
    //         <div className="form-check">
    //           <input
    //             className="form-check-input"
    //             type="checkbox"
    //             value=""
    //             id="flexCheckChecked"
    //             defaultChecked={false}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     <button className="save_btn">Save Changes</button>
    //   </div>
    // </div>

    <div className="job_offers_wrapper">
      <div className="job_offers_topBtn d-flex align-items-center justify-content-between">
        <div className="job_offers_topBtn_left d-flex gap-4">
          <button
            className={`fs-6 fw-medium text_color_80 ${
              jobOffersType === "All" && "activeBtn"
            }`}
            onClick={() => setJobOffersType("All")}>
            All
          </button>

          <button
            className={`fs-6 fw-medium text_color_80 ${
              jobOffersType === "My" && "activeBtn"
            }`}
            onClick={() => setJobOffersType("My")}>
            My Job Offers
          </button>
        </div>

        {/* <div className="job_offers_topBtn_right">
          <button className="bg-transparent border-0 text_color_fb">
            Clear All
          </button>
        </div> */}
      </div>

      <div className="job_offer_items_wrapper">
        {data && data.length > 0 ? (
          data
            .slice(startIndex, endIndex)
            .map((item, index) => (
              <SingleNotification
                key={index}
                item={item}
                handleDelete={handleDelete}
              />
            ))
        ) : (
          <div
            className="d-flex justify-content-center align-items-center fs-4"
            style={{ height: "70vh" }}>
            No job offer
          </div>
        )}
      </div>
      {data?.length > itemsPerPage && (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
        // <div>fsjkjfsk</div>
      )}

      <Pagination/>
    </div>
  );
};

export default Notification;

function SingleNotification({ item, handleDelete }) {
  const navigate = useNavigate();
  const handleCLick = (value) => {
    // if (value.creator !== user?._id)
    if (value?.type === "Job Applied") {
      // console.log(value, "jfklajlk");
      navigate(`/dashboard/jobApplicants/${value?.jobId}`);
    } else {
      navigate(`/dashboard/messages/${value?.senderId}`);
    }
  };

  return (
    <>
      <div className="job_offers_item p-3">
        <div className="job_offers_item_content d-flex flex-wrap justify-content-between align-items-center">
          <div className="left d-flex align-items-center gap-3">
            <div className="job_offer_item_content">
              <div className="job_offer_nameDesignation">
                <h5
                  className="fw-medium fs-5 text_clr_e7 mb-1"
                  onClick={() => handleCLick(item)}
                  style={{ cursor: "pointer" }}>
                  {item?.type}
                </h5>

                <p
                  className="fs-14 fw-normal text_color_80 mb-1"
                  style={{ color: "#8593BC" }}>
                  {item?.message}
                </p>
              </div>
            </div>
          </div>
          <div className="right d-flex gap-2">
            <button className="bg-none" onClick={() => handleDelete(item)}>
              <img src={deleteIcon} alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
