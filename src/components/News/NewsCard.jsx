import React from 'react'
import RightButton from '../../assets/news/RightButton.png';
import { Link } from 'react-router-dom';

const NewsCard = ({ data }) => {

    console.log(data)

    const date = new Date(data?.createdAt);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();

    console.log(`${day} ${month}`);

    return (
        <>
            <div className='news_card'>
                <div className="d-flex flex-lg-nowrap flex-wrap" style={{ gap: "64px" }}>
                    <div className="">
                        <div className="d-flex flex-wrap" style={{ gap: "61px" }}>
                            <div className='date_wrapper'>
                                <h3>{month ? month : "Jan"}</h3>
                                <div className='date_line'></div>
                                <h2>{day ? day : "22"}</h2>
                            </div>
                            <img className='news_img' src={
                                data?.image
                                    ? `${process.env.NODE_ENV !== "production"
                                        ? import.meta.env.VITE_LOCAL_API_URL
                                        : import.meta.env.VITE_LIVE_API_URL
                                    }/api/v1/uploads/${data?.image}`
                                    : profileImage
                            } alt="" style={{width:"540opx",height:"421px"}}  />
                        </div>
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className="card_details">
                            <h2>{data?.title}</h2>
                            <span>{data.time}</span>
                            <p
                                dangerouslySetInnerHTML={{ __html: data?.short_description }}
                            />
                            <div className='desc_line'></div>
                            <div className='view_morebtn'>
                                <Link to={`/newsDetails/${data._id}`}> <button>View More  <img src={RightButton} alt="RightButton" />  </button>
                                </Link>
                            </div>
                        </div>

                    </div>


                </div>
            </div>


        </>
    )
}

export default NewsCard