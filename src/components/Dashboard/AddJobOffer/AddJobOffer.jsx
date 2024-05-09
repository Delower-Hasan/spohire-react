/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAddJobMutation } from "../../../features/job/jobApi";
import useClickOutside from "../../../hooks/useClickOutside.jsx";
import { setExpireDate } from "../../../utils/setExpireDate.js";
import "./AddJobOffer.css";
import AddJobOfferModal from "./AddJobOfferModal.jsx";
import AddJobOfferModalTwo from "./AddJobOfferModalTwo.jsx";

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

const AddJobOffer = ({ setAddJobOffer }) => {
  // const [nextOption, setNextOption] = useState("AddJobOfferModal");
  const { user } = useSelector((state) => state.auth);
  const [image, setImage] = useState("");
  const [step, setStep] = useState(1);
  const [imageFile, setImageFIle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [workplaceType, setWorkplaceType] = useState("");
  const [countryNames, setCountryNames] = useState([]);
  const [role, setRole] = useState("");
  const [jobType, setJobType] = useState("");
  const [addJob, { isLoading: addingJob }] = useAddJobMutation();
  const navigate = useNavigate();
  const addJobOfferRef = useClickOutside(() => setAddJobOffer(false));

  const [selectedSubscription, setSelectedSubscription] = useState({
    duration: 1,
    price: 10,
    month: 1,
  });

  const [jobData, setJobData] = useState({});
  const [errorData, setErrorData] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const date = new Date();
    const jobDataInfo = {
      ...jobData,
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
      const response = await addJob(formData);
      console.log("resss", response);
      if (response?.data?.success) {
        setLoading(false);
        setAddJobOffer(false);
        navigate("/dashboard");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Job Created successfully`,
        });
        return true;
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
      setErrorData(error?.message);
      setLoading(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile.name);
    setImageFIle(selectedFile);
    setJobData({ ...jobData, club_logo: selectedFile });
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
    <div className={`addplayer_modal`}>
      <div ref={addJobOfferRef} className="inner">
        <div className="p-0 add_job_offer_admin">
          <div className="personal_info_edit_wrapper add_job_offer">
            {errorData && (
              <p style={{ color: "red", textAlign: "center" }}>{errorData}</p>
            )}

            <div
              className="d-flex flex-column align-items-start gap-3"
              style={{ marginBottom: "40px" }}>
              <div className="w-100 player_job_form_wrapper mt-0">
                {step === 1 ? (
                  <AddJobOfferModal
                    fileInputRef={fileInputRef}
                    handleFileChange={handleFileChange}
                    image={image}
                    selectedCountry={selectedCountry}
                    countryNames={countryNames}
                    options={options}
                    WorkplaceOptions={WorkplaceOptions}
                    categoryOptions={categoryOptions}
                    handleInputChange={handleInputChange}
                  />
                ) : step === 2 ? (
                  <AddJobOfferModalTwo
                    handleSubmit={handleSubmit}
                    addingJob={addingJob}
                    // setNextOption={setNextOption}
                    selectedSubscription={selectedSubscription}
                    setSelectedSubscription={setSelectedSubscription}
                    setAddJobOffer={setAddJobOffer}
                    // closeModal={closeModal}
                  />
                ) : null}

                {step !== 2 && (
                  <div className="d-flex gap-3 justify-content-center">
                    <button
                      onClick={() => setAddJobOffer(false)}
                      className="submit_now_btn cancel m-0"
                      type="button">
                      Cancel
                    </button>

                    <button
                      className="submit_now_btn m-0"
                      type="button"
                      onClick=
                      {() => {
                        const requiredFields = [
                          "job_title",
                          "workplaceType",
                          "job_location",
                          "country",
                          "category",
                          "country",
                          "jobType",
                          "language",
                          "salary",
                          "description",
                        ];
                        const missingFields = requiredFields.filter(
                          (field) => !jobData[field]
                        );
                        if (missingFields.length > 0) {
                          alert(
                            `Fill up the required fields: ${missingFields.join(
                              ", "
                            )}`
                          );
                        } else {
                          setStep((prevStep) => prevStep + 1);
                        }
                      }}
                      > Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJobOffer;
