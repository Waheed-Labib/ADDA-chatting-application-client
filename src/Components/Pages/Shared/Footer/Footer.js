import React from 'react';
import './Footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footer'>
            <Link to='/about'>About ADDA</Link>
            <Link to='/feedback'>Send Feedback</Link>
        </div>
    );
};

export default Footer;