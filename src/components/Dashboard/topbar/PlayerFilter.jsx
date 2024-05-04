import React, { useState } from "react";
import "./Topbar.css";
import { useDispatch } from "react-redux";
import { setPlayerFilterParams } from "../../../features/auth/authSlice";
function PlayerFilter() {
  const dispatch = useDispatch();
  // State object to store all the values
  const [formData, setFormData] = useState({
    position: "",
    status: "",
    location: "",
    gender: "",
    minAge: "",
    maxAge: "",
    minHeight: "",
    maxHeight: "",
    dominantHand: "",
  });

  // Event handler to update the form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Event handler to apply age filter
  const handleAgeApply = () => {
    console.log("Min Age:", formData.minAge);
    console.log("Max Age:", formData.maxAge);
    // You can perform further actions with the age range values here
  };

  // Event handler to apply height filter
  const handleHeightApply = () => {
    console.log("Min Height:", formData.minHeight);
    console.log("Max Height:", formData.maxHeight);
    // You can perform further actions with the height range values here
  };

  const FilterApplyHandler = () => {
    dispatch(setPlayerFilterParams({ data: formData }));
    console.log("formData", formData);
  };

  return (
    <div>
      {/* Position */}
      <div className="position_wrapper pb-4">
        <h2>Position</h2>
        <div className="position_btn_wrapper">
          <button name="position" onClick={handleChange} value="All">
            All
          </button>
          <button name="position" onClick={handleChange} value="Goalkeeper">
            Goalkeeper
          </button>
          <button name="position" onClick={handleChange} value="Defender">
            Defender
          </button>
          <button name="position" onClick={handleChange} value="Midfielder">
            Midfielder
          </button>
          <button name="position" onClick={handleChange} value="Forward">
            Forward
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="position_wrapper pb-4">
        <h2>Status</h2>
        <div className="position_btn_wrapper status">
          <button name="status" onClick={handleChange} value="Bronze">
            Bronze
          </button>
          <button name="status" onClick={handleChange} value="Silver">
            Silver
          </button>
          <button name="status" onClick={handleChange} value="Gold">
            Gold
          </button>
        </div>
      </div>

      {/* Location */}
      <div className="position_wrapper pb-4">
        <h2>Location</h2>
        <div className="position_btn_wrapper location">
          <select
            className="form-select"
            name="location"
            onChange={handleChange}
          >
            <option defaultValue>Select</option>
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
          <select className="form-select" name="gender" onChange={handleChange}>
            <option defaultValue>Select</option>
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
            name="minAge"
            placeholder="Min"
            onChange={handleChange}
          />
          <input
            type="number"
            name="maxAge"
            placeholder="Max"
            onChange={handleChange}
          />
          <button onClick={handleAgeApply}>Apply</button>
        </div>
      </div>

      {/* Height */}
      <div className="position_wrapper pb-4">
        <h2>Height</h2>
        <div className="position_btn_wrapper age d-flex">
          <input
            type="number"
            name="minHeight"
            placeholder="Min"
            onChange={handleChange}
          />
          <input
            type="number"
            name="maxHeight"
            placeholder="Max"
            onChange={handleChange}
          />
          <button onClick={handleHeightApply}>Apply</button>
        </div>
      </div>

      {/* Dominant hand */}
      <div className="position_wrapper pb-4">
        <h2>Dominant hand</h2>
        <div className="position_btn_wrapper location">
          <select
            className="form-select"
            name="dominantHand"
            onChange={handleChange}
          >
            <option defaultValue>Select</option>
            <option value="Left">Left</option>
            <option value="Right">Right</option>
          </select>
        </div>
      </div>
      <button onClick={FilterApplyHandler}>Apply</button>
    </div>
  );
}

export default PlayerFilter;
