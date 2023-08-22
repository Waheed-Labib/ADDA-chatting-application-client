import React, { useContext } from 'react';
import logo from '../../../Assets/images/logo/Adda Logo.png'
import { FaWpforms, FaSignInAlt } from 'react-icons/fa';
import './Banner.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import GoogleButton from '../Shared/Buttons/GoogleButton';
import { AuthContext } from '../../../contexts/AuthProvider';
import ChatBox from '../ChatBox/ChatBox/ChatBox';
import { DisplayContext } from '../../../contexts/DisplayProvider';
import FrontPageLinks from './FrontPageLinks/FrontPageLinks';

const Banner = () => {

    const { setDisplayFooter } = useContext(DisplayContext)
    setDisplayFooter(true)

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const from = '/chatbox'

    if (user) return (
        navigate(from, { replace: true })
    )

    return (
        <div className='banner'>
            <img className='logo' style={{ borderBottomRightRadius: '5px' }} src={logo} alt=''></img>

            <FrontPageLinks></FrontPageLinks>
        </div>
    );
};

export default Banner;