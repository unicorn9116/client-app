import { React, Component } from 'react';
import { BrowserRouter, Link, Redirect } from 'react-router-dom';

import './navBar.css';

const NavBar = (props) => {


    return (
        <div>
<nav>
                <div className="">
                    <div className="">
                    <input type="checkbox" id="check" />
                    <label className="checkbtn">
                    <i className="fas fa-bars"></i>ss
                    </label>
                    <label className="logo">DesignX</label>
                    <ul>
                        <li><i className="home icon"></i> <Link to="/"> Home </Link></li>
                        <li><i className="square full icon"></i> <Link to="/about"> About </Link></li>
                        <li><i className="phone icon"></i> <Link to="/contact"> Contact </Link></li>
                        <li>
                        {localStorage.getItem('auth') ? 
                        <div className="item">
                            <i className="globe icon"></i>
                            <Link to="/login" onClick={()=> localStorage.clear()}>
                                Logout
                            </Link>
                        </div>
                        : ""}
                        </li>
                    </ul>
                        
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;