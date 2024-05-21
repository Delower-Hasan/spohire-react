import { useEffect, useRef, useState } from "react";
import brows from "../../assets/brows.png";
import { useAddAnnouncementMutation } from "../../features/announcement/announcementApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector } from "react-redux";

const CreateAnnouncements = () => {
  const fileInputRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [addAnnouncement, { isLoading }] = useAddAnnouncementMutation();
  const [loading, setLoading] = useState(false);

  const [imageTitle, setImageTitle] = useState("");

  const [imageFile, setImageFile] = useState(null);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];

    setImageTitle(selectedFile.name);
    setImageFile(selectedFile);
  };

  const [status, setStatus] = useState("In Progress");

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleUpdateClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user?.isSubsCribed) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are not subscribed to any plan.",
      });
      navigate("/pricing");
      return;
    }

    const form = e.target;

    const title = form.title.value;
    const location = form.location.value;
    const budget = Number(form.budget.value);
    const description = form.description.value;
    const country = form.country.value;
    const category = form.category.value;
    const sports = form.sports.value;

    const fromData = new FormData();
    fromData.append("image", imageFile);
    fromData.append("title", title);
    fromData.append("location", location);
    fromData.append("budget", budget);
    fromData.append("country", country);
    fromData.append("description", description);
    // fromData.append("status", status);
    fromData.append("category", category);
    fromData.append("sports", sports);
    fromData.append("creator", user?._id);

    try {
      const response = await addAnnouncement(fromData);
      // console.log(response, "reeessfaskldfj");

      if (response?.data?.success) {
        form.reset();

        navigate("/dashboard/announcements");
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
  const [countryNames, setCountryNames] = useState([]);

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
    <>
      <div className="container">
        <div className=" editAnnouncement_wrapper pt-5">
          <form action="" className="mt-5" onSubmit={handleUpdateClick}>
            <div className="row mt_30 mb_56">
              <div className="col-lg-6">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Title
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Announcement Title"
                    name="title"
                    required
                  />
                </div>
              </div>
              {/* <div className="col-lg-6">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Status
                  </label>
                  <div className="status_buttons">
                    <button
                      onClick={() => setStatus("In Progress")}
                      className={
                        status === "In Progress" ? "active_status" : ""
                      }
                      type="button"
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => setStatus("Published")}
                      className={status === "Published" ? "active_status" : ""}
                      type="button"
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => setStatus("Denied")}
                      className={status === "Denied" ? "active_status" : ""}
                      type="button"
                    >
                      Denied
                    </button>
                  </div>
                </div>
              </div> */}

              <div className="col-lg-6">
                <div className="buttons1">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Category
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    style={{ height: "59px" }}
                    name="category"
                  >
                    <option selected disabled>
                      Select category
                    </option>
                    {[
                      "Tournament",
                      "Championship",
                      "Friendly matches",
                      "Camps",
                      "Tournaments",
                      "Player recruitment",
                      "Others",
                    ].map((name, index) => (
                      <option value={name} key={index}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="buttons1">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Sports
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    style={{ height: "59px" }}
                    name="sports"
                  >
                    <option selected disabled>
                      Select sports
                    </option>
                    {[
                      "Football",
                      "Basketball",
                      "Volleyball",
                      "Handball",
                      "Others",
                    ].map((name, index) => (
                      <option value={name} key={index}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="buttons1">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Country
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        style={{ height: "59px" }}
                        name="country"
                      >
                        <option selected disabled>
                          Select a country
                        </option>
                        {countryNames.map((name, index) => (
                          <option value={name.name} key={index}>
                            {name.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Announcement Title"
                        name="location"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Budget
                  </label>
                  <div className="input-group mb-3">
                    <span
                      className="input-group-text input_budget"
                      id="basic-addon1"
                    >
                      $
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="500"
                      aria-label="Budget"
                      aria-describedby="basic-addon1"
                      required
                      name="budget"
                      min="1"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Image
                </label>

                <div className="input-group mb-3 ">
                  <input
                    onClick={handleUploadButtonClick}
                    type="text"
                    className="form-control position-relative ps-5 pointer"
                    value={imageTitle ? imageTitle : ""}
                    placeholder="Browse file"
                    id="inputGroupFile02"
                  />
                  <div className="form_icons">
                    <img
                      style={{
                        position: "absolute",
                        bottom: "-2px",
                        left: "0",
                      }}
                      src={brows}
                      alt=""
                    />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileInputChange}
                    accept=".jpg, .jpeg, .png, image/jpg, image/jpeg, image/png"
                    required
                  />
                  <p
                    className="input-group-text upload_btn pointer text-light"
                    htmlFor=""
                    onClick={handleUploadButtonClick}
                    style={{ color: "#FFF" }}
                  >
                    Upload
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Description
                  </label>
                  <div className="input-group mb-3">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="We can't wait to share this milestone with our incredible sports community."
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      required
                      name="description"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                className="update_btn1"
                type="submit"
                disabled={loading || isLoading || !imageFile}
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAnnouncements;
