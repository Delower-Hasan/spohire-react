import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="howWorkRight h-100">
      <div className="ps-2">
        <p>Informations</p>
        <span className="d-block">
          Create an account ad add your
          <br /> profile for those loking.
        </span>
      </div>
      <form>
        <div className="row">
          <div className="col-lg-6">
            <div className="txtInput flex-wrap d-flex  flex-md-row  justify-content-between align-items-center">
              <div>
                <label htmlFor="fName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Hose"
                  id="fName"
                />
              </div>

              <div className="mt-lg-4 mt-0">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="txtInput d-flex  flex-wrap  flex-md-row justify-content-between align-items-center">
              <div>
                <label htmlFor="lName" className="mt-lg-0 mt-4">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lName"
                  placeholder="Morinho"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="cellNo">Mobile Number</label>
                <input
                  type="text"
                  name="phone"
                  id="cellNo"
                  placeholder="+123 456 7890"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 mb-4">
            <p>Kind Of Sports</p>
            <div className="d-flex   flex-wrap  flex-md-row justify-content-start gap-4">
              <div className="playOption">
                <div>
                  <input type="radio" name="football" id="football" />
                  <label htmlFor="football">Football</label>
                </div>
              </div>

              <div className="playOption">
                <div>
                  <input type="radio" name="Baskeball" id="baskeball" />
                  <label htmlFor="baskeball">Baskeball</label>
                </div>
              </div>

              <div className="playOption">
                <div>
                  <input type="radio" name="handball" id="handball" />
                  <label htmlFor="handball">Handball</label>
                </div>
              </div>

              <div className="playOption">
                <div>
                  <input type="radio" name="vollyeball" id="vollyeball" />
                  <label htmlFor="vollyeball">Vollyeball</label>
                </div>
              </div>
            </div>
          </div>
          <button disabled className="sign_up_btn1">
            <Link to="/signup" className="text-white">
              Sign Up Now
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
