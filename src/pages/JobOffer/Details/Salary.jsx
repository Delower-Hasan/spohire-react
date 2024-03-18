import MapTrifold from "../../../assets/MapTrifold.svg";

const Salary = () => {
  return (
    <div className="description_outline salary mb-5 text-center mb-4">
      <div className="row">
        <div className="col-lg-6 h-100 d-flex flex-column gap-4 justify-content-between">
          {" "}
          <p className="title">Salary (USD)</p>
          <p className="amount">$100,000 - $120,000</p>
          <p className="subtitle">Monthly salary</p>
        </div>
        <div className="col-lg-6 h-100 d-flex flex-column gap-2 justify-content-between align-items-center">
          <img src={MapTrifold} alt="" />
          <p className="location">Job Location</p>
          <p className="subtitle">Dhaka, Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default Salary;
