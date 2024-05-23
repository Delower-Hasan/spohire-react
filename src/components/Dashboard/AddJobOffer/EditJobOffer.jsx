import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "./Modal.module.css";
import brows from "../../../assets/brows1.png";
import region from "../../../assets/aregion.png";
import salary from "../../../assets/asalary.png";
import "./AddJobOffer.css";
import {
  useAddJobMutation,
  useEditJobMutation,
} from "../../../features/job/jobApi";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const options = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Temporary", label: "Temporary" },
];

const categoryOptions = [
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

const WorkplaceOptions = [
  { value: "On-site", label: "On-site" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Remote", label: "Remote" },
];

const EditJobOffer = ({ onHide, isModalOpen, closeModal, editingItem }) => {
  const { user } = useSelector((state) => state.auth);

  const [editJob, { isLoading: editing }] = useEditJobMutation();

  const [jobDatas, setJobDatas] = useState({});
  const [editingInfo, setEditingInfo] = useState({});
  const [description, setDescription] = useState();

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [countryNames, setCountryNames] = useState([]);

  const [addJob, { isLoading }] = useAddJobMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const fromData = new FormData();

    Object.entries(editingInfo).forEach(([key, value]) => {
      fromData.append(key, value || "");
    });
    fromData.append("description", description);

    try {
      const response = await editJob({ id: editingItem?._id, data: fromData });
      if (response?.data?.success) {
        form.reset();
        closeModal();
        setLoading(false);
      }
      if (response?.error?.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response?.error?.data?.message}`,
        });
        setLoading(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile.name);
    setEditingInfo({ ...editingInfo, club_logo: selectedFile });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingInfo({ ...editingInfo, [name]: value });
    setJobDatas({ ...editingInfo, [name]: value });
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

  const [languages, setLanguages] = useState([]);
  // Languages
  useEffect(() => {
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
  });

  useEffect(() => {
    const data = {
      club_logo: editingItem?.club_logo,
      company: editingItem?.company,
      country: editingItem?.country,
      language: editingItem?.language,
      jobType: editingItem?.jobType,
      job_location: editingItem?.job_location,
      job_title: editingItem?.job_title,
      category: editingItem?.category,
      salary: editingItem?.salary,
      short_description: editingItem?.short_description,
      workplaceType: editingItem?.workplaceType,
    };
    setDescription(editingItem?.description);
    setJobDatas(data);
  }, [editingItem]);
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

  return (
    <div className={` ${styles.addJob_wrapper}`}>
      <Modal
        centered
        show={isModalOpen}
        onHide={onHide}
        className="modal_width1"
      >
        <Modal.Header closeButton className="p-0">
          <Modal.Title className="text-center"></Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 add_job_offer_admin">
          <div className="personal_info_edit_wrapper add_job_offer">
            <div
              className="d-flex flex-column align-items-start gap-3"
              style={{ marginBottom: "40px" }}
            >
              <form
                onSubmit={handleSubmit}
                className="w-100 player_job_form_wrapper"
              >
                <div className="text-center modal_title mb-5">
                  Edit Job offer
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div
                      className="position-relative text-start "
                      style={{ marginBottom: "32px" }}
                    >
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Job Title
                      </label>
                      <div className="form_icons" style={{ top: "36px" }}>
                        <img className="mt-0" src={region} alt="title" />
                      </div>
                      <input
                        type="text"
                        className="form-control ps-5"
                        id="exampleFormControlInput1"
                        placeholder="Enter Announcement Title"
                        name="job_title"
                        required
                        value={jobDatas?.job_title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div
                      className="position-relative text-start "
                      style={{ marginBottom: "32px" }}
                    >
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Company Logo
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="exampleFormControlInput1"
                        accept=".jpeg, .jpg, .png"
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
                            Country
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
                              Select country
                            </option>
                            {countryNames.map((country, index) => (
                              <option
                                value={country.name}
                                className=""
                                key={index}
                                selected={jobDatas?.country === country?.name}
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
                              City
                            </label>

                            <div className="form_icons" style={{ top: "36px" }}>
                              <img className="mt-0" src={region} alt="title" />
                            </div>
                            <input
                              type="text"
                              className="form-control ps-5"
                              id="exampleFormControlInput1"
                              placeholder="Your city"
                              name="job_location"
                              required
                              value={jobDatas?.job_location}
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
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Job type
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
                        value={jobDatas?.jobType}
                        onChange={handleInputChange}
                      >
                        <option selected disabled>
                          Select Type
                        </option>
                        {options.map((d, index) => (
                          <option
                            value={d.value}
                            className=""
                            key={index}
                            selected={jobDatas?.jobType === d?.value}
                          >
                            {d.value}
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
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Company
                      </label>
                      <div className="form_icons" style={{ top: "36px" }}>
                        <img className="mt-0" src={region} alt="user" />
                      </div>
                      <input
                        type="text"
                        className="form-control ps-5"
                        id="exampleFormControlInput1"
                        placeholder="Enter your company"
                        name="company"
                        required
                        value={jobDatas?.company}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div
                      className="position-relative text-start "
                      style={{ marginBottom: "32px" }}
                    >
                      <label htmlFor="workplace" className="form-label">
                        Workplace Type
                      </label>

                      <select
                        className="form-select"
                        aria-label="Default select example"
                        id="workplace"
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
                        {WorkplaceOptions.map((work, index) => (
                          <option
                            value={work.value}
                            key={index}
                            selected={jobDatas?.workplaceType === work.value}
                          >
                            {work.value}
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
                          <label htmlFor="category" className="form-label">
                            Category
                          </label>

                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="category"
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

                            {categoryOptions.map((category, index) => (
                              <option
                                value={category.value}
                                key={index}
                                selected={
                                  jobDatas?.category === category?.value
                                }
                              >
                                {category.value}
                              </option>
                            ))}
                          </select>
                        </div>
                        {/* <div className="col-lg-6">
                          <label htmlFor="language" className="form-label">
                            Language
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="language"
                            placeholder="Enter language"
                            name="language"
                            required
                            value={jobDatas?.language}
                            onChange={handleInputChange}
                          />
                        </div> */}

                        <div className="col-lg-6">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Language *
                          </label>
                          <select
                            required
                            className={`form-control`}
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
                              <option
                                defaultValue={lang}
                                className=""
                                key={lang}
                              >
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
                      <label htmlFor="salary" className="form-label">
                        Salary
                      </label>
                      <div className="form_icons" style={{ top: "36px" }}>
                        <img className="mt-0" src={salary} alt="user" />
                      </div>
                      <input
                        type="number"
                        className="form-control ps-5"
                        id="salary"
                        placeholder="Numerical digit only"
                        required
                        name="salary"
                        min="1"
                        value={jobDatas?.salary}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="position-relative text-start">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Short Description *
                      </label>
                      <div className="input-group mb-3">
                        <textarea
                          type="text"
                          style={{ height: "65px" }}
                          className={`form-control`}
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
                      <label
                        hytmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Description
                      </label>
                      <div className="input-group mb-3">
                        <CKEditor
                          style={{ width: "100%" }}
                          editor={ClassicEditor}
                          config={customConfig}
                          className="form-control w-100"
                          data={description}
                          onReady={(editor) => {
                            // console.log("Editor is ready to use!", editor);
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setDescription(data);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="submit_now_btn w-100 m-0"
                  // onClick={onHide}
                  type="submit"
                  disabled={loading || editing}
                >
                  {loading ? "Editing..." : "Edit Job"}
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditJobOffer;
