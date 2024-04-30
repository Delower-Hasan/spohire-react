import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";
import upload from "../../../assets/upload.svg";
import { useParams } from "react-router-dom";
import { useApplyForTheJobMutation } from "../../../features/job/jobApi";
import { useSelector } from "react-redux";
import { useCreateNotificationMutation } from "../../../features/notification/notificationApi";
import Swal from "sweetalert2";

const ApplyModal = ({ show, setShow, selectedJob }) => {
  const { id } = useParams();
  const [applyForTheJob, { isLoading, isError, error }] =
    useApplyForTheJobMutation();
  const [countryNames, setCountryNames] = useState([]);
  const [dropdownShow, setDropdownShow] = useState(false);
  const [selected, setSelected] = useState("");
  const fileRef = useRef();
  const dropdownRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const [createNotification] = useCreateNotificationMutation();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];

    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      // Add additional logic if needed
    } else {
      // Handle invalid file type
      alert("Please select a PDF file.");
      fileInputRef.current.value = ""; // Clear the file input
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // console.log("id", id);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name,callingCodes,flags")
      .then(function (response) {
        const countries = response.data;
        const hongKongIndex = countries.findIndex(
          (country) => country.name.common === "Hong Kong"
        );
        const chinaIndex = countries.findIndex(
          (country) => country.name.common === "China"
        );
        if (hongKongIndex !== -1 && chinaIndex !== -1) {
          const hongKong = countries.splice(hongKongIndex, 1)[0];
          const china = countries.splice(chinaIndex, 1)[0];

          countries.unshift(china);
          countries.unshift(hongKong);
        }

        setCountryNames(countries);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const fileInputRef = useRef(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fname = form.fname.value;
    const lname = form.lname.value;
    const email = form.email.value;
    const phone = form.phone.value;
    // const resume = form.resume.files[0];
    const coverLetter = form.coverLetter.value;

    if (selectedFile?.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "File size exceeds the 15 MB limit. Please choose a smaller file.",
      });

      return;
    }

    const data = {
      name: fname,
      lname: lname,
      email,
      phone,
      cv: selectedFile,
      job: id,
      job_description: coverLetter,
      userInfo: user._id,
    };
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    const notificationInfo = {
      user: user?._id,
      type: "Job Applied",
      message: `${user?.first_name} ${user?.last_name} has been applied for the ${selectedJob?.job_title}.`,
      senderId: user?._id,
      jobId: selectedJob?._id,
    };
    try {
      const response = await applyForTheJob(formData);
      if (response?.data?.success) {
        form.reset();
        await createNotification(notificationInfo);
        setShow(false);
        Swal.fire({
          icon: "success",
          title: "Successfull!",
          text: `${response?.data?.message}`,
        });
      }
      if (response?.error?.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response?.error?.data?.message}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    }
  };
  return (
    <Modal
      size="sm"
      className="apply_job"
      show={show}
      onHide={() => setShow(false)}
    >
      <Modal.Header>
        <Modal.Title>Apply for this job</Modal.Title>
      </Modal.Header>
      <form onSubmit={submitHandler}>
        <Modal.Body>
          <div className="row gx-4 gy-5">
            <div className="col-lg-6">
              <label>First Name *</label>
              <input
                type="text"
                name="fname"
                placeholder="Enter Your First Name"
                required
              />
            </div>
            <div className="col-lg-6">
              <label>Last Name *</label>
              <input
                type="text"
                name="lname"
                placeholder="Enter Your Last Name"
                required
              />
            </div>
            <div className="col-lg-6">
              <label>Mail address *</label>
              <input
                type="email"
                placeholder="Enter your mail address"
                name="email"
                required
              />
            </div>
            <div className="col-lg-6">
              <label>Phone Number *</label>

              <div
                ref={dropdownRef}
                className="d-flex align-items-center drop py-0"
              >
                <div className="position-relative">
                  <div
                    className="d-flex align-items-center gap-1  "
                    onClick={() => setDropdownShow(!dropdownShow)}
                  >
                    <img
                      width={20}
                      height={13}
                      className="m-0"
                      src={selected ? selected : countryNames[0]?.flags.png}
                      alt=""
                    />

                    <IoIosArrowDown className="text-primary fs-4" />
                  </div>
                  {dropdownShow && (
                    <div
                      style={{ maxHeight: "300px", overflowY: "scroll" }}
                      className="position-absolute  bg-white shadow-sm p-3 d-flex flex-column gap-2"
                    >
                      {countryNames.map((data, index) => (
                        <div
                          style={{ cursor: "pointer" }}
                          className="d-flex gap-2 align-items-center"
                          key={index}
                          onClick={() => setSelected(data.flags.png)}
                        >
                          <img
                            className="m-0"
                            width={20}
                            src={data.flags.png}
                            alt=""
                          />
                          <p className="fs-6 mb-0">{data.name.common}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <input type="tel" name="phone" placeholder="+1  ** **** ***" />
              </div>
            </div>
            <div>
              <label>Resume or CV *</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept=".pdf"
                id="fileInput"
              />

              {/* <input
                name="resume"
                ref={fileRef}
                type="text"
                className="d-none"
                onClick={() => fileInputRef.current.click()}
                value={selectedFile ? selectedFile.name : ""}
                readOnly
              /> */}

              <div
                // onClick={() => fileRef.current.click()}
                className="upload d-flex align-items-center justify-content-center gap-3"
              >
                <input
                  type="text"
                  className="form-control ps-5"
                  id="customFileInput"
                  name="customFileInput"
                  placeholder="Select a PDF file"
                  onClick={() => fileInputRef.current.click()}
                  value={selectedFile ? selectedFile.name : ""}
                  readOnly
                  style={{ background: "transparent" }}
                />
                {/* <img className="m-0" src={upload} alt="" />
                <p>
                  Drop your file or <span>Upload</span>{" "}
                </p> */}
              </div>
            </div>
            <div>
              <label>Cover Letter</label>
              <textarea placeholder="Type here"></textarea>
            </div>
            <div id="special" className="d-flex align-items-center gap-2">
              <input
                type="checkbox"
                id="cover"
                name="coverLetter"
                className="w-auto"
              />
              <label htmlFor="cover">
                I accept the Sophire privacy and terms.
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex align-items-center gap-5 border-top-0">
          <button
            className="cancel_btn"
            type="button"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
          <button type="submit" className="submit_btn" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Application"}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ApplyModal;
