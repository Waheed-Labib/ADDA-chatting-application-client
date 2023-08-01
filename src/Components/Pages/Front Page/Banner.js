import React from 'react';
import logo from '../../../Assets/images/logo/Adda Logo.png'
import { FaWpforms, FaSignInAlt, FaQuestionCircle } from 'react-icons/fa';
import './Banner.css'
import { Link } from 'react-router-dom';
import GoogleButton from '../../Buttons/GoogleButton';

const Banner = () => {
    return (
        <div className='banner'>
            <img className='logo' style={{ borderBottomRightRadius: '5px' }} src={logo} alt=''></img>

            <div className='front-page-links'>
                <Link to='/signin'>
                    <button className='sign-in-btn'>
                        <FaSignInAlt></FaSignInAlt>
                        &nbsp;
                        Sign in
                    </button>
                </Link>
                <br></br>
                <Link to='/register'>
                    <button className='register-btn' href='/register'>
                        <FaWpforms></FaWpforms>
                        &nbsp; Create Account
                    </button>
                </Link>

                <br></br>

                <GoogleButton></GoogleButton>
                <br></br>

                <Link className='about-btn' to='/about'>
                    <FaQuestionCircle></FaQuestionCircle>
                    &nbsp; About ADDA
                </Link>
            </div>
        </div>
    );
};

export default Banner;