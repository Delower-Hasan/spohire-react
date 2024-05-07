import React, { useEffect, useState } from "react";
// import { setFilterParams } from "../../../features/announcement/announcementSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setJobFilterParams } from "../../../features/job/jobSlice";

function JobOfferFilter() {
  const dispatch = useDispatch();
  const [countryNames, setCountryNames] = useState([]);
  // State object to store the selected values
  const [formData, setFormData] = useState({
    jobType: "",
    JobLocation: "",
    workplaceType: "",
  });

  useEffect(() => {
    axios
      .get(
        "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json"
      )
      .then(function (response) {
        setCountryNames(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // Event handler for location change
  const handleLocationChange = (e) => {
    setFormData({ ...formData, JobLocation: e.target.value });
  };

  // Event handler for category change
  const handleJobTypeChange = (e) => {
    setFormData({ ...formData, jobType: e.target.value });
  };
  // Event handler for category change
  const handleWorkplaceTypeChange = (e) => {
    setFormData({ ...formData, workplaceType: e.target.value });
  };

  // Event handler for applying age filter
  const handleAgeApply = () => {
    dispatch(setJobFilterParams({ data: formData }));
  };
  const handleResetFilter = () => {
    const formDatas = {
      jobType: "",
      JobLocation: "",
      jobCategory: "",
    };
    dispatch(setJobFilterParams({ data: formDatas }));
    setFormData(formDatas);
  };

  return (
    <div>
      {/* Location */}
      <div className="position_wrapper pb-4">
        <h2>Location</h2>
        <div className="position_btn_wrapper location">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleLocationChange}
          >
            {countryNames.map((name, index) => (
              <option value={name.name} key={index}>
                {name.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Categories */}
      <div className="position_wrapper pb-4">
        <h2>job Type</h2>
        <div className="position_btn_wrapper location">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleJobTypeChange}
          >
            <option disabled selected>
              Select
            </option>
            {["Full-time", "Part-time", "Contract", "Temporary"].map(
              (item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      <div className="position_wrapper pb-4">
        <h2>Workplace Type</h2>
        <div className="position_btn_wrapper location">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleWorkplaceTypeChange}
          >
            <option disabled selected>
              Select
            </option>
            {["On-site", "Hybrid", "Remote"].map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={handleAgeApply} className="me-2">
        Apply
      </button>
      <button onClick={handleResetFilter}>Reset</button>
    </div>
  );
}

export default JobOfferFilter;
