import React, { useState } from "react";
import { setCoachFilterParams } from "../../../features/auth/authSlice";
import { useDispatch } from "react-redux";

function CoachFilter() {
  const dispatch = useDispatch();
  // State object to store the selected values
  const [formData, setFormData] = useState({
    status: "",
    location: "",
    nationality: "",
    gender: "",
    minAge: "",
    maxAge: "",
  });

  // Event handler for status change
  const handleStatusChange = (e) => {
    setFormData({ ...formData, status: e.target.textContent });
  };

  // Event handler for location change
  const handleLocationChange = (e) => {
    setFormData({ ...formData, location: e.target.value });
  };

  // Event handler for nationality change
  const handleNationalityChange = (e) => {
    setFormData({ ...formData, nationality: e.target.value });
  };

  // Event handler for gender change
  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  // Event handler for age change
  const handleAgeChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  // Event handler for applying age filter
  const handleAgeApply = () => {
    dispatch(setCoachFilterParams({ data: formData }));
    console.log("formData", formData);
  };

  return (
    <div>
      {/* Status */}
      <div className="position_wrapper pb-4">
        <h2>Status</h2>
        <div className="position_btn_wrapper status">
          <button onClick={handleStatusChange} value="Bronze"></button>
          <button onClick={handleStatusChange} value="Silver">
            Silver
          </button>
          <button onClick={handleStatusChange} value="Gold">
            Gold
          </button>
        </div>
      </div>

      {/* Location */}
      <div className="position_wrapper pb-4">
        <h2>Location</h2>
        <div className="position_btn_wrapper location">
          <select className="form-select" onChange={handleLocationChange}>
            <option value="">Select</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>

      {/* Nationality */}
      <div className="position_wrapper pb-4">
        <h2>Nationality</h2>
        <div className="position_btn_wrapper location">
          <select className="form-select" onChange={handleNationalityChange}>
            <option value="">Select</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>

      {/* Gender */}
      <div className="position_wrapper pb-4">
        <h2>Gender</h2>
        <div className="position_btn_wrapper location">
          <select className="form-select" onChange={handleGenderChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      {/* Age */}
      <div className="position_wrapper pb-4">
        <h2>Age</h2>
        <div className="position_btn_wrapper age d-flex">
          <input
            type="number"
            placeholder="Min"
            value={formData.minAge}
            onChange={(e) => handleAgeChange(e, "minAge")}
          />
          <input
            type="number"
            placeholder="Max"
            value={formData.maxAge}
            onChange={(e) => handleAgeChange(e, "maxAge")}
          />
          <button onClick={handleAgeApply}>Apply</button>
        </div>
      </div>
    </div>
  );
}

export default CoachFilter;
