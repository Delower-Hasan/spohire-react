/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const jobTypeOptions = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
];

const JobOfferHeader = ({ searchText, handleSearch, handleInputChange }) => {
  const [countryNames, setCountryNames] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

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

  const dateOptions = [
    { value: "Past 24 hours", label: "Past 24 hours" },
    { value: "Last week", label: "Last week" },
    { value: "Last month", label: "Last month" },
  ];

  const remotes = [
    { value: "On-site", label: "On-site" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Remote", label: "Remote" },
  ];

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  // useEffect
  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

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
        <div className="search_input">
          <div className="position-relative">
            <div className="search_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="15"
                viewBox="0  0 14 15"
                fill="none"
              >
                <circle
                  cx="6.36364"
                  cy="6.36364"
                  r="5.66364"
                  stroke="#2B3674"
                  strokeWidth="1.4"
                />
                <line
                  x1="13.0101"
                  y1="14"
                  x2="10.1818"
                  y2="11.1718"
                  stroke="#2B3674"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            {/* search filter */}
            <input
              type="text"
              placeholder="Keywords e.g ( job Title, description)"
              value={searchText}
              onChange={handleSearch}
            />
            {/* search filter -/END */}
          </div>
        </div>
        {/* filters */}
        <div className="row">
          <div className="col">
            <label htmlFor="">Category</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="category"
              onChange={handleInputChange}
              style={{
                // height: "50px",
                backgroundColor: "rgba(245, 245, 245, 0.70)",
                // border: "1px solid #F0F0F0",
                // width: "268px",
              }}
            >
              {/* <option disabled selected>
                Select here
              </option> */}
              {options.map((name, index) => (
                <option value={name?.value} className="" key={index}>
                  {name.value}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <label htmlFor="">Location</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="location"
              onChange={handleInputChange}
              style={{
                backgroundColor: "rgba(245, 245, 245, 0.70)",
              }}
            >
              {/* <option value="All" disabled selected>
                Select here
              </option> */}
              {countryNames.map((name, index) => (
                <option value={name?.value} key={index}>
                  {name.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <label htmlFor="">Remote</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="workplaceType"
              onChange={handleInputChange}
              style={{
                backgroundColor: "rgba(245, 245, 245, 0.70)",
              }}
            >
              {/* <option value="All" disabled selected>
                Select here
              </option> */}

              {remotes.map((item, index) => (
                <option key={index} value={item.value} className="">
                  {item.value}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <label htmlFor="">Job Type</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="jobType"
              onChange={handleInputChange}
              style={{
                backgroundColor: "rgba(245, 245, 245, 0.70)",
              }}
            >
              {/* <option value="All" disabled selected>
                Select here
              </option> */}

              {jobTypeOptions.map((item, index) => (
                <option key={index} value={item.value} className="">
                  {item.value}
                </option>
              ))}
            </select>
          </div>

          <div className="col">
            <label htmlFor="">Date posted</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="postedAt"
              onChange={handleInputChange}
              style={{
                backgroundColor: "rgba(245, 245, 245, 0.70)",
              }}
            >
              {/* <option disabled selected className="">
                Select here
              </option> */}

              {dateOptions.map((item, index) => (
                <option key={index} value={item.value} className="">
                  {item.value}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="col">
            <label htmlFor="">Job type</label>
            <CustomSelect
              handleInputChange={handleInputChange}
              options={jobTypeOptions}
            />
          </div> */}
          {/* <div className="col">
            <label htmlFor="">Date posted</label>
            <DatePosted />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default JobOfferHeader;
