import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import { FaEdit } from 'react-icons/fa';

const UpdateName = ({ userMongoProfile, name, setName }) => {
    const { user, updateUserAccount } = useContext(AuthContext)

    const [editName, setEditName] = useState(false)

    const handleUpdateName = event => {
        event.preventDefault();
        const newName = event.target.name.value;
        const profile = {
            displayName: newName
        }

        updateUserAccount(profile)
            .then(() => {

                userMongoProfile.name = newName

                fetch(`https://adda-chatting-app-server.vercel.app/users/${userMongoProfile.uid}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userMongoProfile)
                })
                    .then(res => res.json())
                    .then(data => {
                        setName(newName)
                        setEditName(false)
                        toast.success('Name Updated')
                    })
                    .catch(() => { })


            }
            )
            .catch(() => alert('Something Went Wrong'))

    }

    return (
        <div className='profile-info'>
            <h3>Name:</h3>
            {
                editName ?
                    <>
                        <form className='name-form' onSubmit={handleUpdateName}>
                            <input className='name-input' type='text' defaultValue={userMongoProfile.name} name='name'></input>
                            <input style={{ width: '100%' }} className='profile-info-submit-btn' type='submit' value='Update Name'></input>
                        </form>
                    </>
                    :
                    <div onClick={() => setEditName(true)} style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ marginRight: '5px ' }}>{name || userMongoProfile.name}</p>
                        {
                            user?.uid === userMongoProfile?.uid && <FaEdit className='edit-icon'></FaEdit>
                        }
                    </div>
            }


        </div>

    );
};

export default UpdateName;