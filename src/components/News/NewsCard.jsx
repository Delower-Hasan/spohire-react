import React from 'react'
import RightButton from '../../assets/news/RightButton.png';
import { Link } from 'react-router-dom';

const NewsCard = ({ data }) => {
    return (
        <>
            <div className='news_card'>
                <div className="d-flex flex-wrap" style={{ gap: "64px" }}>
                    <div className="">
                        <div className="d-flex flex-wrap" style={{ gap: "61px" }}>
                            <div className='date_wrapper'>
                                <h3>{data?.month}</h3>
                                <div className='date_line'></div>
                                <h2>{data?.date}</h2>
                            </div>
                            <img className='news_img' src={data?.img} alt="" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className="card_details">
                            <h2>{data?.title}</h2>
                            <span>{data.time}</span>
                            <p>{data.desc}</p>
                            <div className='desc_line'></div>
                            <div className='view_morebtn'>
                                <Link to="/newsDetails"> <button>View More  <img src={RightButton} alt="RightButton" />  </button>
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