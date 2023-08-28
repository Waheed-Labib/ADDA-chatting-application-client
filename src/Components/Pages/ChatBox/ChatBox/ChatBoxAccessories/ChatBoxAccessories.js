import React, { useContext, useState } from 'react';
import logo from '../../../../../Assets/images/logo/Adda Logo.png'
import { Link, useNavigate } from 'react-router-dom';
import './ChatBoxAccessories.css'
import { FaChevronDown, FaChevronUp, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../../../../../contexts/AuthProvider';



const ChatBoxAccessories = ({ showLinks, setShowLinks }) => {

    // const [showLinks, setShowLinks] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        logOut()
            .then(() => {
                const from = '/signin';
                navigate(from, { replace: true })
            })
            .catch(() => { })
    }

    return (
        <div className='chatbox-accessories'>
            <FaChevronUp onClick={() => setShowLinks(true)} className={`bars ${showLinks ? 'd-none-in-sm' : 'd-block-in-sm'}`}></FaChevronUp>

            <div className={`chatbox-accessories-links ${showLinks ? 'show-links-in-sm' : 'hide-links-in-sm'}`}>
                <FaChevronDown onClick={() => setShowLinks(false)} className={`bars ${showLinks ? 'show-bar-in-sm' : 'hide-bar-in-sm'}`}></FaChevronDown>
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

                <img className={`${showLinks ? 'd-block-in-sm' : 'd-none-in-sm'} hide-in-lg-device`} src={logo} alt=''></img>
            </div>

            <img className={`${showLinks ? 'd-none-in-sm' : 'd-block-in-sm'}`} src={logo} alt=''></img>
        </div>
    );
};

export default ChatBoxAccessories;