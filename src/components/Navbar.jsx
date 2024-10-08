import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import {GiHamburgerMenu} from "react-icons/gi"

function Navbar() {
    const [show, setShow] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const navigateto = useNavigate();
    const handleLogout = async () => {

        await axios.get("https://hospital-backend-trs5.onrender.com/api/v1/user/patient/logout", { withCredentials: true })
            .then((res) => {
                toast.success(res.data.message);
                setIsAuthenticated(false);
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
    }
    const gotoLogin = () => {
        navigateto("/login")
    }

    return (
        <nav className='container'>
            <div className="logo"><img src='/logo.png' className='logo-img'></img></div>
            <div className={show ? "navLinks showmenu" : "navLinks"}>
            <div className="links">
                <Link to={"/"}>HOME</Link>
                <Link to={"/appointment"}>APPOINTMENT</Link>
                <Link to={"/about"}>ABOUT US</Link>
            </div>
            {isAuthenticated ? (<button className='logoutBtn btn' onClick={handleLogout}>LOGOUT</button>) : (<button className='logoutBtn btn' onClick={gotoLogin}>LOGIN</button>)}
            </div>
            <div className="hamburger" onClick={()=>{setShow(!show)}}>
                <GiHamburgerMenu></GiHamburgerMenu>
            </div>
        </nav>
    )
}

export default Navbar
