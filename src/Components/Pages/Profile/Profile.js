import React, { useContext, useState } from 'react';
import './Profile.css'
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import frog from '../../../Assets/images/avatar/frog.webp'
import Avatars from './Avatars/Avatars';
import Loading from '../Shared/Loading/Loading';
import thoughtBubble from '../../../Assets/images/loading/thought-bubble.jpg'
import UploadImage from './UploadImage/UploadImage';
import ProfilePageButtons from './ProfilePageButtons/ProfilePageButtons';
import UpdateName from './UpdateName/UpdateName';
import Email from './Email/Email';
import { DisplayContext } from '../../../contexts/DisplayProvider';
import ShowDetails from './ShowDetails/ShowDetails';



const Profile = () => {

    const { setDisplayFooter } = useContext(DisplayContext)
    setDisplayFooter(true)

    const userMongoProfile = useLoaderData();

    const { user, verifyEmail, loading } = useContext(AuthContext)
    const [name, setName] = useState(userMongoProfile?.name)
    const [showAvatars, setShowAvatars] = useState(false)
    const [uploadImage, setUploadImage] = useState(false)
    const [userPhoto, setUserPhoto] = useState(userMongoProfile?.photoURL)

    const [showDetails, setShowDetails] = useState(false)

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


            <button onClick={() => setShowDetails(true)} className='show-profile-details-btn'>Show Details</button>


            {/* special note */}
            {
                user?.uid === userMongoProfile?.uid &&
                <>
                    {
                        !user?.emailVerified &&
                        <p className='special-note'>*You have not verified your email yet. <Link onClick={handleEmailVerification}>Verify Email</Link></p>

                    }
                </>
            }
        </div>
    </>

    if (!user || !userMongoProfile || loading) return (
        <div style={{ backgroundColor: 'white' }} className='loading'>
            <h2 style={{ margin: '0' }}>SEARCHING THIS PERSON</h2>

            <p style={{ margin: '0' }} className='dot'>...</p>

            <div className='bubble-section'>
                <img style={{ height: '100px', width: '100px', marginTop: '30px' }} src={thoughtBubble} alt=''></img>
                <h3 style={{ color: 'rgb(1, 1, 83)', marginTop: '0' }}>
                    Is this the real Id?
                </h3>
                <h3 style={{ color: 'rgb(1, 1, 83)', marginTop: '0', marginBottom: '45px' }}>
                    Or is this just fanatasy?
                </h3>

                <Link onClick={() => window.history.back(1)} style={{ color: 'black' }}>Go Back</Link>
            </div>

        </div>
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

            <ProfilePageButtons userMongoProfile={userMongoProfile}></ProfilePageButtons>

            {
                showDetails &&
                <ShowDetails
                    setShowDetails={setShowDetails}
                    name={name}
                    setName={setName}
                    userMongoProfile={userMongoProfile}
                    userPhoto={userPhoto}
                    uploadImage={uploadImage}
                    setUploadImage={setUploadImage}
                    setShowAvatars={setShowAvatars}
                ></ShowDetails>
            }

        </div>
    </div>
};

export default Profile;