import NewsCard from "../../components/News/NewsCard";
import NewsHeader from "../../components/News/NewsHeader";
import Pagination from "../../components/Pagination/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";

const Articles = () => {
  const [news, setNews] = useState([]);

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
        console.log(articles, "Filtered articles");
      } catch (error) {
        console.error("Error fetching and filtering articles:", error);
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

      {news.map((data) => (
        <>
          <NewsCard data={data} />
        </>
      ))}

      <Pagination />
    </div>
  );
};

export default Articles;
