import React, { useState } from 'react';
import './Profile.css'
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import logo from '../../../Assets/images/logo/Adda Logo.png'
import { toast } from 'react-hot-toast';

const Profile = () => {

    const [showImageInput, setShowImageInput] = useState(false)

    const handleImageURLInput = event => {

        setShowImageInput(false)
    }

    return (
        <div className='profile-page'>
            <img style={{ width: '300px' }} src={logo} alt=''></img>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='profile'>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '50px' }}>
                        <h2 style={{ marginBottom: '30px' }}>Your Profile</h2>
                        <div className='profile-img'>
                            <img className='user-dp' src='https://i.ibb.co/qsSZ3B3/frog.jpg' alt=''></img>
                            <h4>To Change the Image</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <Link onClick={() => setShowImageInput(!showImageInput)}>Add Image URL</Link>
                                <p>or,</p>
                                <Link>Choose An Avatar</Link>
                            </div>
                        </div>
                        {
                            showImageInput &&
                            <div style={{ width: '100%' }}>
                                <form onSubmit={handleImageURLInput} className='image-input'>
                                    <input className='image-url-input' type='text' placeholder='Image URL' name='image-url'></input>
                                    <input className='submit-img' type='submit' value='Update DP'></input>
                                    <button onClick={() => setShowImageInput(false)} className='cancel-img'>Cancel</button>
                                </form>
                                <p><small>*Please ensure that you provide a valid URL</small></p>
                            </div>

                        }

                        <div className='profile-info'>
                            <h3>Name:</h3>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: '5px ' }}>Abul Hashem</p>
                                <FaEdit className='edit-icon'></FaEdit>
                            </div>

                        </div>

                        <div className='profile-info'>
                            <h3>Email:</h3>
                            <p>abulhashem@gmail.com</p>
                        </div>
                    </div>
                    <p className='special-note'>*Email is immutable</p>
                    <p className='special-note'>*You have not verified your email yet. <Link>Verify Email</Link></p>
                    <p className='special-note' style={{ color: 'blue' }}>*UPLOAD IMAGE is Coming Soon</p>
                </div>

            </div>

        </div>



    );
};

export default Profile;