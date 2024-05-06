import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomSelect from "../JobOffer/CustomSelect";

const options = [
  { value: "Coach", label: "Coach" },
  { value: "Administration", label: "Administration" },
  { value: "Marketing", label: "Marketing" },
  { value: "Betting", label: "Betting" },
  { value: "Customer service", label: "Customer service" },
  { value: "Manager", label: "Manager" },
  { value: "Agent", label: "Agent" },
  { value: "Journalist", label: "Journalist" },
  { value: "Scout", label: "Scout" },
  { value: "Referee", label: "Referee" },
];

const sportOptions = [
  { value: "Football", label: "Football" },
  { value: "Basketball", label: "Basketball" },
  { value: "Handball", label: "Handball" },
  { value: "Volleyball", label: "Volleyball" },
  { value: "Other", label: "Other" },
];

const AnnouncementHeader = ({ onFiltersChange }) => {
  const [countryNames, setCountryNames] = useState([]);

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

 
  return (
    <>
      <div className="container job_header_wrapper">
        <h2 className="announcement_heading">Announcements</h2>
        {/* filters */}
        <div className="annuncement_inner_wrapper">
          <div className="row" style={{ gap: "60px" }}>
            <div className="col">
              <label htmlFor="">Sports</label>
              <select
                className="form-select"
                aria-label="Default select example"
                style={{
                  backgroundColor: "rgba(245, 245, 245, 0.70)",
                }}
                name="sport"
                onChange={onFiltersChange}
              >
                <option disabled selected>
                  Select here
                </option>
                <option value="">All</option>
                {sportOptions.map((name, index) => (
                  <option value={name?.value} className="" key={index}>
                    {name.value}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="col">
              <label htmlFor="">Sport</label>
              <CustomSelect
                options={sportOptions}
                onChange={handleChange}
                name="sport"
              />
            </div> */}
            <div className="col">
              <label htmlFor="">Location</label>
              <select
                className="form-select"
                aria-label="Default select example"
                style={{
                  backgroundColor: "rgba(245, 245, 245, 0.70)",
                }}
                name="location"
                onChange={onFiltersChange}
              >
                <option disabled selected>
                  Select here
                </option>
                <option value="">All</option>
                {countryNames.map((name, index) => (
                  <option value={name?.value} className="" key={index}>
                    {name.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <label htmlFor="">Categories</label>
              <select
                className="form-select"
                aria-label="Default select example"
                style={{
                  backgroundColor: "rgba(245, 245, 245, 0.70)",
                }}
                name="category"
                onChange={onFiltersChange}
              >
                <option disabled selected>
                  Select here
                </option>
                <option value="">All</option>
                {options.map((name, index) => (
                  <option value={name?.value} className="" key={index}>
                    {name.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementHeader;
