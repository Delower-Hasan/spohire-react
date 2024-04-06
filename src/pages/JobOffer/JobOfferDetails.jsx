import DetailsHeader from "../../components/JobOffer/Details/DetailsHeader";
import Description from "../../components/JobOffer/Details/Description";
import Salary from "../../components/JobOffer/Details/Salary";
import JobOverview from "../../components/JobOffer/Details/JobOverview";
import RelatedJob from "../../components/JobOffer/Details/RelatedJob";


const JobOfferDetails = () => {
  return (
    <div>
      <DetailsHeader />
      <div className="container mb-5">
        <div className="row">
          <div className="col-lg-7">

            <Description />

          </div>
          <div className="col-lg-5">
            <Salary />
            <JobOverview />
            <RelatedJob />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOfferDetails;
