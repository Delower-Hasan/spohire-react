import DetailsHeader from "../../components/JobOffer/Details/DetailsHeader";
import Description from "../../components/JobOffer/Details/Description";
import Salary from "../../components/JobOffer/Details/Salary";
import JobOverview from "../../components/JobOffer/Details/JobOverview";
import RelatedJob from "../../components/JobOffer/Details/RelatedJob";
import { useParams } from "react-router-dom";
import {
  useGetJobByIdQuery,
  useGetMyAppliedJobsQuery,
} from "../../features/job/jobApi";
import {
  useGetMyObservationsQuery,
  useToggleObservationMutation,
} from "../../features/observation/observationApi";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const JobOfferDetails = () => {
  const { id } = useParams();
  const { data: jobDetails } = useGetJobByIdQuery(id);
  const { data: appliedJobs } = useGetMyAppliedJobsQuery();

  // console.log("appliedJobs", appliedJobs);
  const { user } = useSelector((state) => state.auth);
  const { data: myJobs, isSuccess } = useGetMyObservationsQuery();

  const isBookmarked = myJobs?.data?.find(
    (i) => i?.target_id?._id === jobDetails?.data?._id
  );

  const [toggleObservation, { isLoading }] = useToggleObservationMutation();

  const handleBookmark = async (id) => {
    const data = {
      user_id: user?._id,
      target_id: id,
      target_type: "Job",
    };

    try {
      const response = await toggleObservation(data);
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Successsful!",
          text: "Job bookmarked successfully!",
        });
      }
      if (response?.error?.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response?.error?.data?.message}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    }
  };

  const isApplied = appliedJobs?.some((item) => item.job._id === id);

  const isCreator = jobDetails?.data.creator === user?._id;

  return (
    <div>
      <DetailsHeader
        data={jobDetails?.data}
        isBookmarked={isBookmarked}
        handleBookmark={handleBookmark}
        isApplied={isApplied}
        isCreator={isCreator}
      />
      <div className="container mb-5">
        <div className="row">
          <div className="col-lg-7">
            <Description data={jobDetails?.data} />
          </div>
          <div className="col-lg-5">
            <Salary data={jobDetails?.data} />
            <JobOverview data={jobDetails?.data} />
            <RelatedJob
              data={jobDetails?.data}
              isBookmarked={isBookmarked}
              handleBookmark={handleBookmark}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOfferDetails;
