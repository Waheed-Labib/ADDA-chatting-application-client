import React, { useContext } from 'react';
import './Footer.css'
import { Link } from 'react-router-dom';
import { DisplayContext } from '../../../../contexts/DisplayProvider';

const Footer = () => {

    const { displayFooter } = useContext(DisplayContext);

    return (
        <div style={{ display: 'flex', alignItems: 'end' }}>
            <div className={`${displayFooter ? 'footer' : 'd-none'}`}>
                <Link to='/about'>About ADDA</Link>
                <Link to='/feedback'>Send Feedback</Link>
            </div>

        </div>


    );
};

export default Footer;