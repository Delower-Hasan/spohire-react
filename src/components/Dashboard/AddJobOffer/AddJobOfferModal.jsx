import React, { useEffect, useState } from "react";
import region from "../../../assets/aregion.png";
import brows from "../../../assets/brows1.png";
import salary from "../../../assets/asalary.png";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddJobOfferModal = ({
  handleInputChange,
  fileInputRef,
  handleFileChange,
  image,
  selectedCountry,
  countryNames,
  options,
  WorkplaceOptions,
  categoryOptions,
  setDescription,
}) => {
  const [step, setStep] = useState(0);

  return (
    <>
      <div className="text-start modal_title">Add Job offer</div>
      <div className="step_number d-flex justify-content-end">
        <p>
          <span style={{ color: "#0095FF" }}>Step 1</span> of 2
        </p>
      </div>

      <div className={"stepBorder"}></div>

      <div className="row">
        <div className="col-lg-6">
          <div
            className="position-relative text-start"
            style={{ marginBottom: "32px" }}
          >
            <label htmlFor="exampleFormControlInput1" className="form-label">
              {" "}
              Job Title *{" "}
            </label>

            {/* <div className="form_icons" style={{ top: "36px" }}>
              <img className="mt-0" src={region} alt="title" />
            </div> */}
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Job Title"
              name="job_title"
              required
              onChange={handleInputChange}
            />
          </div>
          <div
            className="position-relative text-start"
            style={{ marginBottom: "32px" }}
          >
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Company Logo
            </label>
            <input
              type="file"
              className="form-control"
              id="exampleFormControlInput1"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }} // Hide the default file input
            />
            <div className="form_icons" style={{ top: "36px" }}>
              <img className="mt-0" src={brows} alt="user" />
            </div>
            <input
              type="text"
              onClick={() => fileInputRef.current.click()}
              className="form-control ps-5"
              value={image}
              style={{ cursor: "pointer" }}
              id="exampleFormControlInput1"
              placeholder="Brows Here"
            />
          </div>
          {/* SELECT */}
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
                  value={selectedCountry}
                  onChange={handleInputChange}
                >
                  <option selected disabled>
                    Select country
                  </option>
                  {countryNames?.map((country, index) => (
                    <option
                      defaultValue={country.name}
                      className=""
                      key={index}
                    >
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
                    placeholder="Type Here"
                    name="job_location"
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* SELECT */}

          <div
            className="position-relative text-start "
            style={{ marginBottom: "32px" }}
          >
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Job type*
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
              name="jobType"
              // value={jobType}
              onChange={handleInputChange}
            >
              <option selected disabled>
                Select Type
              </option>
              {options?.map((country, index) => (
                <option defaultValue={country.value} className="" key={index}>
                  {country.value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-6 ">
          <div
            className="position-relative text-start "
            style={{ marginBottom: "32px" }}
          >
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Company
            </label>
            {/* <div className="form_icons" style={{ top: "36px" }}>
              <img className="mt-0" src={region} alt="user" />
            </div> */}
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter your company"
              name="company"
              required
              onChange={handleInputChange}
            />
          </div>
          <div
            className="position-relative text-start "
            style={{ marginBottom: "32px" }}
          >
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Workplace Type *
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
              name="workplaceType"
              onChange={handleInputChange}
            >
              <option selected disabled>
                Select Type
              </option>
              {WorkplaceOptions?.map((country, index) => (
                <option defaultValue={country.value} key={index}>
                  {country.value}
                </option>
              ))}
            </select>
          </div>
          <div
            className="position-relative text-start "
            style={{ marginBottom: "32px" }}
          >
            <div className="row">
              <div className="col-lg-6">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
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
                    Select Type
                  </option>
                  {categoryOptions?.map((category, index) => (
                    <option
                      defaultValue={category.value}
                      className=""
                      key={index}
                    >
                      {category.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-lg-6">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Language *
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
                  name="language"
                  onChange={handleInputChange}
                >
                  <option selected disabled>
                    Select Language
                  </option>

                  <option value="English">English</option>
                </select>
              </div>
            </div>
          </div>

          <div
            className="position-relative text-start "
            style={{ marginBottom: "32px" }}
          >
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Salary *
            </label>
            <div className="form_icons" style={{ top: "43px" }}>
              <img className="mt-0" src={salary} alt="user" />
            </div>
            <input
              type="number"
              className="form-control ps-5"
              id="exampleFormControlInput1"
              placeholder="Numerical digit only"
              required
              name="salary"
              min="1"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="position-relative text-start">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Description *
            </label>
            <div className="input-group mb-3">
              {/* <textarea
                type="text"
                style={{ height: "65px" }}
                className="form-control"
                placeholder="Enter Your Description...."
                aria-label="Username"
                aria-describedby="basic-addon1"
                name="description"
                required
                onChange={handleInputChange}
              /> */}
              <CKEditor
                editor={ClassicEditor}
                className="form-control w-100"
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                  // console.log(data, "onchange");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddJobOfferModal;
