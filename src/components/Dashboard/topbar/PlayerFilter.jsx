import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPlayerFilterParams } from "../../../features/auth/authSlice";
import "./Topbar.css";

function PlayerFilter() {
  const dispatch = useDispatch();
  const [countryNames, setCountryNames] = useState([]);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleApplyFilter = () => {
    dispatch(setPlayerFilterParams({ data: formData }));
  };
  const handleResetFilter = () => {
    const formDatas = {
      position: "",
      status: "",
      location: "",
      gender: "",
      minAge: "",
      maxAge: "",
      minHeight: "",
      maxHeight: "",
      dominantHand: "",
    };
    dispatch(setPlayerFilterParams({ data: formDatas }));
    setFormData(formDatas);
  };

  return (
    <div>
      {/* Position */}
      <div className="position_wrapper pb-4">
        <h2>Position</h2>
        <div className="position_btn_wrapper">
          {["All", "Goalkeeper", "Defender", "Midfielder", "Forward"].map(
            (pos) => (
              <button
                key={pos}
                className={
                  formData.position === pos
                    ? "bg-success text-white"
                    : "not-selected"
                }
                onClick={() => setFormData({ ...formData, position: pos })}
              >
                {pos}
              </button>
            )
          )}
        </div>
      </div>

      {/* Status */}
      <div className="position_wrapper pb-4">
        <h2>Status</h2>
        <div className="position_btn_wrapper status">
          {["Bronze", "Silver", "Gold"].map((stat) => (
            <button
              key={stat}
              className={
                formData.status === stat
                  ? "bg-success text-white"
                  : "not-selected"
              }
              onClick={() => setFormData({ ...formData, status: stat })}
            >
              {stat}
            </button>
          ))}
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
            <option value="">Select</option>
            {countryNames.map((name, index) => (
              <option value={name.name} key={index}>
                {name.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Gender */}
      <div className="position_wrapper pb-4">
        <h2>Gender</h2>
        <div className="position_btn_wrapper location">
          <select className="form-select" name="gender" onChange={handleChange}>
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
            <option value="">Select</option>
            <option value="Left">Left</option>
            <option value="Right">Right</option>
          </select>
        </div>
      </div>
      <button onClick={handleApplyFilter} className="me-2">
        Apply
      </button>
      <button onClick={handleResetFilter}>Reset</button>
    </div>
  );
}

export default PlayerFilter;
