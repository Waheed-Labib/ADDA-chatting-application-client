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
                setName(newName)
                setEditName(false)
                toast.success('Name Updated')
            })
            .catch(() => toast.error('Something Went Wrong'))

    }

    return (
        <div className='profile-info'>
            <h3>Name:</h3>
            {
                editName ?
                    <form className='name-form' onSubmit={handleUpdateName}>
                        <input className='name-input' type='text' defaultValue={userMongoProfile.name} name='name'></input>
                        <input className='name-submit' type='submit' value='Update Name'></input>
                    </form>
                    :
                    <div onClick={() => setEditName(true)} style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ marginRight: '5px ' }}>{name || userMongoProfile.name}</p>
                        {
                            user.uid === userMongoProfile.uid && <FaEdit className='edit-icon'></FaEdit>
                        }
                    </div>
            }


        </div>

    );
};

export default UpdateName;