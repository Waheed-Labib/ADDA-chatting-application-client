import React, { useContext, useState } from 'react';
import './Profile.css'
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import logo from '../../../Assets/images/logo/Adda Logo.png'
import { AuthContext } from '../../../contexts/AuthProvider';
import frog from '../../../Assets/images/avatar/frog.webp'
import { toast } from 'react-hot-toast';
import Avatars from '../Shared/Avatars/Avatars';
import Loading from '../Shared/Loading/Loading';

const Profile = () => {

    const { user, updateUserAccount, verifyEmail } = useContext(AuthContext)
    const [editName, setEditName] = useState(false)
    const [name, setName] = useState(user?.displayName)
    const [showAvatars, setShowAvatars] = useState(false)

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

    const profile = <>
        <div className='profile'>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '50px' }}>
                <h2 style={{ marginBottom: '30px' }}>Your Profile</h2>
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
            <img style={{ width: '300px' }} src={logo} alt=''></img>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {
                    showAvatars ?
                        <div className='profile'>
                            <Avatars setShowAvatars={setShowAvatars}></Avatars>
                        </div>
                        :
                        profile
                }

            </div>


        </div >

    );
};

export default Profile;