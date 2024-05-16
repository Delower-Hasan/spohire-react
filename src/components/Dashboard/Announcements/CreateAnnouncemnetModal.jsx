import React from "react";
import region from "../../../assets/aregion.png";
import brows from "../../../assets/brows.svg";
import dollarImg from "../../../assets/asalary.png";

const CreateAnnouncemnetModal = ({
  fileInputRef,
  handleFileChange,
  image,
  selectedCountry,
  countryNames,
  options,
  WorkplaceOptions,
  categoryOptions,
  handleInputChange,
}) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          {/*title*/}
          <div
            className="position-relative text-start "
            style={{ marginBottom: "32px" }}
          >
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title *
            </label>

            {/*<div className="form_icons" style={{top: "36px"}}>*/}
            {/*    <img className="mt-0" src={region} alt="title"/>*/}
            {/*</div>*/}
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="From the list"
              name="title"
              required
              onChange={handleInputChange}
            />
          </div>
          {/*title end*/}
          {/*category type*/}
          <div
            className="position-relative text-start "
            style={{ marginBottom: "32px" }}
          >
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Category *
            </label>

            <select
              className="form-select"
              aria-label="Default select example"
              style={{
                minHeight: "44px",
                width: "100%",
                backgroundColor: "#FFFFFF",
                padding: "0 14px",
              }}
              name="category"
              onChange={handleInputChange}
            >
              <option selected disabled>
                Select here
              </option>
              {options.map((cat, index) => (
                <option value={cat.value} className="" key={index}>
                  {cat.value}
                </option>
              ))}
            </select>
          </div>
          {/*category type end*/}
          {/* country */}

          <div className="position-relative text-start ">
            <div className="row">
              <div className="col-lg-6 job_location_select">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Country *
                </label>

                <select
                  className="form-select"
                  aria-label="Default select example"
                  style={{
                    minHeight: "44px",
                    width: "100%",
                    backgroundColor: "#FFFFFF",
                    padding: "0 14px",
                  }}
                  name="country"
                  onChange={handleInputChange}
                >
                  <option selected disabled>
                    Select here
                  </option>
                  {countryNames.map((country, index) => (
                    <option value={country.name} className="" key={index}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-lg-6">
                <div
                  className="position-relative text-start "
                  style={{ marginBottom: "32px" }}
                >
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    City *
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Write here"
                    name="location"
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* country end */}
        </div>

        <div className="col-lg-6 ">
          {/* <div style={{ marginBottom: "32px" }}>
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Status
            </label>

            <div className={"status_wrapper d-flex gap-3"}>
              <button className={"status_btn_active"}>In progress</button>
              <button className={"status_btn"}>Published</button>
              <button className={"status_btn"}>Denied</button>
            </div>
          </div> */}

          {/*category type*/}
          <div
            className="position-relative text-start "
            style={{ marginBottom: "32px" }}
          >
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Sports *
            </label>

            <select
              className="form-select"
              aria-label="Default select example"
              style={{
                minHeight: "44px",
                width: "100%",
                backgroundColor: "#FFFFFF",
                padding: "0 14px",
              }}
              name="sports"
              // value={jobType}
              onChange={handleInputChange}
            >
              <option selected disabled>
                Select here
              </option>
              {["Football", "Basketball", "Handball", "Volleyball"].map(
                (country, index) => (
                  <option value={country} className="" key={index}>
                    {country}
                  </option>
                )
              )}
            </select>
          </div>
          {/*category type end*/}

          {/*    budget */}
          <div
            className="position-relative text-start "
            style={{ marginBottom: "32px" }}
          >
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Budget *
            </label>

            <div className={"d-flex upload_wrapper"}>
              {/* <button
                style={{
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                  color: "white",
                }}>
                $
              </button> */}
              <input
                type="number"
                className="form-control border-0"
                style={{
                  cursor: "pointer",
                  backgroundImage: `url(${dollarImg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left 10px center",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                  paddingLeft: "40px",
                }}
                id="exampleFormControlInput1"
                placeholder="500"
                name="budget"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/*image*/}
          <div
            className="position-relative text-start"
            style={{ marginBottom: "32px" }}
          >
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="exampleFormControlInput1"
              ref={fileInputRef}
              accept=".jpeg, .jpg, .png"
              onChange={handleFileChange}
              style={{
                display: "none",
                borderRight: "none",
                borderTopRightRadius: "0px !important",
                borderBottomRightRadius: "0px !important",
              }} // Hide the default file input
            />
            <div className="form_icons" style={{ top: "36px" }}>
              <img className="mt-0" src={brows} alt="image" />
            </div>

            <div className={"d-flex upload_wrapper"}>
              <input
                type="text"
                onClick={() => fileInputRef.current.click()}
                className="form-control ps-5 border-0"
                value={image}
                style={{ cursor: "pointer" }}
                id="exampleFormControlInput1"
                placeholder="Brows Here"
              />

              {/* <button
                style={{
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                  backgroundColor: "#0177FB",
                  paddingLeft: "35px",
                  paddingRight: "35px",
                  color: "white",
                }}>
                Upload
              </button> */}
            </div>
          </div>
          {/*image end*/}

          {/*    budget end*/}
        </div>

        <div className="mb-3" style={{ marginBottom: "32px" }}>
          <label hytmlFor="exampleFormControlInput1" className="form-label">
            Description *
          </label>
          <div className="input-group mb-3">
            <textarea
              type="text"
              style={{ height: "120px", boxShadow: "none" }}
              className="form-control"
              placeholder="Enter Your Description...."
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="description"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAnnouncemnetModal;
