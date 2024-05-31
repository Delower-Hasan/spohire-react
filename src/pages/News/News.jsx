import NewsCard from "../../components/News/NewsCard";
import NewsHeader from "../../components/News/NewsHeader";
import "./News.css";
import Pagination from "../../components/Pagination/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

const News = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const itemsPerPage = 5; // Maximum 5 items per page

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/blogs/all`
        );
        const allBlogs = response.data.data.blogs;
        const articles = allBlogs.filter((blog) => blog.type === "news");
        setNews(articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      } finally {
        setLoading(false);
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

  if (isLoading) {
    return (
      <div className="container text-center">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          strokeColor="#2B3674"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  return (
    <div className="container h-100">
      <NewsHeader />
      {displayedNews.map((data, index) => (
        <NewsCard key={index} data={data} />
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
