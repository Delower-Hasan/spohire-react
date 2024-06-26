/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAddAnnouncementMutation } from "../../../features/announcement/announcementApi.js";
import useClickOutside from "../../../hooks/useClickOutside.jsx";
import { setExpireDate } from "../../../utils/setExpireDate.js";
import CreateAnnouncemnetModal from "./CreateAnnouncemnetModal.jsx";
import PaymentProcess from "./PaymentProcess.jsx";
import "./Announcements.css";

const options = [
  { value: "Friendly-matches", label: "Friendly-matches" },
  { value: "Camps", label: "Camps" },
  { value: "Tournaments", label: "Tournaments" },
  { value: "Player-recruitment", label: "Player-recruitment" },
  { value: "Others", label: "Others" },
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

const AddAnnouncement = ({ setAnnouncementIsModalOpen }) => {
  const [nextOption, setNextOption] = useState("AddJobOfferModal");
  const { user } = useSelector((state) => state.auth);
  const [image, setImage] = useState("");
  const [imageFile, setImageFIle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [workplaceType, setWorkplaceType] = useState("");
  const [countryNames, setCountryNames] = useState([]);
  const [role, setRole] = useState("");
  const [jobType, setJobType] = useState("");
  const [addAnnouncement, { isLoading: addingAnnounement }] =
    useAddAnnouncementMutation();
  const navigate = useNavigate();
  const [announcementData, setAnnouncementData] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedSubscription, setSelectedSubscription] = useState({
    duration: 1,
    price: 10,
    month: 1,
  });
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementData({ ...announcementData, [name]: value });
    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile.name);
    setImageFIle(selectedFile);
    setAnnouncementData({ ...announcementData, image: selectedFile });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    const date = new Date();
    const jobDataInfo = {
      ...announcementData,
      subscriptionDate: date,
      expirationDate: setExpireDate(selectedSubscription?.month),
      packagechoose: selectedSubscription?.month,
      creator: user?._id,
    };
    const formData = new FormData();
    Object.entries(jobDataInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await addAnnouncement(formData);
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Announcement Created successfully`,
        });
        setLoading(false);
        setAnnouncementIsModalOpen(false);
        return true;
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
      setLoading(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json"
      )
      .then((response) => setCountryNames(response.data))
      .catch((error) => console.log(error));
  }, []);

  const validateFields = () => {
    const requiredFields = [
      "title",
      "sports",
      "category",
      "location",
      "country",
      "budget",
      "description",
    ];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!announcementData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextOption = () => {
    setNextOption("AddJobOfferModalTwo");
  };

  const annoucnementRef = useClickOutside(() =>
    setAnnouncementIsModalOpen(false)
  );
  const [step, setStep] = useState(1);

  return (
    <div className="addplayer_modal">
      <div className="inner">
        <div className="modal_head">
          <div className="justify-content-start p-0">
            <h2>{step === 1 ? "Create Announcement" : "Payment Process"}</h2>
          </div>
          <div className="step_number d-flex justify-content-end">
            <p>
              <span style={{ color: "#0095FF" }}>{step === 1 ? "1" : "2"}</span>{" "}
              of 2
            </p>
          </div>
          <div className={"stepBorder"}></div>
        </div>

        <Modal.Body className="p-0 add_job_offer_admin">
          <div className="personal_info_edit_wrapper add_job_offer">
            <div
              className="d-flex flex-column align-items-start gap-3"
              style={{ marginBottom: "40px" }}
            >
              <div className="w-100 player_job_form_wrapper mt-0">
                {step === 1 ? (
                  <CreateAnnouncemnetModal
                    fileInputRef={fileInputRef}
                    handleFileChange={handleFileChange}
                    image={image}
                    selectedCountry={selectedCountry}
                    countryNames={countryNames}
                    options={options}
                    WorkplaceOptions={WorkplaceOptions}
                    categoryOptions={categoryOptions}
                    handleInputChange={handleInputChange}
                    errors={errors}
                  />
                ) : step === 2 ? (
                  <PaymentProcess
                    selectedSubscription={selectedSubscription}
                    setSelectedSubscription={setSelectedSubscription}
                    handleSubmit={handleSubmit}
                    addingAnnounement={addingAnnounement}
                    setAnnouncementIsModalOpen={setAnnouncementIsModalOpen}
                  />
                ) : null}

                {/* {step !== 2 && (
                  <div className="d-flex gap-3 justify-content-center">
                    <button
                      className="submit_now_btn cancel m-0"
                      type="button"
                      onClick={() => setAnnouncementIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (validateFields()) {
                          setStep((prevStep) => prevStep + 1);
                        } else {
                          alert("Please fill in all required fields.");
                        }
                      }}
                      className="submit_now_btn m-0"
                      type="button"
                    >
                      Next
                    </button>
                  </div>
                )} */}

                {/* stepers */}
                <div
                  className={`d-flex gap-3 justify-content-center ${
                    step === 2 && "mt-5"
                  }`}
                >
                  <button
                    className="submit_now_btn cancel m-0"
                    type="button"
                    onClick={() => {
                      if (step === 2) {
                        setStep(1);
                      } else {
                        setAnnouncementIsModalOpen(false);
                      }
                    }}
                  >
                    {step === 2 ? "Back" : "Cancel"}
                  </button>
                  {step === 1 && (
                    <button
                      onClick={() => {
                        if (validateFields()) {
                          setStep((prevStep) => prevStep + 1);
                        } else {
                          alert("Please fill in all required fields.");
                        }
                      }}
                      className="submit_now_btn m-0"
                      type="button"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </div>
    </div>
  );
};

export default AddAnnouncement;
