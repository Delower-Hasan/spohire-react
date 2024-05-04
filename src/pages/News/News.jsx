import NewsCard from "../../components/News/NewsCard";
import NewsHeader from "../../components/News/NewsHeader";
import "./News.css";
import Pagination from "../../components/Pagination/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LIVE_API_URL}/api/v1/blogs/all`
        );
        // setNews(response.data.data.blogs)
        const allBlogs = response.data.data.blogs;
        const articles = allBlogs.filter((blog) => blog.type === "news");
        setNews(articles);
        console.log(
          response.data.data.blogs,
          "news data get thgeheirleijrlskflksdfhsdhf"
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <NewsHeader />
      {news.map((data) => (
        <>
          <NewsCard data={data} />
        </>
      ))}

      {/* <Pagination /> */}
    </div>
  );
};

export default News;
