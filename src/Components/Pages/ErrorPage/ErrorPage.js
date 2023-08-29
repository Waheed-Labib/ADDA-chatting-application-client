import React from 'react';
import { FaSadTear } from 'react-icons/fa';
import './ErrorPage.css';
import logo from '../../../Assets/images/logo/Adda Logo.png'
import { Link } from 'react-router-dom';

const ErrorPage = () => {

    return (
        <div className='error-page'>

            <FaSadTear style={{ fontSize: '5rem', color: 'rgb(75,75,75)' }}></FaSadTear>

            <h2>
                Something Went Wrong &nbsp;
            </h2>

            <ul>
                <li>Please Check Your Internet Connection</li>
                <li>Make Sure You Entered a Valid URL</li>
            </ul>

            <Link onClick={() => window.history.back(1)} style={{ color: 'black' }}>Go Back</Link>

            <img src={logo} alt=''></img>
        </div>
    );
};

export default ErrorPage;