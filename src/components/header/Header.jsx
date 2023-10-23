import React from 'react'
import './Header.css'
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav class="navbar navbar-expand-lg">
                <div class="container">
                    <a class="navbar-brand" href="index.html">
                        <img src={Logo} alt="Logo" />
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fa fa-bars"></i>
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link to={"/transfarMarket"} class="nav-link">Transfer Market</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={"/jobOffer"} class="nav-link">Job Offers</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={"/announcements"} class="nav-link">Announcements</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={"/pricing"} class="nav-link">Pricing</Link>
                            </li>
                        </ul>
                        <form class="d-flex flex-column flex-lg-row align-items-center gap-2">
                            <button class="logIn">Log in</button>
                            <button class="authBtn btnNone">
                                <Link href="#signUp" type="submit" className='text-decoration-none'>Sign Up</Link>
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header