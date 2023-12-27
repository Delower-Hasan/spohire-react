/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-select'


const JobOfferHeader = ({ filterItems, setFilterItems, setSearchParams }) => {
  const handleSearch = () => {
    setSearchParams(filterItems);
  };

  const options = [
    { value: 'Player', label: 'Player' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Coatch', label: 'Coatch' }
  ]
  const [countryNames, setCountryNames] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get('https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json')
      .then(function (response) {
        // Assuming response.data is an array of objects with a 'name' property
        // console.log(response);
        setCountryNames(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };
  return (
    <>
      <div className="jobsearch_page page_header f_SF Pro Display">
        <h2>
          <span>3,000+</span> Browse Jobs
        </h2>
        <p>Find Jobs, Employment & Career Opportunities</p>
        <div className="search_jobs">
          <form onSubmit={(e) => e.preventDefault()}>
            {/* <div className=""> */}
            <div style={{ width: "308px" }}>
              <input
                type="text"
                name=""
                id=""
                className='w-100'
                placeholder="Keywords e.g ( job Title, description)"
                onChange={(e) =>
                  setFilterItems({ ...filterItems, jobTitle: e.target.value })
                }
              />
            </div>
       
            <Select
              style={{ minHeight: "50px" }}
              options={countryNames.map((country) => ({ value: country.name, label: country.name }))}
              value={selectedCountry}
              onChange={handleChange}

              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  minHeight: "50px",
                  backgroundColor: "#FAFAFA",
                }),

                container: (baseStyles) => ({
                  ...baseStyles,
                  width: "268px",

                }),

                valueContainer: (baseStyles) => ({
                  ...baseStyles,
                  padding: "0 5px",
                }),
                placeholder: (baseStyles) => ({
                  ...baseStyles,
                  color: "#9CA3A9",
                  fontSize: "10px",
                }),
                menuList: (baseStyles) => ({
                  ...baseStyles,
                  fontSize: "16px",
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  fontSize: "14px",
                }),
                indicatorsContainer: (baseStyles) => ({
                  ...baseStyles,
                  padding: "0px !important",
                }),
                indicatorSeparator: (baseStyles) => ({
                  ...baseStyles,
                  display: "none",
                  margin: "0",
                  width: "0",
                }),

              }}
            />
            <Select
              style={{ minHeight: "50px" }}
              options={options}
              value={options.label}

              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  minHeight: "50px",
                  backgroundColor: "#FAFAFA",
                }),

                container: (baseStyles) => ({
                  ...baseStyles,
                  width: "268px",

                }),

                valueContainer: (baseStyles) => ({
                  ...baseStyles,
                  padding: "0 5px",
                }),
                placeholder: (baseStyles) => ({
                  ...baseStyles,
                  color: "#9CA3A9",
                  fontSize: "10px",
                }),
                menuList: (baseStyles) => ({
                  ...baseStyles,
                  fontSize: "16px",
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  fontSize: "14px",
                }),
                indicatorsContainer: (baseStyles) => ({
                  ...baseStyles,
                  padding: "0px !important",
                }),
                indicatorSeparator: (baseStyles) => ({
                  ...baseStyles,
                  display: "none",
                  margin: "0",
                  width: "0",
                }),

              }}
            />

            <button
              type="button"
              className="jobsearchbtn"
              onClick={handleSearch}
            >
              Search
            </button>
            {/* </div> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default JobOfferHeader;
