import React, { useContext, useState } from 'react';
import './Profile.css'
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import frog from '../../../Assets/images/avatar/frog.webp'
import Avatars from './Avatars/Avatars';
import Loading from '../Shared/Loading/Loading';
import UploadImage from './UploadImage/UploadImage';
import ProfilePageButtons from './ProfilePageButtons/ProfilePageButtons';
import UpdateName from './UpdateName/UpdateName';
import Email from './Email/Email';
import { DisplayContext } from '../../../contexts/DisplayProvider';


const Profile = () => {

    const { setDisplayFooter } = useContext(DisplayContext)
    setDisplayFooter(true)

    const userMongoProfile = useLoaderData();

    const { user, verifyEmail, loading } = useContext(AuthContext)
    const [name, setName] = useState(userMongoProfile?.name)
    const [showAvatars, setShowAvatars] = useState(false)
    const [uploadImage, setUploadImage] = useState(false)
    const [userPhoto, setUserPhoto] = useState(userMongoProfile?.photoURL)

    const handleEmailVerification = () => {
        verifyEmail()
            .then(() => alert('Verification Email is sent to your Email Address. Please Check.'))
            .catch(() => alert('Something went wrong. Please try again.'))
    }


    const profile = <>
        <div className='profile'>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '50px' }}>
                <h2 style={{ marginBottom: '20px' }}>{name || userMongoProfile?.name}</h2>
                <div className='profile-img'>

                    {
                        userPhoto || userMongoProfile?.photoURL ?
                            <img className='user-dp' src={userPhoto || userMongoProfile?.photoURL} alt=''></img>
                            :
                            <img className='user-dp' src={frog} alt=''></img>
                    }

                    {
                        user?.uid === userMongoProfile?.uid &&
                        <>
                            <h4>To Change the Image</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <Link onClick={() => setUploadImage(!uploadImage)}>Upload Image</Link>
                                <p style={{ border: 'none' }}>or,</p>
                                <Link onClick={() => setShowAvatars(true)}>Choose An Avatar</Link>
                            </div>
                        </>
                    }

                </div>

                <UpdateName
                    name={name}
                    setName={setName}
                    userMongoProfile={userMongoProfile}
                ></UpdateName>

                <Email userMongoProfile={userMongoProfile}></Email>
            </div>


            {/* special note */}
            {
                user?.uid === userMongoProfile?.uid &&
                <>
                    <p className='special-note'>*Email Address can not be changed.</p>
                    {
                        !user?.emailVerified &&
                        <p className='special-note'>*You have not verified your email yet. <Link onClick={handleEmailVerification}>Verify Email</Link></p>

                    }
                </>
            }


        </div>
    </>

    if (!user || !userMongoProfile || loading) return (
        <Loading></Loading>
    )

    if (showAvatars) return <div>

        {
            user?.uid === userMongoProfile?.uid ?
                <h1 className='page-heading'>
                    Your ADDA Profile
                </h1>
                :
                <h1 className='page-heading'>
                    {userMongoProfile?.name}'s ADDA Profile
                </h1>
        }
        <div className='flex-container'>
            <div className='profile'>
                <Avatars setShowAvatars={setShowAvatars} setUserPhoto={setUserPhoto} userMongoProfile={userMongoProfile}></Avatars>
            </div>
        </div>
    </div>

    if (uploadImage) return <div>
        {
            user?.uid === userMongoProfile?.uid ?
                <h1 className='page-heading'>
                    Your ADDA Profile
                </h1>
                :
                <h1 className='page-heading'>
                    {userMongoProfile?.name}'s ADDA Profile
                </h1>
        }
        <div className='flex-container'>
            <div className='profile'>
                <UploadImage setUploadImage={setUploadImage} setUserPhoto={setUserPhoto} userMongoProfile={userMongoProfile}></UploadImage>
            </div>
        </div>
    </div>

    return <div>
        {
            user?.uid === userMongoProfile?.uid ?
                <h1 className='page-heading'>
                    Your ADDA Profile
                </h1>
                :
                <h1 className='page-heading'>
                    {userMongoProfile?.name}'s ADDA Profile
                </h1>
        }
        <div className='flex-container'>


            {profile}

            <ProfilePageButtons></ProfilePageButtons>

        </div>
    </div>
};

export default Profile;