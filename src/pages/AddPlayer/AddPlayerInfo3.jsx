/* eslint-disable no-unused-vars */
import loginBanner from "../../assets/addplayer.png";
import t1 from "../../assets/t1.png";
import t2 from "../../assets/t2.png";
import t3 from "../../assets/t3.png";
import t4 from "../../assets/t4.png";
import greyplus from "../../assets/greyplus.png";
import { useState } from "react";

import bdIcon from "../../assets/bd.svg";

import './AddPlayer.css'
import { Link } from "react-router-dom";
import HandleYear from "./HandleYear";


const options1 = [
    {
        value: "Bangladesh",
        label: "Bangladesh",
        flagImg: bdIcon,
    },
    {
        value: "India",
        label: "India",
        flagImg: bdIcon,
    },
    {
        value: "Switzerland",
        label: "Switzerland",
        flagImg: bdIcon,
    },
    {
        value: "United Kingdom",
        label: "United Kingdom",
        flagImg: bdIcon,
    },
    {
        value: "Ireland",
        label: "Ireland",
        flagImg: bdIcon,
    },
    {
        value: "Italy",
        label: "Italy",
        flagImg: bdIcon,
    },
    {
        value: "Netherland",
        label: "Netherland",
        flagImg: bdIcon,
    },
];

const options2 = [
    {
        value: "Bangladesh",
        label: "+880",
        flagImg: bdIcon,
    },
    {
        value: "India",
        label: "+880",
        flagImg: bdIcon,
    },
];

const AddPlayerInfo3 = () => {
    const [select, setSelect] = useState("SE");
    const onSelect = (code) => setSelect(code);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [nationality, setNationality] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [functionType, setFunctionType] = useState("");
    const [sports, setSports] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = {
            firstName,
            lastName,
            email,
            nationality,
            dateOfBirth,
            phoneNumber,
            functionType,
            sports,
        };
        console.log(formData)
        localStorage.setItem("register", JSON.stringify(formData));
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-lg-5 p-0 d-none d-lg-block">
                        <div className="addplayer_left_banner text-center ">
                            <img className="img-fluid" src={loginBanner} alt="" />
                        </div>
                    </div>
                    <div className="col-lg-7 p-0">
                        <div className="login_wrapper player_wrapper">
                            <div>
                                <h3>Add Player</h3>
                                <p>Fill all input to create a account</p>
                                <form onSubmit={handleFormSubmit}>
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <HandleYear />
                                            <div>
                                                -
                                            </div>
                                            <HandleYear />
                                        </div>

                                        <div className="">
                                            <input
                                                type="text"
                                                className="mt-2 form-control login_input"
                                                placeholder="Club name"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button className="add_btn">
                                        <span>Add</span> <img src={greyplus} alt="plus btn" />
                                    </button>

                                    <div className="row right-inner-addon input-container">
                                        <div className="">
                                            <label htmlFor="">Strengths Advantages</label>
                                            <input
                                                type="text"
                                                className="mt-2 form-control login_input"
                                                placeholder="Type here..."
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div className="">
                                            <label htmlFor="">About me</label>
                                            <input
                                                type="text"
                                                className="mt-2 form-control login_input"
                                                placeholder="Type here..."
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="">Expectations From a New Club</label>
                                            <input
                                                type="text"
                                                className="mt-2 form-control login_input"
                                                placeholder="Type here..."
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {/* media */}
                                    <div>
                                        <label htmlFor="">Media</label>
                                        <div className="media_wrapper">
                                            <img src={t1} alt="" />
                                            <img src={t2} alt="" />
                                            <img src={t3} alt="" />
                                            <img src={t4} alt="" />
                                        </div>
                                    </div>
                                    <div className="next_skip_btns">
                                        <button className="next_btn"><Link to="/addplayer3" className="text-light">Next</Link></button>
                                        <button className="prev_btn"><Link to="/addplayer3" className="text-dark">Skip</Link></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddPlayerInfo3;
