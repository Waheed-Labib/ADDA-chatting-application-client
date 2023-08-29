import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-hot-toast'

const Institute = ({ userMongoProfile }) => {

    const { user } = useContext(AuthContext)
    const [institute, setInstitute] = useState(userMongoProfile?.institute || '')
    const [editInstitute, setEditInstitute] = useState(false)

    const handleInstituteSubmit = event => {

        event.preventDefault();

        const newInstitute = institute;

        // update gender in database
        const updatedUserMongoProfile = {
            uid: userMongoProfile?.uid,
            name: userMongoProfile?.name,
            email: userMongoProfile?.email,
            photoURL: userMongoProfile?.photoURL,
            gender: userMongoProfile?.gender,
            dateOfBirth: userMongoProfile?.dateOfBirth,
            occupation: userMongoProfile?.occupation,
            institute: newInstitute,
            address: userMongoProfile?.address
        }

        fetch(`https://adda-chatting-app-server.vercel.app/users/${userMongoProfile.uid}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUserMongoProfile)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Institute Updated')
                setInstitute(newInstitute)
                setEditInstitute(false)
            })
            .catch(() => { })
    }

    const handleHideInstitute = () => {

        const newInstitute = '';

        // hide institute in database
        const updatedUserMongoProfile = {
            uid: userMongoProfile?.uid,
            name: userMongoProfile?.name,
            email: userMongoProfile?.email,
            photoURL: userMongoProfile?.photoURL,
            gender: userMongoProfile?.gender,
            dateOfBirth: userMongoProfile?.dateOfBirth,
            occupation: userMongoProfile?.occupation,
            institute: newInstitute,
            address: userMongoProfile?.address
        }

        fetch(`https://adda-chatting-app-server.vercel.app/users/${userMongoProfile.uid}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUserMongoProfile)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Your Institute will be hidden')
                setInstitute(newInstitute)
                setEditInstitute(false)
            })
            .catch(() => { })

    }


    return (
        <div className='profile-info'>
            <h3>Institute :</h3>
            {
                user?.uid === userMongoProfile?.uid ?
                    <>
                        {
                            editInstitute ?
                                <div>
                                    <span onClick={() => setEditInstitute(false)} class="profile-info-close">&times;</span>

                                    <form style={{ marginTop: '20px', marginRight: '10px' }} onSubmit={handleInstituteSubmit}>

                                        <input onChange={(event) => setInstitute(event.target.value)} style={{ width: '100%', height: '30px', marginBottom: '10px', borderRadius: '3px', border: '1px solid grey' }} type='text' placeholder='Your Address'></input>

                                        <input style={{ width: '150px' }} className='profile-info-submit-btn' type='submit'></input>
                                    </form>
                                    <button onClick={handleHideInstitute} style={{ width: '150px', paddingInline: '5px' }} className='profile-info-hide-btn'>I won't share my Institute</button>
                                </div>
                                :
                                <div className='profile-info-data'>
                                    <p>{institute}</p>

                                    <FaEdit onClick={() => setEditInstitute(true)} className='edit-icon'></FaEdit>
                                </div>
                        }
                    </>
                    :
                    <>
                        <p>{institute}</p>
                    </>
            }
        </div>
    );
};

export default Institute;