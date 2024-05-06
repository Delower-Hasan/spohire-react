import NewsCard from "../../components/News/NewsCard";
import NewsHeader from "../../components/News/NewsHeader";
import "./News.css";
import Pagination from "../../components/Pagination/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5; // Maximum 5 items per page

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LIVE_API_URL}/api/v1/blogs/all`
        );
        const allBlogs = response.data.data.blogs;
        const articles = allBlogs.filter((blog) => blog.type === "news");
        setNews(articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(news.length / itemsPerPage);

  // Calculate index range for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice news array to display only relevant items for current page
  const displayedNews = news.slice(startIndex, endIndex);

  return (
    <div className="container">
      <NewsHeader />
      {displayedNews.map((data) => (
        <NewsCard key={data.id} data={data} />
      ))}

      {totalPages > 1 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default News;
