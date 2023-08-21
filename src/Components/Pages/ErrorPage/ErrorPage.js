import React from 'react';
import { FaSadTear } from 'react-icons/fa';
import './ErrorPage.css';
import logo from '../../../Assets/images/logo/Adda Logo.png'

const ErrorPage = () => {
    return (
        <div className='error-page'>
            <h2>
                Something Went Wrong &nbsp;
                <span><FaSadTear></FaSadTear></span>
            </h2>

            <ul>
                <li>Please Check Your Internet Connection</li>
                <li>Make Sure You Entered a Valid URL</li>
            </ul>

            <img src={logo} alt=''></img>
        </div>
    );
};

export default ErrorPage;