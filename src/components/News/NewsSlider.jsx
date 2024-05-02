import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import RightButton from "../../assets/RightButton1.png";
import n1 from "../../assets/lnews.png";
import { Link } from "react-router-dom";
import axios from "axios";

const NewsSlider = ({ type }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LIVE_API_URL}/api/v1/blogs/all`
        );
        const allBlogs = response.data.data.blogs;
        const articles = allBlogs.filter((blog) => blog.type === type);
        setNews(articles);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [type]);

  return (
    <div className="news_slider_wrapper gap-5" style={{ padding: "80px 80px" }}>
      <Carousel responsive={responsive}>
        {news.map((item, index) => (
          <div key={index} className="col-lg-4 col-12 w-100">
            <div className="text-start bg-transparent">
              <img
                className="w-100"
                src={
                  item?.image
                    ? `${
                        process.env.NODE_ENV !== "production"
                          ? import.meta.env.VITE_LOCAL_API_URL
                          : import.meta.env.VITE_LIVE_API_URL
                      }/api/v1/uploads/${item?.image}`
                    : n1
                }
                alt={item.title}
              />
              <div className="details">
                <p>{item.title}</p>
                <div className="view_morebtn1">
                  <Link to={`/newsDetails/${item._id}`}>
                    <button>
                      View More <img src={RightButton} alt="RightButton" />{" "}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default NewsSlider;
