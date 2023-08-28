import React, { useContext } from 'react';
import UpdateName from '../UpdateName/UpdateName';
import Email from '../Email/Email';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider';
import frog from '../../../../Assets/images/avatar/frog.webp';
import './ShowDetails.css'
import Gender from './Gender';
import DateOfBirth from './DateOfBirth';
import Address from './Address/Address';
import Occupation from './Occupation';
import Institute from './Institute';



const ShowDetails = ({ setShowDetails, name, setName, userMongoProfile, userPhoto, uploadImage, setUploadImage, setShowAvatars }) => {
    const { user } = useContext(AuthContext)
    return (
        <div className='profile-modal'>
            <div className='profile-modal-content'>
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

                    <Gender userMongoProfile={userMongoProfile}></Gender>

                    <DateOfBirth userMongoProfile={userMongoProfile}></DateOfBirth>

                    <Address userMongoProfile={userMongoProfile}></Address>

                    <Occupation userMongoProfile={userMongoProfile}></Occupation>

                    <Institute userMongoProfile={userMongoProfile}></Institute>


                </div>

                <button onClick={() => setShowDetails(false)} className='show-profile-details-btn'>Hide Details</button>

            </div>
        </div>


    );
};

export default ShowDetails;