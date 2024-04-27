import axios from "axios";
import React, { useEffect, useState } from "react";
import addIcon from "../../../assets/addIcon.svg";
import uploadImg from "../../../assets/upload_img.png";

const AddPlayerForm = () => {
  const [countryNames, setCountryNames] = useState([]);
  const [btnAction, setBtnAction] = useState("");
  const handleBtnClick = (option) => {
    setBtnAction(option);
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
    <div>
      <div className="row">
        <div className="col-lg-4">
          <div className="upload_photo">
            <p className="mb-4 text-center">Upload Main Photo</p>

            <div className="upload_thumbnail d-flex align-items-center justify-content-center">
              <img src={uploadImg} alt="upload-img" />
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="row">
            <div className="col-lg-6">
              <div className="input_form pb-4">
                <label htmlFor="name" className="d-block label_name mb-2">
                  Name *
                </label>
                <input
                  required
                  id="name"
                  type="text"
                  placeholder="Enter Your Name"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input_form pb-4">
                <label htmlFor="name" className="d-block label_name mb-2">
                  Last Name *
                </label>
                <input
                  required
                  id="name"
                  type="text"
                  placeholder="Enter Your Name"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="pb-4">
                <label htmlFor="name" className="d-block label_name mb-2">
                  Gender *
                </label>

                <select required className="select_form">
                  <option disabled>Select Here</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input_form pb-4">
                <label htmlFor="name" className="d-block label_name mb-2">
                  Date of birth *
                </label>
                <input
                  required
                  id="name"
                  type="number"
                  placeholder="DD - MM - YYYY"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="  pb-4">
                <label htmlFor="name" className="d-block label_name mb-2">
                  Nationality *
                </label>
                <select required className="select_form">
                  <option>Select Here</option>

                  {countryNames?.map((country, index) => (
                    <option
                      defaultValue={country.name}
                      className=""
                      key={index}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input_form pb-4">
                <label htmlFor="name" className="d-block label_name mb-2">
                  Country of residence *
                </label>
                <select required className="select_form">
                  <option>Select Here</option>
                  {countryNames?.map((country, index) => (
                    <option
                      defaultValue={country.name}
                      className=""
                      key={index}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="input_form pb-4">
            <label htmlFor="name" className="d-block label_name mb-2">
              E-mail *
            </label>
            <input required id="name" type="email" placeholder="Type here" />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="input_form pb-4">
            <label htmlFor="name" className="d-block label_name mb-2">
              Phone number *
            </label>
            <input
              required
              id="name"
              type="number"
              placeholder="Phone number"
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="input_form pb-4">
            <label htmlFor="name" className="d-block label_name mb-2">
              City of residence *
            </label>
            <input
              required
              id="name"
              type="text"
              placeholder="City of residence "
            />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="input_form pb-4">
            <label htmlFor="name" className="d-block label_name mb-2">
              Weight
            </label>
            <input id="name" type="number" placeholder="Weight" />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="input_form pb-4">
            <label htmlFor="name" className="d-block label_name mb-2">
              Height
            </label>
            <input id="name" type="number" placeholder="Height" />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="pb-4">
            <label htmlFor="name" className="d-block label_name mb-2">
              Dominant Hand *
            </label>
            <select required className="select_form">
              <option>Select Here</option>
              <option>Left</option>
              <option>Right</option>
            </select>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="input_form pb-4">
            <label htmlFor="name" className="d-block label_name mb-2">
              Main position *
            </label>
            <input required id="name" type="text" placeholder="Select here" />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="input_form pb-4">
            <label htmlFor="name" className="d-block label_name mb-2">
              Alternative position
            </label>
            <input id="name" type="text" placeholder="Select here" />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="input_form pb-4">
            <label htmlFor="name" className="d-block label_name mb-2">
              Additional passport
            </label>
            <input id="name" type="text" placeholder="Select here" />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="input_form pb-4">
            <label htmlFor="name" className="d-block label_name mb-2">
              Do you currently belong to a club? *
            </label>

            <div className="btn_group d-flex gap-3">
              <button
                onClick={() => handleBtnClick("yes")}
                className={btnAction === "yes" ? "yes" : "no"}>
                Yes
              </button>

              <button
                onClick={() => handleBtnClick("no")}
                className={btnAction === "no" ? "yes" : "no"}>
                No
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="input_form pb-4">
            <label htmlFor="name" className="d-block label_name mb-2">
              Club name
            </label>
            <input id="name" type="text" placeholder="Club name" />
          </div>
        </div>

        <div className="col-lg-6">
          <div className="overflow-hidden bg-white">
            <div className="experience_information">
              <div className="ei_left">
                <p className="f_sfPro text_color_36 fs-4 mb-4">Experience</p>

                <div className="d-flex flex-column align-items-start gap-3">
                  <div className="d-flex gap-4 pb-4">
                    <div className="input_form pb-4">
                      <label htmlFor="name" className="d-block label_name mb-2">
                        From
                      </label>
                      <input id="name" type="text" placeholder="Ex - 1997" />
                    </div>

                    <div className="input_form pb-4">
                      <label htmlFor="name" className="d-block label_name mb-2">
                        To
                      </label>
                      <input id="name" type="text" placeholder="Ex - 2005" />
                    </div>

                    <div className="input_form pb-4">
                      <label htmlFor="name" className="d-block label_name mb-2">
                        Club Name
                      </label>
                      <input id="name" type="text" placeholder="Type here" />
                    </div>
                  </div>

                  <button className="modal_btn py-3 px-4 d-flex gap-2 w-100 justify-content-center">
                    Add more
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none">
                        <path
                          d="M10.5 7.5V12.5M13 10H8M18 10C18 10.9849 17.806 11.9602 17.4291 12.8701C17.0522 13.7801 16.4997 14.6069 15.8033 15.3033C15.1069 15.9997 14.2801 16.5522 13.3701 16.9291C12.4602 17.306 11.4849 17.5 10.5 17.5C9.51509 17.5 8.53982 17.306 7.62987 16.9291C6.71993 16.5522 5.89314 15.9997 5.1967 15.3033C4.50026 14.6069 3.94781 13.7801 3.5709 12.8701C3.19399 11.9602 3 10.9849 3 10C3 8.01088 3.79018 6.10322 5.1967 4.6967C6.60322 3.29018 8.51088 2.5 10.5 2.5C12.4891 2.5 14.3968 3.29018 15.8033 4.6967C17.2098 6.10322 18 8.01088 18 10Z"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* <ViewDetailsMobile user={user} /> */}
            {/* <Gallary gallary={user?.gallary} /> */}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="overflow-hidden bg-white">
            <div className="experience_information">
              <div className="ei_left">
                <p className="f_sfPro text_color_36 fs-4 mb-4">Social Media</p>

                <div className="d-flex flex-column align-items-start gap-3">
                  <div className="input_form pb-4 w-100 pb-4">
                    <label htmlFor="name" className="d-block label_name mb-2">
                      Instagram
                    </label>
                    <input
                      className="w-100"
                      id="name"
                      type="text"
                      placeholder="johnkawalski05"
                    />
                  </div>

                  <div className="input_form pb-4 w-100 pb-4">
                    <label htmlFor="name" className="d-block label_name mb-2">
                      Facebook
                    </label>
                    <input
                      className="w-100"
                      id="name"
                      type="text"
                      placeholder="johnkawalski05"
                    />
                  </div>

                  <div className="input_form pb-4 w-100 pb-4">
                    <label htmlFor="name" className="d-block label_name mb-2">
                      Twitter
                    </label>
                    <input
                      className="w-100"
                      id="name"
                      type="text"
                      placeholder="johnkawalski05"
                    />
                  </div>

                  <div className="input_form pb-4 w-100 pb-4">
                    <label htmlFor="name" className="d-block label_name mb-2">
                      TikTok
                    </label>
                    <input
                      className="w-100"
                      id="name"
                      type="text"
                      placeholder="johnkawalski05"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <ViewDetailsMobile user={user} /> */}
            {/* <Gallary gallary={user?.gallary} /> */}
          </div>
        </div>

        <div className="other_information mt-5 p-4">
          <div className="row">
            <div className="d-flex justify-content-end">
              <button className="py-2 px-4 btn_save">Save</button>
            </div>

            <div className="col-lg-4">
              <div className="oi_title pb-2">
                <h4>Strengths Advantages</h4>
              </div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Type here"></textarea>
            </div>

            <div className="col-lg-4">
              <div className="oi_title pb-2">
                <h4>About Me</h4>
              </div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Type here"></textarea>
            </div>
            <div className="col-lg-4">
              <div className="oi_title pb-2">
                <h4>Expectations From a New Club</h4>
              </div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Type here"></textarea>
            </div>
          </div>
        </div>

        <div className="gallery mt-5 p-4">
          <div className="row">
            <div className="d-flex justify-content-between pb-5">
              <h2 className="fs-4">Gallery</h2>
              <button className="py-2 px-4 btn_save">Save</button>
            </div>
            <div>
              <button className="add-btn p-4 bg-none d-inline-flex align-items-center gap-2">
                <div className="add_icon">
                  <img src={addIcon} alt="add-icon" />
                </div>
                Add Photo or Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlayerForm;
