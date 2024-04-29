import NewsCard from "../../components/News/NewsCard";
import NewsHeader from "../../components/News/NewsHeader"
import './News.css';
import n1 from '../../assets/news/n1.png'
import n2 from '../../assets/news/n2.png'
import n4 from '../../assets/news/n4.png'
import Pagination from "../../components/Pagination/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";

const newsData = [
    {
        img: n1,
        title: "Baku 2024 world best basketball Championships",
        date: "24",
        month: "JUN",
        time: "4 hours ago",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to book."
    },
    {
        img: n2,
        title: "Baku 2024 world best basketball Championships",
        date: "24",
        month: "JUN",
        time: "4 hours ago",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to book."
    },
    {
        img: n4,
        title: "Baku 2024 world best basketball Championships",
        date: "24",
        month: "JUN",
        time: "4 hours ago",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to book."
    },

]


const News = () => {



    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/blogs/all');
                setNews(response.data.data.blogs)
                console.log(response.data.data.blogs, "news data get thgeheirleijrlskflksdfhsdhf")
            } catch (error) {
                console.error('Error fetching users:', error);
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

            <Pagination />

        </div>
    )
}

export default News