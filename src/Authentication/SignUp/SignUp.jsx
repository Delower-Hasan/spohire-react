/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import arrowRight from "../../assets/ArrowRight.png";
import { useEffect, useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { convertDate } from "../../utils/TimeConverter";
import { useRegisterUserMutation } from "../../features/auth/authApi";
import Swal from "sweetalert2";
import axios from "axios";
import signupImg from "../../assets/sign-up.png";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [functionType, setFunctionType] = useState("");
  const [sports, setSports] = useState("");
  const [countryCode, setCoutryCode] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const button_disability =
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !nationality ||
    !dateOfBirth ||
    !phoneNumber ||
    !functionType ||
    !countryCode ||
    !sports ||
    isLoading;

  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      role: functionType,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      nationality,
      date_of_birth: convertDate(dateOfBirth),
      phone_number: {
        country_code: countryCode,
        number: Number(phoneNumber),
      },
      sports,
    };

    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must contain at least one uppercase, one lowercase, one special character, one digit and it should be at least 8 characters long.",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password doesn't matched!",
      });
      return;
    }
    try {
      console.log("formData", formData);
      const response = await registerUser(formData);
      if (response?.data?.status === 200) {
        navigate("/dashboard");
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
    // localStorage.setItem("register", JSON.stringify(formData));
    // navigate('/addPlayer')
  };
  const [countryNames, setCountryNames] = useState([]);
  const [buttonErrorMessages, setButtonErrorMessages] = useState(false);
  const [errorss, setErrors] = useState([]);

  const handleButtonError = () => {
    let errors = [];
    if (!button_disability) {
      setButtonErrorMessages(false);
      setErrors([]);
    } else {
      if (!firstName) errors.push("firstName");
      if (!lastName) errors.push("lastName");
      if (!email) errors.push("email");
      if (!password) errors.push("password");
      if (!nationality) errors.push("nationality");
      if (!dateOfBirth) errors.push("dateOfBirth");
      if (!phoneNumber) errors.push("phoneNumber");
      if (!functionType) errors.push("functionType");
      if (!countryCode) errors.push("countryCode");
      if (!sports) errors.push("sports");
      setButtonErrorMessages(true);
      setErrors(errors);
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
    <>
      <div className="d-flex  flex-lg-row flex-column  overflow-hidden">
        <div className="" style={{ margin: "60px 0px 80px 100px" }}>
          <img className="" src={signupImg} alt="image" />
        </div>

        <div
          className="login_wrapper"
          style={{ margin: "60px 100px 80px 0px", width: "100%" }}
        >
          <div>
            <h3>Create new account</h3>
            <p>Fill all input to create a account</p>
            <form onSubmit={handleFormSubmit}>
              <div className="row right-inner-addon input-container">
                <div className="col-6">
                  <label htmlFor="">First Name *</label>
                  <input
                    type="text"
                    className="mt-2 form-control login_input"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="">Last Name *</label>
                  <input
                    type="text"
                    className="form-control login_input"
                    placeholder="Enter Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="right-inner-addon input-container">
                <label htmlFor="">Email *</label>

                <input
                  type="email"
                  className="form-control login_input"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ color: "#212529", backgroundColor: "#F3F7FF" }}
                />
              </div>
              <div className="d-flex gap-3">
                <div className=" input-container" style={{ width: "100%" }}>
                  <label htmlFor="">Password*</label>

                  <input
                    type="password"
                    className="form-control login_input"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ color: "#212529", backgroundColor: "#F3F7FF" }}
                    required
                  />
                </div>
                <div
                  className=" w-full input-container"
                  style={{ width: "100%" }}
                >
                  <label htmlFor="">Confirm Password*</label>
                  <input
                    type="password"
                    className="form-control login_input"
                    placeholder="Enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ color: "#212529", backgroundColor: "#F3F7FF" }}
                    required
                  />
                </div>
              </div>
              <div className="row flex-wrap date_wrapper mb-3 align-items-center">
                <div className="col-lg-4 input-container">
                  <label htmlFor="">Nationality *</label>

                  <select
                    className="form-select login_select "
                    aria-label="Default select example"
                    style={{
                      height: "46px",
                      backgroundColor: "#F3F7FF",
                      border: " 0.707px solid rgba(0, 0, 0, 0.02)",
                    }}
                    onChange={(e) => setNationality(e.target.value)}
                  >
                    <option disabled selected>
                      {" "}
                      Select country
                    </option>
                    {countryNames.map((name, index) => (
                      <option value={name.name} key={index}>
                        {name.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-8 input-container">
                  <label
                    htmlFor=""
                    className=""
                    style={{ marginBottom: "10px" }}
                  >
                    Date of birth
                  </label>

                  <input
                    type="date"
                    className="form-control login_input"
                    placeholder="Date Of Birth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row email_input input-container">
                <label htmlFor="">Phone number</label>
                <div className="col-4">
                  <select
                    className="form-select login_input"
                    aria-label="Default select example"
                    style={{
                      height: "46px",
                      backgroundColor: "#F3F7FF",
                      border: " 0.707px solid rgba(0, 0, 0, 0.02)",
                    }}
                    onChange={(e) => setCoutryCode(e.target.value)}
                  >
                    <option disabled selected>
                      {" "}
                      Select country code
                    </option>
                    {countryNames.map((name, index) => (
                      <option value={name.dial_code} key={index}>
                        {name.dial_code}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-8">
                  <div className="phone_number">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={phoneNumber}
                      style={{ color: "#212529", backgroundColor: "#F3F7FF" }}
                      //  onChange={(e) => setPhoneNumber(e.target.value)}
                      onChange={(e) => {
                        const inputVal = e.target.value;
                        const validatedInput = inputVal.replace(
                          /[^0-9+\-]/g,
                          ""
                        );
                        setPhoneNumber(validatedInput);
                      }}
                      placeholder="012 345 6789"
                    />
                  </div>
                </div>
              </div>
              <label className="label_text">Function</label> <br />
              <>
                {["Player", "Coach", "Manager", "Other"].map((data) => (
                  <>
                    <button
                      style={{ marginBottom: "30px" }}
                      className={`${
                        functionType === data
                          ? "function_btn_active"
                          : "function_btn"
                      } `}
                      type="button"
                      onClick={() => setFunctionType(data)}
                    >
                      {data}
                    </button>
                  </>
                ))}
              </>
              <br />
              <label className="label_text">Sports</label> <br />
              {["Football", "Basketball", "Volleyball", "Handball"].map(
                (data) => (
                  <>
                    <button
                      className={`${
                        sports === data ? "function_btn_active" : "function_btn"
                      } `}
                      type="button"
                      onClick={() => setSports(data)}
                    >
                      {data}
                    </button>
                  </>
                )
              )}
              {/* terms and condition */}
              <div className="d-flex justify-content-start terms_condition">
                <label
                  htmlFor="checkBox"
                  className="d-flex align-items-center gap-2"
                >
                  <input type="checkbox" id="checkBox" />I agree to all
                  statements included in terms of servicee.
                </label>
              </div>
              <div
                className="d-flex justify-content-center pointer"
                onClick={handleButtonError}
              >
                <button
                  type="submit"
                  className="login-btn"
                  disabled={button_disability}
                >
                  {isLoading ? (
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
                    <>Create an account</>
                  )}
                </button>
              </div>
              {errorss?.length > 0 && (
                <div className="text-errors text-center mt-2">
                  {errorss?.join(", ")} fields required!
                </div>
              )}
            </form>
            <div className="d-flex justify-content-center mt-2 gap-1 already_acnt_text">
              Already have and account? <Link to="/login">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
