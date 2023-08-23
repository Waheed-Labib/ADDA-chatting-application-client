import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Gender = ({ userMongoProfile }) => {

    const { user } = useContext(AuthContext)
    const [gender, setGender] = useState(userMongoProfile?.gender)
    const [editGender, setEditGender] = useState(false)

    // update gender
    const handleGenderSubmit = event => {
        event.preventDefault();

        const form = event.target;

        const newGender = [];

        const female = form.female.checked;
        if (female) newGender.push('Female');

        const male = form.male.checked;
        if (male) newGender.push('Male');

        const nonBinary = form.nonBinary.checked;
        if (nonBinary) newGender.push('non-binary');

        const transgender = form.transgender.checked;
        if (transgender) newGender.push('Transgender');

        const intersex = form.intersex.checked;
        if (intersex) newGender.push('Intersex');

        const typeGender = form.typeGender.value;
        if (typeGender) newGender.push(typeGender)

        // update gender in database
        const updatedUserMongoProfile = {
            uid: userMongoProfile?.uid,
            name: userMongoProfile?.name,
            email: userMongoProfile?.email,
            photoURL: userMongoProfile?.photoURL,
            gender: newGender,
            dateOfBirth: userMongoProfile?.dateOfBirth,
            occupation: userMongoProfile?.occupation,
            institute: userMongoProfile?.institute,
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
                toast.success('Gender Updated')
                setGender(newGender)
                setEditGender(false)
            })
            .catch(() => { })
    }

    // hide gender
    const handleHideGender = () => {
        const newGender = [];

        // update gender in database
        const updatedUserMongoProfile = {
            uid: userMongoProfile?.uid,
            name: userMongoProfile?.name,
            email: userMongoProfile?.email,
            photoURL: userMongoProfile?.photoURL,
            gender: newGender,
            dateOfBirth: userMongoProfile?.dateOfBirth,
            occupation: userMongoProfile?.occupation,
            institute: userMongoProfile?.institute,
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
                toast.success('Gender Updated')
                setGender(newGender)
                setEditGender(false)
            })
            .catch(() => { })
    }

    return (
        <div className='profile-info'>
            <h3>Gender:</h3>
            {
                user?.uid === userMongoProfile?.uid ?
                    <>
                        {
                            editGender ?
                                <div>
                                    <span onClick={() => setEditGender(false)} class="profile-info-close">&times;</span>
                                    <p>Which of the following most accurately describe(s) you?</p>
                                    <small>You can choose more than one</small>
                                    <form onSubmit={handleGenderSubmit} action="">
                                        <input type="checkbox" name="female" value="Female" />
                                        <label for="female">Female</label><br />
                                        <input type="checkbox" name="male" value="male" />
                                        <label for="male">Male</label><br />
                                        <input type="checkbox" name="nonBinary" value="non-binary" />
                                        <label for="non-binary">Non-binary</label><br></br>
                                        <input type="checkbox" name="transgender" value="transgender" />
                                        <label for="transgender">Transgender</label><br></br>
                                        <input type="checkbox" name="intersex" value="intersex" />
                                        <label for="intersex">Intersex</label><br></br>
                                        <input style={{ width: '190px', height: '30px', marginTop: '5px', marginBottom: '5px' }} type='text' name='typeGender' placeholder='You Can Also Type yourself'></input>
                                        <br></br>
                                        <input className='profile-info-submit-btn' type="submit" value="Submit" />
                                    </form>
                                    <button onClick={handleHideGender} className='profile-info-hide-btn' style={{ width: '200px' }}>I prefer not to say my gender</button>
                                </div>
                                :
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    {
                                        gender.map(singleGender =>
                                            <p>{singleGender}&nbsp;</p>)
                                    }
                                    <FaEdit onClick={() => setEditGender(true)} className='edit-icon'></FaEdit>
                                </div>
                        }
                    </>
                    :
                    <>
                        {
                            gender.map(singleGender =>
                                <p>{singleGender}&nbsp;</p>)
                        }
                    </>


            }

        </div>
    );
};

export default Gender;