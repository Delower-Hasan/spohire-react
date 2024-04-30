import { useState } from "react";
import { useSelector } from "react-redux";
import arrowDown from "../../../../assets/arrow-down.svg";
import downloadImg from "../../../../assets/download_icon.svg";
import { useGetUserPaymentsQuery } from "../../../../features/payment/paymentApi";
import { convertDate } from "../../../../utils/TimeConverter";
import "./Billing.css";
import Pagination from "../../../Pagination/Pagination";
const Billing = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetUserPaymentsQuery(user?._id);

  const [jobOffersType, setJobOffersType] = useState("Paid");
  // console.log(data?.data, "duser");

  return (
    <>
      <div className="billing_table">
        <div className="d-flex align-items-center px-5 pb-4 justify-content-between">
          <div className="job_offers_topBtn d-flex align-items-center justify-content-between">
            <div className="job_offers_topBtn_left d-flex gap-4">
              <button
                className={`fs-6 fw-medium text_color_80 ${
                  jobOffersType === "All" && "activeBtn"
                }`}
                onClick={() => setJobOffersType("All")}
              >
                All
              </button>

              <button
                className={`fs-6 fw-medium text_color_80 ${
                  jobOffersType === "Paid" && "activeBtn"
                }`}
                onClick={() => setJobOffersType("Paid")}
              >
                Paid
              </button>
              {/* <button
                className={`fs-6 fw-medium text_color_80 ${
                  jobOffersType === "Pending" && "activeBtn"
                }`}
                onClick={() => setJobOffersType("Pending")}
              >
                Pending
              </button> */}
            </div>
          </div>

          <button className="export_csv">Export as CSV</button>
        </div>

        <div className="billing_header">
          <div className="col2">
            <p className="tableHead" style={{ cursor: "pointer" }}>
              TransactionId
              <img src={arrowDown} style={{ paddingLeft: "10px" }} alt="" />
            </p>
          </div>
          <div className="col3 me-lg-0 me-2">
            <p className="tableHead" style={{ cursor: "pointer" }}>
              Plan Name
              <img src={arrowDown} style={{ paddingLeft: "10px" }} alt="" />
            </p>
          </div>
          <div className="col3 me-lg-0 me-2">
            <p className="tableHead" style={{ cursor: "pointer" }}>
              Amount
              <img src={arrowDown} style={{ paddingLeft: "10px" }} alt="" />
            </p>
          </div>
          <div className="col3 me-lg-0 me-2">
            <p className="tableHead" style={{ cursor: "pointer" }}>
              Date
              <img src={arrowDown} style={{ paddingLeft: "10px" }} alt="" />
            </p>
          </div>
          <div className="col3 me-lg-0 me-2">
            <p className="tableHead" style={{ cursor: "pointer" }}>
              Invoice
              <img src={arrowDown} style={{ paddingLeft: "10px" }} alt="" />
            </p>
          </div>
          <div className="col3 me-lg-0 me-2">
            <p className="tableHead" style={{ cursor: "pointer" }}>
              Status
              <img src={arrowDown} style={{ paddingLeft: "10px" }} alt="" />
            </p>
          </div>
        </div>
        {/* table */}
        <div className="table_row_wrapper">
          {data?.data &&
            data?.data.length > 0 &&
            data?.data.map((item, idx) => (
              <>
                <div className="billing_header1" key={idx}>
                  <div className="col1">
                    <div className="form-check form_mobile">
                      <input
                        className="form-check form_mobile-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                      />
                    </div>
                  </div>
                  <div className="col2">
                    <p>{item?.transactionId}</p>
                  </div>
                  <div className="col3 me-lg-0 me-2">
                    <p
                      style={{
                        color:
                          item?.planName === "Gold"
                            ? "#F9D266"
                            : "Silver"
                            ? "#A3AED0"
                            : "Bronze"
                            ? "#C78A4E"
                            : null,
                      }}
                    >
                      {item?.planName}
                    </p>
                  </div>
                  <div className="col3 me-lg-0 me-2">
                    <p style={{ color: "#1E2128" }}>USD {item?.amount}</p>
                  </div>
                  <div className="col3 me-lg-0 me-2">
                    <p>{convertDate(item?.createdAt)}</p>
                  </div>
                  <div className="col3 me-lg-0">
                    <button className="bg-transparent flex items-center justify-content-center">
                      <p className="pr-2">21-12-2009</p>
                      <img src={downloadImg} alt="download-img" />
                    </button>
                  </div>
                  <div className="col3 me-lg-0">
                    <button
                      className="paid_btn border-0 px-5 py-3"
                      style={{
                        color: item?.status === "Paid" && "#05CD99",
                        backgroundColor:
                          item?.status === "Paid" ? "#F0FFFB" : "#FFF9E7",
                      }}
                    >
                      Paid
                    </button>
                  </div>
                </div>
              </>
            ))}
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Billing;
