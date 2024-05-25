import React, { useState } from "react";
import "./HelpSupport.css";
import contact from "../../../../assets/contact.png";
import call from "../../../../assets/call.png";
import email from "../../../../assets/email.png";
import location from "../../../../assets/location-contact.png";
import { useAddContactMutation } from "../../../../features/contact/contactApi";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    message: "",
  });

  const [addContact, { isLoading }] = useAddContactMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addContact(formData);
      console.log(response.data);
      alert(response.data.message);
      setFormData({
        fullName: "",
        emailAddress: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                placeholder="Input your full name in here"
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label>Email Address</label>
              <input
                type="email"
                required
                name="emailAddress"
                value={formData.emailAddress}
                placeholder="Input your email address in here"
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label>Messages</label>
              <textarea
                name="message"
                cols="30"
                rows="10"
                required
                value={formData.message}
                placeholder="Write your messages in here"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="text-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Messages"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
