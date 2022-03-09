import React, {useEffect, useState} from 'react';
import logo from "../../logo.svg";
import {Link} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setAuth} from "../../redux/authSlice";

const Nav = () => {
    //redux auth selector from store
    const auth = useSelector((state: RootState) => state.auth.value );
    //dispatch for logout
    const dispatch = useDispatch();

    //logout function
    const logoutRequest = async () => {
        await axios.post('auth/logout', {}, { withCredentials: true });
        //remove token
        axios.defaults.headers.common['Authorization'] = '';
        //redux dispatch
        dispatch(setAuth(false));
    }

    //set status on the bar
    let links;
    if(auth){
        links = <div className="text-end">
            <Link to="/login" className="btn btn-outline-light me-2"
            onClick={logoutRequest}
            >Logout</Link>
        </div>

    } else {
        links = <div className="text-end">
            <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
            <Link to="/register" className="btn btn-primary">Sign-up</Link>
        </div>
    }

   ///html -
    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <img className="mb-3 center-block" src={logo} alt="" width="72" height="57" />
                    </Link>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/" className="nav-link px-2 text-secondary">Home</Link></li>
                        <li><Link to="/about" className="nav-link px-2 text-white">About</Link></li>
                    </ul>

                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                        <input type="search" className="form-control form-control-dark" placeholder="Search..."
                               aria-label="Search" />
                    </form>

                    { links }
                </div>
            </div>
        </header>
    );
};

export default Nav;