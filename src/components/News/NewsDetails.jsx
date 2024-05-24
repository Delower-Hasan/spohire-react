import React, { useEffect, useState } from "react";
import insta from "../../assets/ninsta.png";
import fb from "../../assets/nfb.png";
import ntwitter from "../../assets/ntwitter.png";
import nlinkdin from "../../assets/nlinkdin.png";
import n1 from "../../assets/news/n1.png";
import NewsSlider from "./NewsSlider";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const NewsDetails = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/blogs/${id}`
        );
        setBlog(response.data.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
    return () => {};
  }, [id]);

  const formattedDate = moment(blog?.createdAt).format("MMMM DD, YYYY");

  return (
    <>
      <div className="container">
        <div className="news_details_wrapper">
          <h2>{blog?.title}</h2>
          <div className="d-flex flex-wrap align-items-center date">
            <p className="">{formattedDate}</p>
            <div className="d-flex flex-wrap gap-4">
              {blog?.fb && (
                <Link to={`${blog?.fb && blog?.fb}`}>
                  <img src={fb} alt="" />
                </Link>
              )}
              {blog?.instagram && (
                <Link to={`${blog?.instagram && blog?.instagram}`}>
                  {" "}
                  <img src={insta} alt="" />
                </Link>
              )}
              {blog?.twitter && (
                <Link to={`${blog?.twitter && blog?.twitter}`}>
                  <img src={ntwitter} alt="" />
                </Link>
              )}
              {blog?.linkedin && (
                <Link to={`${blog?.linkedin && blog?.linkedin}`}>
                  <img src={nlinkdin} alt="" />
                </Link>
              )}
            </div>
          </div>
          <div className="line_design"></div>

          <div className="">
            <img
              style={{
                height: "400px",
                width: "100%",
                objectFit: "cover",
                marginBottom: "40px",
              }}
              src={
                blog?.image
                  ? `${
                      process.env.NODE_ENV !== "production"
                        ? import.meta.env.VITE_LOCAL_API_URL
                        : import.meta.env.VITE_LIVE_API_URL
                    }/api/v1/uploads/${blog?.image}`
                  : n1
              }
              alt="n1"
            />
          </div>

          <div dangerouslySetInnerHTML={{ __html: blog?.description }} />
        </div>

        <NewsSlider type={blog?.type} />
      </div>
    </>
  );
};

export default NewsDetails;
