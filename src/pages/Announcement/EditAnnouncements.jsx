/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from "react";
import brows from "../../assets/brows.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useEditAnnoucementMutation,
  useGetAnnouncementByIdQuery,
} from "../../features/announcement/announcementApi";
import Swal from "sweetalert2";

const EditAnnouncements = () => {
  const fileInputRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();
  const { data } = useGetAnnouncementByIdQuery(id);

  const [announcementDatas, setAnnouncementDatas] = useState({});
  const [editingInfo, setEditingInfo] = useState({});

  const navigate = useNavigate();

  const [editAnnoucement, { isLoading }] = useEditAnnoucementMutation();
  const [loading, setLoading] = useState(false);

  const [imageTitle, setImageTitle] = useState("");

  const [imageFile, setImageFile] = useState(null);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];

    setImageTitle(selectedFile.name);
    setImageFile(selectedFile);
    setEditingInfo({ ...editingInfo, image: selectedFile });
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setAnnouncementDatas({ ...announcementDatas, [name]: value });
    setEditingInfo({ ...editingInfo, [name]: value });
  };

  const handleUpdateClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const fromData = new FormData();
    Object.entries(editingInfo).forEach(([key, value]) => {
      fromData.append(key, value || "");
    });
    try {
      const response = await editAnnoucement({ id: id, data: fromData });
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

  useEffect(() => {
    const info = {
      budget: data?.data?.budget,
      category: data?.data?.category,
      country: data?.data?.country,
      description: data?.data?.description,
      image: data?.data?.image,
      location: data?.data?.location,
      sports: data?.data?.sports,
      status: data?.data?.status,
      title: data?.data?.title,
    };
    setAnnouncementDatas(info);
  }, [data, id]);

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
                    value={announcementDatas?.title}
                    onChange={handleInputChange}
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
                      onClick={() => {
                        setAnnouncementDatas({
                          ...announcementDatas,
                          status: "In Progress",
                        });
                        setEditingInfo({
                          ...editingInfo,
                          status: "In Progress",
                        });
                      }}
                      className={
                        announcementDatas?.status === "In Progress"
                          ? "active_status"
                          : ""
                      }
                      type="button"
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => {
                        setAnnouncementDatas({
                          ...announcementDatas,
                          status: "Published",
                        });
                        setEditingInfo({
                          ...editingInfo,
                          status: "Published",
                        });
                      }}
                      className={
                        announcementDatas?.status === "Published"
                          ? "active_status"
                          : ""
                      }
                      type="button"
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => {
                        setAnnouncementDatas({
                          ...announcementDatas,
                          status: "Denied",
                        });
                        setEditingInfo({
                          ...editingInfo,
                          status: "Denied",
                        });
                      }}
                      className={
                        announcementDatas?.status === "Denied"
                          ? "active_status"
                          : ""
                      }
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
                    onChange={handleInputChange}
                  >
                    <option selected disabled>
                      Select Category
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
                      <option
                        value={name}
                        key={index}
                        selected={announcementDatas?.category === name}
                      >
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
                    onChange={handleInputChange}
                  >
                    <option selected disabled>
                      Select sports
                    </option>
                    {["Football", "Basketball", "Volleyball", "Handball"].map(
                      (name, index) => (
                        <option
                          value={name}
                          key={index}
                          selected={announcementDatas?.sports === name}
                        >
                          {name}
                        </option>
                      )
                    )}
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
                        onChange={handleInputChange}
                      >
                        <option selected disabled>
                          Select a country
                        </option>
                        {countryNames.map((name, index) => (
                          <option
                            value={name.name}
                            key={index}
                            selected={announcementDatas?.country}
                          >
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
                        value={announcementDatas?.location}
                        onChange={handleInputChange}
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
                      value={announcementDatas?.budget}
                      onChange={handleInputChange}
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
              <div className="col-lg-12">
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
                      style={{ height: 200 }}
                      aria-describedby="basic-addon1"
                      required
                      name="description"
                      value={announcementDatas?.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="update_btn1" type="submit" disabled={loading}>
                {loading ? "Editing..." : "Edit Annountment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditAnnouncements;
