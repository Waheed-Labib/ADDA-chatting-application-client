import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './About.css'
import logo from '../../../Assets/images/logo/Adda Logo.png'
import CupLogo from '../Shared/CupLogo/CupLogo';
import { DisplayContext } from '../../../contexts/DisplayProvider';
import { FaAngleDoubleRight, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../../../contexts/AuthProvider';
import FrontPageLinks from '../Front Page/FrontPageLinks/FrontPageLinks';

const About = ({ from }) => {

    const { setDisplayFooter } = useContext(DisplayContext)
    setDisplayFooter(false)

    const { user, logOut } = useContext(AuthContext);

    const navigate = useNavigate()
    const handleSignOut = () => {
        logOut()
            .then(() => {

            })
            .catch(() => alert('Something went wrong. Please try again.'))
    }


    return (
        <div className='about'>
            <img className='logo' style={{ borderBottomRightRadius: '5px' }} src={logo} alt=''></img>

            <div className='about-text'>
                <CupLogo></CupLogo>
                <h2>
                    About ADDA
                </h2>

                <h4>
                    ADDA is a MERN based CRUD Application, built mainly for online chatting. It has no commercial purpose. It is a practice project built by a junior developer. The developer will be really grateful if you <Link to='/feedback' style={{ color: 'rgb(39, 31, 93)' }}>share your feedback.</Link>
                </h4>
            </div>

            {
                user ?
                    <div className='profile-page-buttons about-page-buttons'>
                        <Link to={`/chatbox/${user?.uid}`} style={{ textDecoration: 'none' }}>
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
                    <FrontPageLinks></FrontPageLinks>
            }

        </div>

    );
};

export default About;