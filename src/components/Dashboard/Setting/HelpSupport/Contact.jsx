import React from "react";
import "./HelpSupport.css";
import contact from "../../../../assets/contact.png";
import call from "../../../../assets/call.png";
import email from "../../../../assets/email.png";
import location from "../../../../assets/location-contact.png";

const Contact = () => {
  return (
    <div className="contact">
      <div className="row">
        <div className="col-md-6 talk">
          <img className="mb-5" src={contact} alt="" />
          <h3>Let's talk with Us</h3>
          <p className="mb-5">
            Have a project in mind that you think we’d be a great fit for it?
            We’d love to know what you’re thinking
          </p>
          <h6>Contact Info :</h6>
          <div className="d-flex align-items-center gap-2 mb-4">
            <div className="icon">
              <img src={call} alt="" />
            </div>
            <p>Phone Number: (62) 1829017</p>
          </div>
          <div className="d-flex align-items-center gap-2 mb-4">
            <div className="icon">
              <img src={email} alt="" />
            </div>
            <p>Email: Hello@studio.co</p>
          </div>
          <div className="d-flex align-items-center gap-2 mb-4">
            <div className="icon">
              <img src={location} alt="" />
            </div>
            <p>Map Street: John Bucarest St. 199</p>
          </div>
        </div>
        <div className="col-md-6 form">
          <form>
            <div className="mb-5">
              <label>Full Name</label>
              <input type="text" placeholder="Input your full name in here" />
            </div>
            <div className="mb-5">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Input your email address in here"
              />
            </div>
            <div className="mb-5">
              <label>Messages</label>
              <textarea
                cols="30"
                rows="10"
                placeholder="Write your messages in here"
              ></textarea>
            </div>
            <div className="text-end">
              <button className="btn btn-primary">Send Messages</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
