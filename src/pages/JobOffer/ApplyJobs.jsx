import auser from "../../assets/auser.png";
import region from "../../assets/aregion.png";
import dob from "../../assets/adob.png";
import email from "../../assets/aemail.png";
import phone from "../../assets/aphone.png";
import salary from "../../assets/asalary.png";
import upload from "../../assets/aupload.png";
import { useEffect, useRef, useState } from "react";
import { useApplyForTheJobMutation } from "../../features/job/jobApi";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import axios from "axios";
import { useCreateNotificationMutation } from "../../features/notification/notificationApi";

const formFields = [
  {
    label: "Your Name",
    type: "text",
    key: "name",
    icon: auser,
    placeholder: "Enter your name",
  },
  {
    label: "Country",
    type: "text",
    key: "country",
    icon: region,
    placeholder: "Enter your Country",
  },
  {
    label: "Birth Date",
    type: "date",
    key: "birthDate",
    icon: dob,
    placeholder: "Enter your birth date",
  },
  {
    label: "Expected Salary",
    type: "number",
    key: "salary",
    icon: salary,
    placeholder: "Enter your Expected Salary",
  },
  {
    label: "Email",
    type: "email",
    key: "email",
    icon: email,
    placeholder: "Enter your Email",
  },
  {
    label: "Upload CV",
    type: "file",
    key: "cv",
    icon: upload,
    placeholder: "",
  },
  {
    label: "Phone",
    type: "number",
    key: "phone",
    icon: phone,
    placeholder: "Enter your phone number",
  },
];

const ApplyJobs = ({ selectedJob, user }) => {
  //   const [formData, setFormData] = useState({
  //     name: "",
  //     region: "",
  //     birthDate: "",
  //     playingPosition: "",
  //     weight: "",
  //     height: "",
  //     expectedSalary: "",
  //     language: "",
  //   });

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   };

  // const { user } = useSelector((state) => state.auth);

  const [applyForTheJob, { isLoading }] = useApplyForTheJobMutation();
  const [createNotification] = useCreateNotificationMutation();
  const [loading, setLoading] = useState(false);

  const [countryNames, setCountryNames] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const closeButtonRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const form = e.target;

    if (selectedFile?.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "File size exceeds the 15 MB limit. Please choose a smaller file.",
      });
      setLoading(false);
      return;
    }

    const name = form.name.value;
    const region = form.country.value;
    const birth_date = form.birthDate.value;
    const expected_salary = form.salary.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const job = selectedJob?._id;
    const creator = selectedJob?.creator;
    const cv = selectedFile;
    const userInfo = user?._id;
    const data = {
      name,
      region,
      birth_date,
      expected_salary,
      phone,
      email,
      job,
      cv,
      creator,
      userInfo,
    };

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const notificationInfo = {
      user: creator,
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
        closeButtonRef?.current?.click();
        Swal.fire({
          icon: "success",
          title: "Successfull!",
          text: `${response?.data?.message}`,
        });

        // navigate("/dashboard/announcements");
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
    <div className="apply_jobs_modal">
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={{
                maxWidth: "1240px",
                width: "100%",
                margin: "auto",
              }}
            >
              <div className="modal-header p-0">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={closeButtonRef}
                ></button>
              </div>
              <h1
                className="modal-title fs-5 text-center apply_jobs_title"
                id="exampleModalLabel"
              >
                Apply for the job
              </h1>
              <div className="modal-body text-start">
                <div className="container">
                  <div className="row">
                    {formFields.map((field) => (
                      <div
                        className={`${
                          field.key == "name"
                            ? "col-lg-12"
                            : "col-lg-6 border_color"
                        }`}
                        key={field.key}
                      >
                        <div className="mb-4 position-relative">
                          <label htmlFor={field.key} className="form-label">
                            {field.label}
                          </label>
                          <div className="form_icons">
                            <img className="mt-0" src={field.icon} alt="user" />
                          </div>
                          {field.key === "country" ? (
                            <>
                              <select
                                className="form-select ps-5"
                                aria-label="Default select example"
                                style={{
                                  height: "46px",
                                  backgroundColor: "",
                                  border: "1px solid #F0F0F0",
                                }}
                                name="country"
                              >
                                {countryNames.map((name, index) => (
                                  <option
                                    value={name?.name}
                                    className=""
                                    key={index}
                                    selected={index === 0}
                                  >
                                    {name.name}
                                  </option>
                                ))}
                              </select>
                            </>
                          ) : (
                            <>
                              {field.type === "file" ? (
                                <div>
                                  <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                    accept=".pdf"
                                    id="fileInput"
                                  />
                                  <input
                                    type="text"
                                    className="form-control ps-5"
                                    id="customFileInput"
                                    name="customFileInput"
                                    placeholder="Select a PDF file"
                                    onClick={() => fileInputRef.current.click()}
                                    value={
                                      selectedFile ? selectedFile.name : ""
                                    }
                                    readOnly
                                    style={{ background: "transparent" }}
                                  />
                                </div>
                              ) : (
                                <input
                                  type={field.type}
                                  className="form-control ps-5"
                                  id={field.key}
                                  name={field.key}
                                  placeholder={field.placeholder}
                                  required
                                  min="1"
                                />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary apply_now_btn"
                  style={{ maxWidth: "568px", width: "100%" }}
                  disabled={loading || isLoading}
                >
                  {loading ? (
                    <>
                      <div
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>{" "}
                      Loading...
                    </>
                  ) : (
                    "Apply Now"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplyJobs;
