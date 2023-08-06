import React, { useState } from 'react';
import { FaAngleDoubleRight, FaSignOutAlt } from 'react-icons/fa';
import logo from '../../../../Assets/images/logo/Adda Logo.png'
import ConfirmDeleteAccount from '../../Shared/ConfirmDeleteAccount/ConfirmDeleteAccount';

const ProfilePageButtons = ({ handleSignOut }) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    return (
        <div className='profile-page-buttons'>

            <button className='chatbox-btn'>
                <p>Chat Box</p>
                <FaAngleDoubleRight></FaAngleDoubleRight>
            </button>
            <button style={{ marginBottom: '15px' }} onClick={handleSignOut} className='logout-btn'>
                <FaSignOutAlt></FaSignOutAlt>
                <p>Sign Out</p>
            </button>

            <button onClick={() => setDeleteModalOpen(true)} className='delete-account-btn'>
                <p className='cross'>&times;</p>
                <p>Delete Account</p>

            </button>
            <br></br>
            {/* <br></br> */}
            <img style={{ width: '300px', marginTop: '10px', marginBottom: '20px' }} src={logo} alt=''></img>

            {
                deleteModalOpen && <ConfirmDeleteAccount setDeleteModalOpen={setDeleteModalOpen}></ConfirmDeleteAccount>
            }

        </div>
    );
};

export default ProfilePageButtons;