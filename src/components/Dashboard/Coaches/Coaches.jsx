import { Table } from "react-bootstrap";
import playerImgOne from "../../../assets/playerImg.svg";
import messageIcon from "../../../assets/messageIcon.svg";
import MobilePlayers from "../players/MobilePlayers";
import MobileButtons from "../players/MobileButtons";
import { Link, useNavigate } from "react-router-dom";
import b1 from '../../../assets/bookmark.png';
import bookmarkfill from '../../../assets/bookmark-fill.png';
import { useState } from "react";
const Coaches = () => {

    return (
        <>
            <div className="players">
                <Table responsive className="players_desk content">
                    <thead>
                        <tr>
                            <th className="fs_14 text_color_36 fw-normal">
                                <div className="d-flex align-items-center">
                                    <p>Name</p>
                                </div>
                            </th>
                            <th className="fs_14 text_color_36 fw-normal">Nation</th>
                            <th className="fs_14 text_color_36 fw-normal">Date of Birth</th>
                            <th className="fs_14 text_color_36 fw-normal">Position</th>
                            <th className="fs_14 text_color_36 fw-normal">Club</th>
                            <th className="fs_14 text_color_36 fw-normal">Status</th>
                            <th className="fs_14 text_color_36 fw-normal">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                            <>
                                <SingleCoach />
                            </>
                        ))}
                    </tbody>
                </Table>
                <MobilePlayers></MobilePlayers>
                <MobileButtons />
            </div>
        </>
    );
};

export default Coaches;

const SingleCoach = () => {
    const [bookmark, setBookmark] = useState(false)

    const navigate = useNavigate();
    const handleBookmark = () => {
        setBookmark(!bookmark)
    }

    const handlePath = () => {
        navigate('/dashboard/coacheDetails')

    };
    return (
        <>
            <tr className="table_hover pointer">
                <td>
                    <div className="player_info d-flex align-items-center gap-2">
                        <div className="player_info_wrapper d-flex gap-2">
                            <div className="player_img">
                                <img src={playerImgOne} alt="player-img" />
                            </div>
                            <div className="player_name" onClick={handlePath}>
                                <p className="text_color_36 fw-medium fs_14">
                                    Jacob <br /> Bennett
                                </p>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <p className="text_color_55 fw-normal fs_14">Italy</p>
                </td>
                <td>
                    <p className="text_color_55 fw-normal fs_14">2002</p>
                </td>

                <td>
                    <p className="text_color_55 fw-normal fs_14">PG</p>
                </td>

                <td>
                    <p className="text_color_55 fw-normal fs_14">Milano</p>
                </td>

                <td>
                    <p className="text_color_55 fw-normal fs_14">Gold</p>
                </td>

                <td>
                    <div className="d-flex align-items-center">
                        <button className='bg-none m-2' onClick={handleBookmark}>
                            {
                                bookmark ?
                                    <img src={bookmarkfill} alt="" />
                                    :
                                    <img src={b1} alt="" />
                            }
                        </button>
                        <Link to="/dashboard/messages" className="text_color_55 fw-normal fs_14">
                            <img src={messageIcon} alt="message-icon" className="ms-2" />
                        </Link>
                    </div>
                </td>
            </tr>
        </>
    )
}