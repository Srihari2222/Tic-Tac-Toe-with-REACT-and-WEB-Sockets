import React, { useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'

export default function Navbar(props) {
    const navigate=useNavigate();
    const handleLogin=() => {
        navigate("/login");
    }
    const handleSignup =() => {
        navigate("/signup");
    }
    const location = useLocation();
    const isActive = (pathname) => {
        return location.pathname === pathname;
    };
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                
                <a className="navbar-brand" href="/" style={{marginLeft:"10px"}}> <img src={require('./images/tic-tac-toe1.png')} href="/" alt='logo' className='w-10 h-11 object-contain' style={{height:"50px",weight:"20px",marginRight:"5px"}}/>Tic-tac-toe </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className={`nav-link me-3 ${isActive('/') ? 'active' : ''}`} aria-current="page" to="/" replace={true}>Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`nav-link me-5 ${isActive('/about') ? 'active' : ''}`} aria-current="page" to="/about">About</Link>
                    </li>
                </ul>
                <form className="ml-auto">
                    <button onClick={handleLogin} className={`btn btn-info btn-outline-secondary btn-bold me-3 ${props.login?"hidden":""}`} type="button">Log-IN</button>
                    <button onClick={handleSignup} className={`btn btn-light btn-outline-secondary btn-bold me-3 ${props.signup?"hidden":""}`} type="button">Sign-Up</button>
                </form>
                </div>
            </div>
        </nav>
    )
}    
