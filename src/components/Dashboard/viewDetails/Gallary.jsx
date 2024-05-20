import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import gralleryImg from "../../../assets/gallery_img.png";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#2B3674",
        width: "40px",
        height: "40px",
        right: "-42px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#2B3674",
        width: "40px",
        height: "40px",
        left: "-42px",
      }}
      onClick={onClick}
    />
  );
}

const Gallary = ({ gallary, user }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center gap-5">
        <div className="w-50">
          <Slider {...settings}>
            {user?.gallary &&
              user?.gallary.length > 0 &&
              user?.gallary.map((item, idx) => (
                <div key={idx}>
                  <img
                    style={{ height: "100px" }}
                    className="w-50"
                    src={`${
                      process.env.NODE_ENV !== "production"
                        ? import.meta.env.VITE_LOCAL_API_URL
                        : import.meta.env.VITE_LIVE_API_URL
                    }/api/v1/uploads/${item}`}
                    // src={item.path}
                    alt={`gallery-img-${idx}`}
                  />
                </div>
              ))}
          </Slider>
        </div>
        <div className="w-20"></div>
        <div className="w-50">
          <h2
            className="fs-4 mb-3"
            style={{
              color: "#4C4E52",
              fontWeight: "500",
              letterSpacing: "-0.48px",
            }}
          >
            About Me
          </h2>
          <p style={{ color: "#8593BC", fontSize: "18px" }}>{user?.about_me}</p>
        </div>
      </div>
    </div>
  );
};

export default Gallary;
