import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-hot-toast'

const Occupation = ({ userMongoProfile }) => {

    const { user } = useContext(AuthContext)
    const [occupation, setOccupation] = useState(userMongoProfile?.occupation)
    const [editOccupation, setEditOccupation] = useState(false)

    const handleOccupationSubmit = event => {

        event.preventDefault();

        userMongoProfile.occupation = occupation;

        fetch(`https://adda-chatting-app-server.vercel.app/users/${userMongoProfile.uid}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userMongoProfile)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Occupation Updated')
                // setOccupation(newOccupation)
                setEditOccupation(false)
            })
            .catch(() => { })
    }

    const handleHideOccupation = () => {

        userMongoProfile.occupation = '';

        fetch(`https://adda-chatting-app-server.vercel.app/users/${userMongoProfile.uid}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userMongoProfile)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Your Occupation will be hidden')
                setOccupation('')
                setEditOccupation(false)
            })
            .catch(() => { })

    }


    return (
        <div className='profile-info'>
            <h3>Occupation :</h3>
            {
                user?.uid === userMongoProfile?.uid ?
                    <>
                        {
                            editOccupation ?
                                <div>
                                    <span onClick={() => setEditOccupation(false)} class="profile-info-close">&times;</span>

                                    <form style={{ marginTop: '20px', marginRight: '10px' }} onSubmit={handleOccupationSubmit}>

                                        <input onChange={(event) => setOccupation(event.target.value)} style={{ width: '100%', height: '30px', marginBottom: '10px', borderRadius: '3px', border: '1px solid grey' }} type='text' placeholder='Your Address'></input>

                                        <input style={{ width: '150px' }} className='profile-info-submit-btn' type='submit'></input>
                                    </form>
                                    <button onClick={handleHideOccupation} style={{ width: '150px', paddingInline: '5px' }} className='profile-info-hide-btn'>I won't share my Occupation</button>
                                </div>
                                :
                                <div className='profile-info-data'>
                                    <p>{occupation}</p>

                                    <FaEdit onClick={() => setEditOccupation(true)} className='edit-icon'></FaEdit>
                                </div>
                        }
                    </>
                    :
                    <>
                        <p>{occupation}</p>
                    </>
            }
        </div>
    );
};

export default Occupation;