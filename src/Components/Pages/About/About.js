import React from 'react';
import { Link } from 'react-router-dom';
import './About.css'
import logo from '../../../Assets/images/logo/Adda Logo.png'

const About = () => {
    return (
        <div className='about'>
            <img style={{ width: '300px' }} src={logo} alt=''></img>

            <div className='about-text-and-link'>
                <div className='about-text'>
                    <h2>
                        About ADDA
                    </h2>

                    <h4>
                        ADDA is a REACT Application, built mainly for online chatting. It has no commercial purpose. It is a practice project built by a beginner level developer. The developer will be really grateful if you share your feedback.
                    </h4>

                    <Link style={{ marginTop: '5%', color: 'rgb(39, 31, 93)' }} to='/feedback'>Send Feedback</Link>
                    <Link style={{ color: 'maroon' }} to='/'>Return</Link>
                </div>


            </div>

        </div>
    );
};

export default About;