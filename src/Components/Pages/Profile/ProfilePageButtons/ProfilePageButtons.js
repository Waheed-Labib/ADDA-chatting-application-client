import React, { useContext, useState } from 'react';
import { FaAngleDoubleRight, FaSignOutAlt } from 'react-icons/fa';
import logo from '../../../../Assets/images/logo/Adda Logo.png'
import ConfirmDeleteAccount from '../../Shared/ConfirmDeleteAccount/ConfirmDeleteAccount';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider';



const ProfilePageButtons = ({ userMongoProfile }) => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const handleSignOut = () => {
        logOut()
            .then(() => {
                const from = '/signin';
                navigate(from, { replace: true })
            })
            .catch(() => alert('Something went wrong. Please try again.'))
    }

    return (
        <div className='profile-page-buttons'>
            <Link to='/chatbox' style={{ textDecoration: 'none' }}>
                <button className='chatbox-btn'>
                    <p>Chat Box</p>
                    <FaAngleDoubleRight></FaAngleDoubleRight>
                </button>
            </Link>

            <button style={{ marginBottom: '15px' }} onClick={handleSignOut} className='logout-btn'>
                <FaSignOutAlt></FaSignOutAlt>
                <p>Sign Out</p>
            </button>



            {
                user?.uid === userMongoProfile?.uid ?
                    <button onClick={() => setDeleteModalOpen(true)} className='delete-account-btn'>
                        <p className='cross'>&times;</p>
                        <p>Delete Account</p>
                    </button>
                    :
                    <Link style={{ textDecoration: 'none' }} to={`/profile/${user?.uid}`}>
                        <button style={{ marginBottom: '15px' }} className='your-profile-btn'>
                            <img src={user?.photoURL} alt=''></img>
                            <p>Your Profile</p>
                        </button>
                    </Link>
            }


            <br></br>
            {/* <br></br> */}
            <img style={{ width: '300px', marginTop: '10px', marginBottom: '20px' }} src={logo} alt=''></img>

            {
                deleteModalOpen && <ConfirmDeleteAccount setDeleteModalOpen={setDeleteModalOpen}></ConfirmDeleteAccount>
            }


        </div >
    );
};

export default ProfilePageButtons;