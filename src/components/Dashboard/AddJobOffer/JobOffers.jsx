import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import deleteIcon from "../../../assets/deleteIcon.png";
import dollarIcon from "../../../assets/dollar-icon.svg";
import editIcon from "../../../assets/editIcon.png";
import footBallCoachImg from "../../../assets/footballCoach.png";
import locationIcon from "../../../assets/location-icon.svg";
import {
  useDeleteJobMutation,
  useGetAllJobsQuery,
  useGetJobApplicantsQuery,
} from "../../../features/job/jobApi";
import {
  useGetMyObservationsQuery,
  useToggleObservationMutation,
} from "../../../features/observation/observationApi";
import Pagination from "../../Pagination/Pagination";
import EditJobOffer from "../AddJobOffer/EditJobOffer";
import MobileButtons from "../players/MobileButtons";
import "./jobOffers.css";

const JobOffers = ({ isActive }) => {
  const { data: allJobs } = useGetAllJobsQuery();
  const { user } = useSelector((state) => state.auth);

  const [deleteJob, { isLoading }] = useDeleteJobMutation();

  const [jobOffersType, setJobOffersType] = useState("My");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [filterData, setFilterData] = useState([]);

  const handleEditJobOfferClick = (item) => {
    setIsModalOpen(true);
    setEditingItem(item);
  };
  // close modalo
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const offerTypeFilter = (data) => {
    if (jobOffersType === "My") {
      return data?.creator === user?._id;
    }
  };

  const handleDelete = async (item) => {
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
        const res = await deleteJob(item?._id);
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

  useEffect(() => {
    const filtered =
      isActive === "expired"
        ? allJobs?.data?.filter((u) => u.isActive === false)
        : allJobs?.data?.filter((u) => u.isActive);
    setFilterData(filtered?.filter(offerTypeFilter));
  }, [allJobs?.data, isActive]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filterData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <>
      <div className="job_offer_items_wrapper">
        {filterData && filterData?.length > 0 ? (
          filterData
            .slice(startIndex, endIndex)
            .map((item, index) => (
              <SingleJob
                key={index}
                item={item}
                handleEditJobOfferClick={handleEditJobOfferClick}
                handleDelete={handleDelete}
              />
            ))
        ) : (
          <div
            className="d-flex justify-content-center align-items-center fs-4"
            style={{ height: "70vh" }}
          >
            No job offer
          </div>
        )}
      </div>
      {filterData?.length > itemsPerPage && (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
      <MobileButtons />

      {/* <AddJobOffer /> */}
      <EditJobOffer
        show={isModalOpen}
        onHide={closeModal}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        style={{ width: "648px" }}
        editingItem={editingItem}
      />
    </>
  );
};

export default JobOffers;

function SingleJob({ item, handleEditJobOfferClick, handleDelete }) {
  const { user } = useSelector((state) => state.auth);
  const { data: applicants } = useGetJobApplicantsQuery(item?._id);
  const navigate = useNavigate();
  const handleCLick = (value) => {
    navigate(`/dashboard/jobDetails/${value?._id}`);
  };

  return (
    <>
      <div className="job_offers_item p-3">
        <div className="job_offers_item_content d-flex flex-wrap justify-content-between align-items-center">
          <div className="left d-flex align-items-center gap-3">
            <div className="job_offer_item_img">
              <img
                src={
                  item?.club_logo
                    ? `${
                        process.env.NODE_ENV !== "production"
                          ? import.meta.env.VITE_LOCAL_API_URL
                          : import.meta.env.VITE_LIVE_API_URL
                      }/api/v1/uploads/${item?.club_logo}`
                    : footBallCoachImg
                }
                alt="img"
                style={{
                  height: "81px",
                  width: "81px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>

            <div className="job_offer_item_content">
              <div className="job_offer_nameDesignation">
                <h5
                  className="fw-medium fs-6 text_color_36 mb-1"
                  onClick={() => handleCLick(item)}
                  style={{ cursor: "pointer" }}
                >
                  {item?.job_title}
                </h5>

                <p className="fs-14 fw-normal text_color_80 mb-1">
                  {item?.company}
                </p>
              </div>

              <div className="job_offerItem_address flex-wrap d-flex align-items-center gap-2 gap-md-4">
                <div className="job_offer_location  d-flex align-items-center gap-1">
                  <img src={locationIcon} alt="icon" />
                  <span className="fs-14 fw-normal text_color_80">
                    {item?.job_location}
                  </span>
                </div>
                {/* <div className="job_offer_flag d-flex align-items-center gap-1">
                  <img src={flagIcon} alt="icon" />
                  <span className="fs-14 fw-normal text_color_80">
                    Enlish, Pdish
                  </span>
                </div> */}

                <div className="job_offer_flag d-flex align-items-center gap-1">
                  <img src={dollarIcon} alt="icon" />
                  <span className="fs-14 fw-normal text_color_80">
                    USD {item?.salary}
                  </span>
                </div>
                <div className="job_offer_flag d-flex align-items-center gap-1">
                  <span className="fs-14 fw-normal text_color_80">
                    Applicants: {applicants?.length}
                  </span>
                </div>
                <div className="job_offer_flag d-flex align-items-center gap-1">
                  <Link
                    to={`/dashboard/jobApplicants/${item?._id}`}
                    className="fs-14 fw-normal text-primary"
                  >
                    View Applicant
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="right d-flex gap-2">
            {item?.creator === user?._id && (
              <button
                className="bg-none"
                onClick={() => handleEditJobOfferClick(item)}
              >
                <img src={editIcon} alt="" />
              </button>
            )}
            {item?.creator === user?._id && (
              <button className="bg-none" onClick={() => handleDelete(item)}>
                <img src={deleteIcon} alt="" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
