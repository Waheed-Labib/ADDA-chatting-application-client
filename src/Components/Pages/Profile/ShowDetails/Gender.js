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

        userMongoProfile.gender = newGender

        fetch(`https://adda-chatting-app-server.vercel.app/users/${userMongoProfile.uid}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userMongoProfile)
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

        userMongoProfile.gender = newGender

        fetch(`https://adda-chatting-app-server.vercel.app/users/${userMongoProfile.uid}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userMongoProfile)
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
                                        <label htmlFor="female">Female</label><br />
                                        <input type="checkbox" name="male" value="male" />
                                        <label htmlFor="male">Male</label><br />
                                        <input type="checkbox" name="nonBinary" value="non-binary" />
                                        <label htmlFor="non-binary">Non-binary</label><br></br>
                                        <input type="checkbox" name="transgender" value="transgender" />
                                        <label htmlFor="transgender">Transgender</label><br></br>
                                        <input type="checkbox" name="intersex" value="intersex" />
                                        <label htmlFor="intersex">Intersex</label><br></br>
                                        <input style={{ width: '190px', height: '30px', marginTop: '5px', marginBottom: '5px' }} type='text' name='typeGender' placeholder='You Can Also Type yourself'></input>
                                        <br></br>
                                        <input style={{ width: '150px', marginTop: '10px' }} className='profile-info-submit-btn' type="submit" value="Submit" />
                                    </form>
                                    <button onClick={handleHideGender} className='profile-info-hide-btn' style={{ width: '150px', paddingInline: '5px' }}>I won't share my gender</button>
                                </div>
                                :
                                <div className='profile-info-data'>
                                    {
                                        gender.map(singleGender =>
                                            <p key={singleGender}>{singleGender}&nbsp;</p>)
                                    }
                                    <FaEdit onClick={() => setEditGender(true)} className='edit-icon'></FaEdit>
                                </div>
                        }
                    </>
                    :
                    <>
                        {
                            gender.map(singleGender =>
                                <p key={singleGender}>{singleGender}&nbsp;</p>)
                        }
                    </>


            }

        </div>
    );
};

export default Gender;