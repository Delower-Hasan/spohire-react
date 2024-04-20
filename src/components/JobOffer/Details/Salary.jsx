import MapTrifold from "../../../assets/MapTrifold.svg";

const Salary = ({ data }) => {
  return (
    <div className="description_outline salary mb-5 text-center mb-4">
      <div className="row">
        <div className="col-lg-6 h-100 d-flex flex-column gap-2 justify-content-between">
          <p className="title">Salary (USD)</p>
          {/* <p className="amount">$100,000 - $120,000</p> */}
          <p className="amount">{data?.salary}</p>
          <p className="subtitle">Monthly salary</p>
        </div>

        <div className="col-lg-6 h-100 d-flex flex-column gap-2 justify-content-between align-items-center">
          <img src={MapTrifold} style={{ width: "27px" }} alt="" />
          <p className="location">Job Location</p>
          <p className="subtitle">
            {" "}
            {data?.job_location}, {data?.country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Salary;
