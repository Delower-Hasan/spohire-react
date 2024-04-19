/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import CustomSelect from "./CustomSelect";
import DatePosted from "./DatePosted";
const jobTypeOptions = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Other", label: "Other" },
];

const JobOfferHeader = ({
  filterItems,
  setFilterItems,
  setSearchParams,
  searchParams,
}) => {
  const [countryNames, setCountryNames] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedJobType, setSelectedJobType] = useState(null);
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

  const allOptions = [
    "Coach",
    "Administration",
    "Marketing",
    "Betting",
    "Customer service",
    "Manager",
    "Agent",
    "Journalist",
    "Scout",
    "Referee",
  ];

  // handle function
  const handleSearch = (event) => {
    setSearchParams(event.target.value);
  };

  const handleClear = () => {
    setSearchParams({});
  };

  const handleCheckboxChange = (event, name) => {
    event.preventDefault(); // Prevent the default behavior to keep the dropdown open

    if (searchParams?.jobLocation?.includes(name)) {
      const newSelectedCountries = searchParams?.jobLocation?.filter(
        (i) => i !== name
      );
      setSearchParams({ ...searchParams, jobLocation: newSelectedCountries });
    } else {
      const previousjobLocation = searchParams?.jobLocation || [];
      setSearchParams({
        ...searchParams,
        jobLocation: [...previousjobLocation, name],
      });
    }
  };

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleChange = (e) => {
    // setSelectedCountry(selectedOption);
    setFilterItems({
      ...filterItems,
      jobLocation: [e.target.value],
    });
  };

  const handleChangeJobType = (e) => {
    if (e.target.value === "All") {
      setFilterItems({
        ...filterItems,
        jobType: [...allOptions],
      });
    } else {
      setFilterItems({
        ...filterItems,
        jobType: [e.target.value],
      });
    }
  };

  // handle function end

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
                fill="none">
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
            <input
              type="text"
              placeholder="Keywords e.g ( job Title, description)"
              value={searchParams}
              onChange={handleSearch}
            />
          </div>
        </div>
        {/* filters */}
        <div className="row">
          <div className="col">
            <label htmlFor="">Category</label>
            <select
              className="form-select"
              aria-label="Default select example"
              style={{
                // height: "50px",
                backgroundColor: "rgba(245, 245, 245, 0.70)",
                // border: "1px solid #F0F0F0",
                // width: "268px",
              }}
              name="country"
              onChange={handleChangeJobType}>
              <option value="All" className="">
                Select here
              </option>
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
              style={{
                backgroundColor: "rgba(245, 245, 245, 0.70)",
              }}
              name="country"
              onChange={handleChangeJobType}>
              <option value="All" className="">
                Select here
              </option>
              {countryNames.map((name, index) => (
                <option value={name?.value} className="" key={index}>
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
              style={{
                backgroundColor: "rgba(245, 245, 245, 0.70)",
              }}
              name="country"
              onChange={handleChangeJobType}>
              <option value="All" className="">
                Select here
              </option>
              <option value="All" className="">
                Select here
              </option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="">Job type</label>
            <CustomSelect options={jobTypeOptions} />
          </div>
          <div className="col">
            <label htmlFor="">Date posted</label>
            <DatePosted />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobOfferHeader;
