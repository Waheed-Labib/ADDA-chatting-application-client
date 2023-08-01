import React from 'react';
import './Profile.css'
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import logo from '../../../Assets/images/logo/Adda Logo.png'

const Profile = () => {

    return (
        <div className='profile-page'>
            <img style={{ width: '300px' }} src={logo} alt=''></img>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='profile'>
                    <h2>Your Profile</h2>
                    <div className='profile-img'>
                        <img className='user-dp' src='https://i.ibb.co/qsSZ3B3/frog.jpg' alt=''></img>
                        <h4>To Change the Image</h4>
                        <Link>Add Image URL</Link>
                        or, <Link>Choose An Avatar</Link>
                    </div>
                    <div className='profile-info'>
                        <h3>Name:</h3>
                        <p>Abul Hashem</p>
                        <FaEdit></FaEdit>
                    </div>

                    <div className='profile-info'>
                        <h3>Email:</h3>
                        <p>abulhashem@gmail.com</p>
                        <small style={{ color: 'maroon' }}>(immutable)</small>
                    </div>
                </div>
            </div>
        </div>



    );
};

export default Profile;