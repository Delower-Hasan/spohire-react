/* eslint-disable no-unused-vars */
import arrowRight from "../../assets/ArrowRight.png";
import "./Login.css";
import LoginSlider from "./LoginSlider";
import { useLoginUserMutation } from "../../features/auth/authApi";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import passlock from "../../assets/passlock.png";

const Login = () => {
  const [loginUser, { isLoading, error, isError }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    const data = {
      email,
      password,
    };

    try {
      const response = await loginUser(data);
      if (response?.data?.user) {
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
  };
  return (
    <>
      <div className="container">
        <div className="row align-items-center" style={{ margin: "80px 0" }}>
          <div className="col-lg-6 p-0">
            <div
              className="login-left_bg_img d-none d-lg-block"
              style={{ position: "relative" }}
            >
              <div
                className="login_slider"
                style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
              >
                <LoginSlider />
              </div>
            </div>
          </div>
          <div className="col-lg-6 p-0" style={{ height: "100vh" }}>
            <div className="login_wrapper h-100 ">
              <div>
                <h3>Log in</h3>
                <p>Fill all input to Login on your account</p>
                <form onSubmit={handleSubmit}>
                  <div className="right-inner-addon input-container">
                    <label htmlFor="">Email *</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control login_input"
                      placeholder="Enter Your Email"
                      required
                      style={{ color: "#212529", backgroundColor: "#F3F7FF" }}
                    />
                  </div>
                  <div className="right-inner-addon input-container">
                    <i
                      className="fa-solid fa-lock"
                      style={{ color: "#9CA3A9" }}
                    ></i>
                    <label htmlFor="">Password*</label>

                    <div className="position-relative">
                      <div className="passlock">
                        <img src={passlock} alt="" />
                      </div>
                      <input
                        type="password"
                        className="form-control login_input"
                        placeholder="Enter Your Password"
                        name="password"
                        required
                        style={{
                          paddingLeft: "40px",
                          color: "#212529",
                          backgroundColor: "#F3F7FF",
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      className="login-btn"
                      type="submit"
                      disabled={isLoading}
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
                        <>Log in</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
              <div className="d-flex justify-content-center home_page_link">
                <Link to="/">Go to homepage</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
