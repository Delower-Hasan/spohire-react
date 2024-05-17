import NewsCard from "../../components/News/NewsCard";
import NewsHeader from "../../components/News/NewsHeader";
import Pagination from "../../components/Pagination/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

const Articles = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndFilterArticles = async () => {
      try {
        // Fetch all blogs
        const response = await axios.get(
          `${import.meta.env.VITE_LIVE_API_URL}/api/v1/blogs/all`
        );
        const allBlogs = response.data.data.blogs;

        // Filter to include only articles
        const articles = allBlogs.filter((blog) => blog.type === "article");

        setNews(articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching and filtering articles:", error);
        setLoading(false);
      }
    };
    fetchAndFilterArticles();
  }, []);

  return (
    <div className="container">
      <div className="news_header">
        <h2>Articles</h2>
      </div>
      <div className="h_line_design"></div>

      {isLoading ? (
        <div
          style={{ height: "70vh", width: "100%" }}
          className="d-flex justify-content-center align-items-center"
        >
          {" "}
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            strokeColor="#2B3674"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        news.map((data) => (
          <>
            <NewsCard data={data} />
          </>
        ))
      )}

      <Pagination />
    </div>
  );
};

export default Articles;
