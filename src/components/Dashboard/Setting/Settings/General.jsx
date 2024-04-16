import React from "react";

const General = () => {
  return (
    <div className="settings mb-4">
      <h4>Invoices</h4>
      <form>
        <div className="mb-4">
          <label>Name</label>
          <input type="text" placeholder="Type here" />
        </div>
        <div className="d-flex align-items-center gap-4 mb-4 ">
          <div className="w-100">
            <label>Street</label>
            <input type="text" placeholder="Type here" />
          </div>
          <div className="w-100">
            <label>Street Number</label>
            <input type="number" placeholder="Type here" />
          </div>
        </div>
        <div className="d-flex align-items-center gap-4 mb-4">
          <div className="w-100">
            <label>City</label>
            <input type="text" placeholder="Type here" />
          </div>
          <div className="w-100">
            <label>Zip Code</label>
            <input type="number" placeholder="Type here" />
          </div>
        </div>
        <div className="d-flex align-items-center gap-4 mb-4">
          <div className="w-100">
            <label>Country</label>
            <input type="text" placeholder="Type here" />
          </div>
          <div className="w-100">
            <label>Tax no.</label>
            <input type="number" placeholder="Type here" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default General;
