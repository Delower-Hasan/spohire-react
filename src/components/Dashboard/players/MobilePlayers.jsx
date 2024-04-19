/* eslint-disable react/jsx-key */
import "./Players.css";
import playerImgOne from "../../../assets/playerImg.svg";
import startIcon from "../../../assets/starIcon.svg";
import messageIcon from "../../../assets/messageIcon.svg";
import calender from "../../../assets/Calendar.png";
import mapin from "../../../assets/MapPin.png";

const MobilePlayers = () => {
    return (
        <div>
            <div className="players_mobile ">
                <div className="row gy-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                        <div className="col-6" key={index}>
                            <div className="players_wrapper ">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex gap-1 align-items-start">
                                        <img src={playerImgOne} alt="img" style={{
                                            width: '24px',
                                            height: '24px'
                                        }} />
                                        <div className="player_name">
                                            <p className="text_color_36 fw-medium fs_10">
                                                Jacob Bennett
                                            </p>
                                            <p className="fs_10">PG</p>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center socialIcon">
                                        <button>
                                            <img src={startIcon} alt="star-icon" className="img-fluid" />
                                        </button>
                                        <button>
                                            <img src={messageIcon} alt="message-icon" className="img-fluid" />
                                        </button>
                                    </div>
                                </div>

                                <div className="location_div">
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <div className="fs_10">
                                            <img src={mapin} alt="message-icon" className="me-1" />
                                            Italy
                                        </div>
                                        <p className="fs_10">
                                            Club : <span className="ms-2">Milano</span>
                                        </p>
                                    </div>

                                    <div className="d-flex justify-content-center gap-1 align-items-center fs_10 mb-2">
                                        <div>
                                            <img src={calender} alt="message-icon" />
                                            Date of birth :
                                        </div>
                                        <p>14 feb, 2002</p>
                                    </div>
                                    <p className="text-center fs_10">
                                        Status: <span className="ms-2">Gold</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MobilePlayers;