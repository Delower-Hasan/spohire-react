import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useState } from "react";
import salary from "../../../assets/asalary.png";
import brows from "../../../assets/brows1.png";

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
  errors,
}) => {
  const [step, setStep] = useState(0);
  const customConfig = {
    fontFamily: {
      options: [
        "default",
        "SF Pro Display,sans-serif", // Add your custom font here
      ],
    },
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "fontFamily",
      "fontSize",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "link",
      "bulletedList",
      "numberedList",
      "blockQuote",
      "|",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo",
    ],
  };

  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    // Languages
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const languages = new Set();
        data.forEach((country) => {
          if (country.languages) {
            Object.values(country.languages).forEach((language) => {
              languages.add(language);
            });
          }
        });
        setLanguages(Array.from(languages));
        // console.log(Array.from(languages));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
              className={`${
                errors.job_title ? "input-error" : ""
              } form-control`}
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
              accept=".jpeg, .jpg, .png"
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
                  required
                  className={`${
                    errors.country ? "input-error" : ""
                  } form-control`}
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
                    className={`${
                      errors.job_location ? "input-error" : ""
                    } form-control`}
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
              required
              className={`${errors.jobType ? "input-error" : ""} form-control`}
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
              className={`${errors.company ? "input-error" : ""} form-control`}
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
              required
              className={`${
                errors.workplaceType ? "input-error" : ""
              } form-control`}
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
                  required
                  className={`${
                    errors.category ? "input-error" : ""
                  } form-control`}
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
                  required
                  className={`${
                    errors.language ? "input-error" : ""
                  } form-control`}
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
                  {languages?.map((lang) => (
                    <option defaultValue={lang} className="" key={lang}>
                      {lang}
                    </option>
                  ))}

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
              className={`${
                errors.job_location ? "input-error" : ""
              } form-control ps-5`}
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
              Short Description *
            </label>
            <div className="input-group mb-3">
              <textarea
                type="text"
                style={{ height: "65px" }}
                className={`${
                  errors.jobType ? "input-error" : ""
                } form-control`}
                placeholder="Enter Your Description...."
                aria-label="Short Description"
                aria-describedby="basic-addon1"
                name="short_description"
                required
                onChange={handleInputChange}
              />
            </div>
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
                config={customConfig}
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
