import React, { useEffect, useState } from "react";

const SelectInfo = () => {
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedFlag, setSelectedFlag] = useState(
    "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
  );

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  const handleCurrencySelect = (currency, flag) => {
    setSelectedCurrency(currency);
    setSelectedFlag(flag);
    setOpen(false);
  };

  return (
    <div className="settings">
      <form>
        <div className="mb-4">
          <label>Language</label>
          <select>
            <option>English</option>
            <option>Bangla</option>
            <option>Hindi</option>
            <option>Farsi</option>
          </select>
        </div>
        <div>
          <label>Currency</label>

          <div>
            <div
              onClick={() => setOpen(!open)}
              className="select d-flex align-items-center gap-4 justify-content-between"
            >
              <div className=" d-flex align-items-center gap-2">
                <img src={selectedFlag} width={20} alt="" />
                <span>$ {selectedCurrency}</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
              >
                <path
                  d="M11 1L6 6L1 1"
                  stroke="#0095FF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            {open &&
              countries &&
              countries.length > 0 &&
              countries.map((country, index) => (
                <div
                  onClick={() =>
                    handleCurrencySelect(
                      Object.keys(country.currencies)[0],
                      country.flags.svg
                    )
                  }
                  className=""
                  key={index}
                >
                  {country.flags && country.flags.svg ? (
                    <img width={20} src={country.flags.svg} alt="" />
                  ) : (
                    <span>No flag available</span>
                  )}

                  {country.currencies && Object.values(country.currencies)[0]
                    ? `${Object.keys(country.currencies)[0]}`
                    : "No currency available"}
                </div>
              ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SelectInfo;
