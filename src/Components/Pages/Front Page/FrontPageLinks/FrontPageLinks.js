import React from 'react';
import { FaSignInAlt, FaWpforms } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import GoogleButton from '../../Shared/Buttons/GoogleButton';

const FrontPageLinks = () => {
    return (
        <div className='front-page-links front-page-links-position-absolute '>
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

        </div>
    );
};

export default FrontPageLinks;