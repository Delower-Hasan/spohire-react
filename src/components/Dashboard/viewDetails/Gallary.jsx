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

const Gallary = ({ gallary }) => {
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
            {gallary &&
              gallary.length > 0 &&
              gallary?.map((item, idx) => (
                <div key={idx}>
                  <img className="w-100" src={gralleryImg} alt="gallery-img" />
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
            }}>
            About Me
          </h2>
          <p style={{ color: "#8593BC", fontSize: "18px" }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum
            fugit doloremque vero, ab impedit illo dolor debitis repudiandae
            possimus aut ut laboriosam! Reprehenderit dolorum molestias a
            temporibus ipsa sed, sit quos, quidem eum commodi esse voluptatem
            laudantium. Fugit, dolorem. Quia at, commodi vel, magni rem itaque
            amet nobis est in qui dolorum nam quisquam asperiores impedit.
            Veniam esse suscipit iste? Autem voluptates possimus eveniet quas
            eum saepe fugit perferendis sequi, numquam fuga esse dolorem ad
            accusantium, praesentium maxime aliquam totam? Libero sint debitis
            iusto quasi vel natus aut eveniet quo, voluptatibus deserunt, beatae
            dignissimos consequuntur? Deleniti deserunt aspernatur quia! Earum!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallary;
