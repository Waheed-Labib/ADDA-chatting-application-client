import React, { useContext, useState } from 'react';
import './Profile.css'
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { AuthContext } from '../../../contexts/AuthProvider';
import frog from '../../../Assets/images/avatar/frog.webp'
import { toast } from 'react-hot-toast';
import Avatars from './Avatars/Avatars';
import Loading from '../Shared/Loading/Loading';
import UploadImage from './UploadImage/UploadImage';
import ProfilePageButtons from './ProfilePageButtons/ProfilePageButtons';
import logo from '../../../Assets/images/logo/Adda Logo.png'

const Profile = () => {

    const { user, updateUserAccount, verifyEmail, logOut } = useContext(AuthContext)
    const [editName, setEditName] = useState(false)
    const [name, setName] = useState(user?.displayName)
    const [showAvatars, setShowAvatars] = useState(false)
    const [uploadImage, setUploadImage] = useState(false)
    const [userPhoto, setUserPhoto] = useState(user?.photoURL)

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
                <h2 style={{ marginBottom: '20px' }}>{name || user?.displayName}</h2>
                <div className='profile-img'>

                    {
                        userPhoto ?
                            <img className='user-dp' src={userPhoto} alt=''></img>
                            :
                            <img className='user-dp' src={frog} alt=''></img>
                    }


                    <h4>To Change the Image</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Link onClick={() => setUploadImage(!uploadImage)}>Upload Image</Link>
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

    if (showAvatars) return <div>
        <h1 className='page-heading'>
            Your ADDA Account
        </h1>
        <div className='flex-container'>
            <div className='profile'>
                <Avatars setShowAvatars={setShowAvatars} setUserPhoto={setUserPhoto}></Avatars>
            </div>
        </div>
    </div>

    if (uploadImage) return <div>
        <h1 className='page-heading'>
            Your ADDA Account
        </h1>
        <div className='flex-container'>
            <div className='profile'>
                <UploadImage setUploadImage={setUploadImage} setUserPhoto={setUserPhoto}></UploadImage>
            </div>
        </div>
    </div>

    return <div>
        <h1 className='page-heading'>
            Your ADDA Account
        </h1>
        <div className='flex-container'>

            {
                console.log(user.photoURL)
            }
            {profile}

            <ProfilePageButtons handleSignOut={handleSignOut}></ProfilePageButtons>

        </div>
    </div>
};

export default Profile;