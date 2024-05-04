import React, { useState } from "react";
import { setFilterParams } from "../../../features/announcement/announcementSlice";
import { useDispatch } from "react-redux";

function AnouncementFilter() {
  const dispatch = useDispatch();
  // State object to store the selected values
  const [formData, setFormData] = useState({
    location: "",
    category: "",
  });

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
    console.log("formData", formData);
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
            <option value="">Select</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
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
            onChange={handleCategoryChange}
          >
            <option value="">Select</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>

      <button onClick={handleAgeApply}>Apply</button>
    </div>
  );
}

export default AnouncementFilter;
