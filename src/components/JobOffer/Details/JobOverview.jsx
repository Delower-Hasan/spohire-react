import calender from "../../../assets/CalendarBlank.svg";
// import timer from "./../../../assets/timer.svg";
import timer from "../../../assets/Timer.svg";
import stack from "../../../assets/Stack.svg";
// import stack from "../../../assets/stack.svg";
import wallet from "../../../assets/Wallet.svg";
// import wallet from "../../../assets/wallet.svg";
import briefcase from "../../../assets/briefcase.svg";
// import briefcase from "../../../assets/briefcase.svg";
import { PiLinkSimpleThin } from "react-icons/pi";
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import moment from "moment";
import { useLocation } from "react-router-dom";
const JobOverview = ({ data: jobData }) => {
  const location = useLocation();

  function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = import.meta.env.VITE_DOMAIN_URL + text;
    // Make textarea non-editable to be able to copy text
    textArea.setAttribute("readonly", "");
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px"; // Move textarea offscreen
    document.body.appendChild(textArea);
    textArea.select();

    document.execCommand("copy");
    document.body.removeChild(textArea); // Remove the textarea
    alert("Link Copied");
  }

  const jobLabelHandler = () => {
    switch (jobData?.packagechoose) {
      case 1:
        return "Entry Level";
        break;
      case 2:
        return "Mid Level";
        break;
      case 3:
        return "Mid Level";
        break;

      default:
        return "Entry Level";
        break;
    }
  };

  const details = [
    {
      pic: calender,
      label: "Job Posted:",
      result: moment(jobData?.createdAt).format("Do MMMM, YYYY"),
    },
    {
      pic: timer,
      label: "Job expire in:",
      result: moment(jobData?.expirationDate).format("Do MMMM, YYYY"),
    },
    {
      pic: stack,
      label: "Job Level:",
      result: jobLabelHandler(),
    },
    {
      pic: wallet,
      label: "Language",
      result: jobData?.language,
    },
    // {
    //   pic: briefcase,
    //   label: "Education",
    //   result: "Entry Level",
    // },
  ];
  return (
    <div className="description_outline job_overview">
      <p className="title mb-5">Job Overview</p>
      <div className="row g-4 mb-5">
        {details?.map((data, index) => (
          <div className="col-lg-4" key={index}>
            <img className="mb-3" src={data?.pic} alt="" />
            <p className="label mb-1">{data?.label}</p>
            <p className="result">{data?.result}</p>
          </div>
        ))}
      </div>
      <p className="title mb-1">Share this job:</p>
      <div className="d-flex items-center gap-1">
        <button
          style={{ color: "#05CD99", fontSize: "16px" }}
          onClick={() => copyTextToClipboard(`${location.pathname}`)}
        >
          <PiLinkSimpleThin /> Copy Links
        </button>

        <button>
          <FaLinkedin />
        </button>
        <button>
          <FaFacebook />
        </button>
        <button>
          <FaTwitter />
        </button>
        <button>
          <TfiEmail />
        </button>
      </div>
    </div>
  );
};

export default JobOverview;
