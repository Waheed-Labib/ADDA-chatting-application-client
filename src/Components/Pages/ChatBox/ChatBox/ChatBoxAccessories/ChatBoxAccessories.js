import React, { useContext } from 'react';
import logo from '../../../../../Assets/images/logo/Adda Logo.png'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import './ChatBoxAccessories.css'
import { FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../../../../../contexts/AuthProvider';



const ChatBoxAccessories = () => {

    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        logOut()
            .then(() => {
                const from = '/signin';
                navigate(from, { replace: true })
            })
            .catch(() => alert('Something went wrong. Please try again.'))
    }

    return (
        <div className='chatbox-accessories'>
            <div className='chatbox-accessories-links'>
                <Link to={`/profile/${user?.uid}`} className='chatbox-accessories-link'>
                    <img src={user?.photoURL} alt=''></img>
                    <p>Your Profile</p>
                </Link>

                <Link onClick={handleSignOut} className='chatbox-accessories-link'>
                    <FaSignOutAlt></FaSignOutAlt>
                    <p>Sign Out</p>
                </Link>

                <Link
                    to='/about'
                    className='chatbox-accessories-link'>
                    <p>About ADDA</p>
                </Link>

                <Link to='/feedback' className='chatbox-accessories-link'>
                    <p>Send Feedback</p>
                </Link>
            </div>

            <img src={logo} alt=''></img>
        </div>
    );
};

export default ChatBoxAccessories;