import React, { useEffect, useState } from "react";
import { setCoachFilterParams } from "../../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

function CoachFilter() {
  const dispatch = useDispatch();
  const [countryNames, setCountryNames] = useState([]);
 const [status, setStatus] = useState(null);
  // State object to store the selected values
  const [formData, setFormData] = useState({
    status: "",
    location: "",
    nationality: "",
    gender: "",
    minAge: "",
    maxAge: "",
  });

  //  const handleStatusChange = (value) => {
  //    setSelectedStatus(value);
  //  };

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

   const handleStatus = (value) => {
     setStatus(value);
     console.log(value);
   };


  return (
    <div>
      {/* Status */}
      <div className="position_wrapper pb-4">
        <h2>Status</h2>
        <div className="position_btn_wrapper status d-flex align-items-center gap-3">
          <button className={ status === "Bronze" ? "bg-warning text-white" : "not-selected" } onClick={() => handleStatus("Bronze")}>
            Bronze
          </button>

          <button className={status === "Silver" ? "bg-warning text-white" : "not-selected"} onClick={() => handleStatus("Silver")}>
            Silver
          </button>

          <button className={ status === "Gold" ? "bg-warning text-white" : "not-selected" } onClick={() => handleStatus("Gold")}>
            Gold
          </button>
        </div>
      </div>

      {/* Location */}
      <div className="position_wrapper pb-4">
        <h2>Location</h2>
        <div className="position_btn_wrapper location">
          <select className="form-select" onChange={handleLocationChange}>
            {countryNames.map((name, index) => (
              <option value={name.name} key={index}>
                {name.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Nationality */}
      <div className="position_wrapper pb-4">
        <h2>Nationality</h2>
        <div className="position_btn_wrapper location">
          <select className="form-select" onChange={handleNationalityChange}>
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
            min={"0"}
          />
          <input
            type="number"
            placeholder="Max"
            value={formData.maxAge}
            onChange={(e) => handleAgeChange(e, "maxAge")}
            min={"0"}
          />
          <button onClick={handleAgeApply}>Apply</button>
        </div>
      </div>
    </div>
  );
}

export default CoachFilter;
