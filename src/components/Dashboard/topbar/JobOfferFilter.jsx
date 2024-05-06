import React, { useEffect, useState } from "react";
import { setFilterParams } from "../../../features/announcement/announcementSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

function JobOfferFilter() {
  const dispatch = useDispatch();
  const [countryNames, setCountryNames] = useState([]);
  // State object to store the selected values
  const [formData, setFormData] = useState({
    location: "",
    category: "",
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
    setFormData({ ...formData, location: e.target.value });
  };

  // Event handler for category change
  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  // Event handler for applying age filter
  const handleAgeApply = () => {
    dispatch(setFilterParams({ data: formData }));
  };
  const handleResetFilter = () => {
    const formDatas = {
      location: "",
      category: "",
    };
    dispatch(setFilterParams({ data: formDatas }));
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
            onChange={handleLocationChange}>
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
        <h2>Categories</h2>
        <div className="position_btn_wrapper location">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleCategoryChange}>
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

      <button onClick={handleAgeApply} className="me-2">
        Apply
      </button>
      <button onClick={handleResetFilter}>Reset</button>
    </div>
  );
}

export default JobOfferFilter;
