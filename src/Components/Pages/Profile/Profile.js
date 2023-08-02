import React, { useContext, useState } from 'react';
import './Profile.css'
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import logo from '../../../Assets/images/logo/Adda Logo.png'
import { AuthContext } from '../../../contexts/AuthProvider';
import frog from '../../../Assets/images/avatar/frog.webp'

const Profile = () => {

    const { user, updateUserAccount } = useContext(AuthContext)
    const [editName, setEditName] = useState(false)
    const [name, setName] = useState(user?.displayName)
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
            })
    }

    return (
        <div className='profile-page'>
            <img style={{ width: '300px' }} src={logo} alt=''></img>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='profile'>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '50px' }}>
                        <h2 style={{ marginBottom: '30px' }}>Your Profile</h2>
                        <div className='profile-img'>

                            <img className='user-dp' src={frog} alt=''></img>

                            <h4>To Change the Image</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <Link>Upload Image</Link>
                                <p>or,</p>
                                <Link>Choose An Avatar</Link>
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
                    <p className='special-note'>*Email is immutable</p>
                    {
                        !user?.emailVerified &&
                        <p className='special-note'>*You have not verified your email yet. <Link>Verify Email</Link></p>

                    }
                    <p className='special-note' style={{ color: 'blue' }}>*UPLOAD IMAGE is Coming Soon</p>
                </div>

            </div>

        </div>



    );
};

export default Profile;