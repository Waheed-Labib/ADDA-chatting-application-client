import React, { useContext, useState } from 'react';
import './Profile.css'
import { Link } from 'react-router-dom';
import { FaAngleDoubleRight, FaCross, FaEdit } from 'react-icons/fa';
import logo from '../../../Assets/images/logo/Adda Logo.png'
import { AuthContext } from '../../../contexts/AuthProvider';
import frog from '../../../Assets/images/avatar/frog.webp'
import { toast } from 'react-hot-toast';
import Avatars from '../Shared/Avatars/Avatars';
import Loading from '../Shared/Loading/Loading';
import ConfirmDeleteAccount from '../Shared/ConfirmDeleteAccount/ConfirmDeleteAccount';

const Profile = () => {

    const { user, updateUserAccount, verifyEmail, logOut } = useContext(AuthContext)
    const [editName, setEditName] = useState(false)
    const [name, setName] = useState(user?.displayName)
    const [showAvatars, setShowAvatars] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    console.log(user)

    const handleUpdateName = event => {
        event.preventDefault();
        const newName = event.target.name.value;
        const profile = {
            displayName: newName
        }
        updateUserAccount(profile)
            .then(() => {
                setName(newName)
                setEditName(false)
                toast.success('Name Updated')
            })
            .catch(() => toast.error('Something Went Wrong'))
    }

    const handleEmailVerification = () => {
        verifyEmail()
            .then(() => alert('Verification Email is sent to your Email Address. Please Check.'))
            .catch(() => alert('Something went wrong. Please try again.'))
    }

    const handleSignOut = () => {
        logOut()
            .then(() => {

            })
            .catch(() => alert('Something went wrong. Please try again.'))
    }



    const profile = <>
        <div className='profile'>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '50px' }}>
                <h2 style={{ marginBottom: '30px' }}>{name || user?.displayName}</h2>
                <div className='profile-img'>

                    {
                        user?.photoURL ?
                            <img className='user-dp' src={user?.photoURL} alt=''></img>
                            :
                            <img className='user-dp' src={frog} alt=''></img>
                    }


                    <h4>To Change the Image</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Link>Upload Image</Link>
                        <p style={{ border: 'none' }}>or,</p>
                        <Link onClick={() => setShowAvatars(true)}>Choose An Avatar</Link>
                    </div>
                </div>

                {/* name */}
                <div className='profile-info'>
                    <h3>Name:</h3>
                    {
                        editName ?
                            <form className='name-form' onSubmit={handleUpdateName}>
                                <input className='name-input' type='text' defaultValue={user?.displayName} name='name'></input>
                                <input className='name-submit' type='submit' value='Update Name'></input>
                            </form>
                            :
                            <div onClick={() => setEditName(true)} style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: '5px ' }}>{name || user?.displayName}</p>
                                <FaEdit className='edit-icon'></FaEdit>
                            </div>
                    }


                </div>

                {/* email */}
                <div className='profile-info'>
                    <h3>Email:</h3>
                    <p>{user?.email}</p>
                </div>
            </div>

            {/* special note */}
            <p className='special-note'>*Email Address can not be changed.</p>
            {
                !user?.emailVerified &&
                <p className='special-note'>*You have not verified your email yet. <Link onClick={handleEmailVerification}>Verify Email</Link></p>

            }

        </div>
    </>

    if (!user) return (
        <Loading></Loading>
    )
    return (
        <div className='profile-page'>
            <h1 className='page-heading'>
                Your ADDA Profile
            </h1>
            {
                deleteModalOpen && <ConfirmDeleteAccount setDeleteModalOpen={setDeleteModalOpen}></ConfirmDeleteAccount>
            }

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {
                    showAvatars ?
                        <div className='profile'>
                            <Avatars setShowAvatars={setShowAvatars}></Avatars>
                        </div>
                        :
                        <div className='flex-container'>
                            {profile}

                            <div className='profile-page-buttons'>

                                <button className='chatbox-btn'>
                                    <p>Chat Box</p>
                                    <FaAngleDoubleRight></FaAngleDoubleRight>
                                </button>
                                <button style={{ marginBottom: '15px' }} onClick={handleSignOut} className='logout-btn'>
                                    <p>Sign Out</p>
                                </button>
                                <br></br>
                                {/* <br></br> */}
                                <button onClick={() => setDeleteModalOpen(true)} className='delete-account-btn'>
                                    <p>Delete Account</p>
                                    <p className='cross'>X</p>
                                </button>
                                <br></br>
                                {/* <br></br> */}
                                <img style={{ width: '300px', marginTop: '10px', marginBottom: '20px' }} src={logo} alt=''></img>
                            </div>
                        </div>

                }

            </div>


        </div >

    );
};

export default Profile;