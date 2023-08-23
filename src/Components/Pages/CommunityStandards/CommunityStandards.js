import React, { useContext } from 'react';
import CupLogo from '../Shared/CupLogo/CupLogo';
import FrontPageLinks from '../Front Page/FrontPageLinks/FrontPageLinks';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import logo from '../../../Assets/images/logo/Adda Logo.png'
import { FaAngleDoubleRight, FaSignInAlt, FaWpforms } from 'react-icons/fa';
import GoogleButton from '../Shared/Buttons/GoogleButton';

const CommunityStandards = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className='about'>
            <img className='logo' style={{ borderBottomRightRadius: '5px' }} src={logo} alt=''></img>

            <div className='about-text'>
                <CupLogo></CupLogo>
                <h2>
                    Community Standards
                </h2>

                <h4 style={{ textAlign: 'start' }}>
                    <ul>
                        <li>
                            Please do not make any kind of <span style={{ color: 'crimson' }}>hateful</span>, <span style={{ color: 'crimson' }}>racist</span> or <span style={{ color: 'crimson' }}>sexist</span> remark.
                        </li>

                        <li>
                            Do not <span style={{ color: 'crimson' }}>harrass</span>, <span style={{ color: 'crimson' }}>hurt</span> or <span style={{ color: 'crimson' }}>insult</span> anybody.
                        </li>

                        <li>
                            If someone <span style={{ color: 'crimson' }}>reports against you</span>, we would have to take steps against you.
                        </li>

                        <li>
                            We will warn you first time.
                        </li>

                        <li>
                            If reporting continues, it may cause <span style={{ color: 'crimson' }}>temporary or permanent suspension</span> of your account.
                        </li>
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

export default CommunityStandards;