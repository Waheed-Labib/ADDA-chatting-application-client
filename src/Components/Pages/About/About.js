import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './About.css'
import logo from '../../../Assets/images/logo/Adda Logo.png'
import CupLogo from '../Shared/CupLogo/CupLogo';
import { DisplayContext } from '../../../contexts/DisplayProvider';
import { FaAngleDoubleRight, FaSignInAlt, FaWpforms } from 'react-icons/fa';
import { AuthContext } from '../../../contexts/AuthProvider';
import FrontPageLinks from '../Front Page/FrontPageLinks/FrontPageLinks';
import ErrorPage from '../ErrorPage/ErrorPage';
import { toast } from 'react-hot-toast';
import GoogleButton from '../Shared/Buttons/GoogleButton';

const About = ({ from }) => {

    const { setDisplayFooter } = useContext(DisplayContext)
    setDisplayFooter(false)

    const { user } = useContext(AuthContext);
    const [error, setError] = useState(false)


    if (error) return <ErrorPage></ErrorPage>

    return (
        <div className='about'>
            <img className='logo' style={{ borderBottomRightRadius: '5px' }} src={logo} alt=''></img>

            <div className='about-text'>
                <CupLogo></CupLogo>
                <h2>
                    About ADDA
                </h2>

                <h4>
                    <ul style={{ textAlign: 'start' }}>
                        <li>ADDA is a MERN based CRUD Application</li>
                        <li>Built for <span style={{ fontSize: '1.20rem', color: 'rgb(55, 0, 0)' }}>online chatting</span></li>
                        <li>Has <span style={{ fontSize: '1.20rem', color: 'rgb(55, 0, 0)' }}>no commercial purpose</span></li>
                        <li>A junior level application, built by a junior developer</li>
                        <li>The developer will be grateful if you <Link to='/feedback' style={{ color: 'rgb(13, 3, 77)', fontSize: '1.10rem' }}>share your feedback.</Link></li>
                    </ul>
                </h4>
            </div>

            {
                user ?
                    <div className='profile-page-buttons about-page-buttons'>
                        <Link to='/chatbox' style={{ textDecoration: 'none' }}>
                            <button className='chatbox-btn'>
                                <p>Chat Box</p>
                                <FaAngleDoubleRight></FaAngleDoubleRight>
                            </button>
                        </Link>

                        <Link style={{ textDecoration: 'none' }} to={`/profile/${user?.uid}`}>
                            <button style={{ marginBottom: '15px' }} className='profile-btn'>
                                <img src={user?.photoURL} alt=''></img>
                                <p>Your Profile</p>
                            </button>
                        </Link>


                        <br></br>

                    </div>
                    :
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

                    </div>
            }

        </div >

    );
};

export default About;