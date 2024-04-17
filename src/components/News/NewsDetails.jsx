import React from "react";
import insta from "../../assets/ninsta.png";
import fb from "../../assets/nfb.png";
import ntwitter from "../../assets/ntwitter.png";
import nlinkdin from "../../assets/nlinkdin.png";
import n1 from "../../assets/news/n1.png";
import NewsSlider from "./NewsSlider";
const NewsDetails = () => {
  return (
    <>
      <div className="container">
        <div className="news_details_wrapper">
          <h2>Baku 2024 world best basketball Championships </h2>
          <div className="d-flex flex-wrap align-items-center date">
            <p className="">March 21, 2024 17:00 IST</p>
            <div className="d-flex flex-wrap gap-4">
              <img src={insta} alt="" />
              <img src={fb} alt="" />
              <img src={ntwitter} alt="" />
              <img src={nlinkdin} alt="" />
            </div>
          </div>
          <div className="line_design"></div>

          <p>
            Lorem is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose
          </p>

          <div className="d-flex flex-wrap" style={{ gap: "50px" }}>
            <div className="">
              <img style={{ height: "400px" }} src={n1} alt="n1" />
            </div>
            <div className="">
              <p>
                Lorem is a long established fact that a reader will be
                distracted by the readable content of a page when looking at its
                layout. The point of using Lorem Ipsum is that it has a
                more-or-less normal distribution of <br /> letters, as opposed
                to using 'Content here, content here', making it look like
                readable English. Many desktop publishing packages and web page
                editors now use Lorem Ipsum as their default model text, and a
                search for 'lorem ipsum' will uncover many web sites still in
                their infancy. Various versions have evolved over the years,
                sometimes by accident, sometimes on purpose and a search for{" "}
                <br /> 'lorem ipsum' will uncover many web sites still in their
                infancy. Various versions have evolved over the years, sometimes
                by accident, sometimes on purpose
              </p>
            </div>
          </div>

          <p>
            Lorem is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default{" "}
          </p>
          <p>
            Lorem is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose Lorem is a long
            established fact that a reader will be distracted by the readable
            content of a page when looking at its layout. The point of using
            Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using 'Content here, content here', making it
            look like readable English. Many desktop publishing packages and web
            page editors now use Lorem Ipsum as their default{" "}
          </p>

          <div className="">
            <img
              style={{
                height: "400px",
                width: "100%",
                objectFit: "cover",
                marginBottom: "40px",
              }}
              src={n1}
              alt="n1"
            />
          </div>
          <p>
            Lorem is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default{" "}
          </p>

          <p>
            Lorem is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose Lorem is a long
            established fact that a reader will be distracted by the readable
            content of a page when looking at its layout. The point of using
            Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using 'Content here, content here', making it
            look like readable English. Many desktop publishing packages and web
            page editors now use Lorem Ipsum as their default{" "}
          </p>
        </div>
        <NewsSlider />
      </div>
    </>
  );
};

export default NewsDetails;
