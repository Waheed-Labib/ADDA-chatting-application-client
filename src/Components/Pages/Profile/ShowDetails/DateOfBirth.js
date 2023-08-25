import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import countAge from '../../../../utilities/countAge';

const DateOfBirth = ({ userMongoProfile }) => {

    const { user } = useContext(AuthContext)
    const [editDOB, setEditDOB] = useState(false)
    const [day, setDay] = useState(1);
    const [month, setMonth] = useState('January');
    const [year, setYear] = useState(2023);
    const [dob, setDob] = useState(
        `${userMongoProfile?.dateOfBirth?.month} ${userMongoProfile?.dateOfBirth?.day}, ${userMongoProfile?.dateOfBirth?.year}`
        || null)

    const [age, setAge] = useState(countAge(userMongoProfile?.dateOfBirth.day, userMongoProfile?.dateOfBirth.month, userMongoProfile?.dateOfBirth?.year)[0] || null)

    const [birthday, setBirthday] = useState(countAge(userMongoProfile?.dateOfBirth.day, userMongoProfile?.dateOfBirth.month, userMongoProfile?.dateOfBirth?.year)[1] || false)

    const handleDayChange = (event) => {
        setDay(event.target.value);
    };

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handleDOBSubmit = event => {
        event.preventDefault();

        const newDateOfBirth = {
            day: day,
            month: month,
            year: year
        }

        // update date of birth in database
        const updatedUserMongoProfile = {
            uid: userMongoProfile?.uid,
            name: userMongoProfile?.name,
            email: userMongoProfile?.email,
            photoURL: userMongoProfile?.photoURL,
            gender: userMongoProfile?.gender,
            dateOfBirth: newDateOfBirth,
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
                toast.success('Date of Birth Updated')
                setDob(`${month} ${day}, ${year}`)
                setAge(countAge(day, month, year)[0])
                setBirthday(countAge(day, month, birthday)[1])
                setEditDOB(false)
            })
            .catch(() => { })
    }

    return (
        <div className='profile-info'>
            <h3>Date of Birth :</h3>
            {
                user?.uid === userMongoProfile?.uid ?
                    <>
                        {
                            editDOB ?
                                <div>
                                    <span onClick={() => setEditDOB(false)} class="profile-info-close">&times;</span>

                                    <form className='dob-form' onSubmit={handleDOBSubmit}>
                                        <label htmlFor="day">Day:</label>
                                        <select id="day" name="day" value={day} onChange={handleDayChange}>

                                            {/* Generate options for days from 1 to 31 */}
                                            {
                                                Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                                    <option key={day} value={day}>
                                                        {day}
                                                    </option>
                                                ))
                                            }
                                        </select>

                                        <label htmlFor="month">Month:</label>
                                        <select id="month" name="month" value={month} onChange={handleMonthChange}>

                                            {/* Generate options for months from January to December */}
                                            {[
                                                'January',
                                                'February',
                                                'March',
                                                'April',
                                                'May',
                                                'June',
                                                'July',
                                                'August',
                                                'September',
                                                'October',
                                                'November',
                                                'December'
                                            ].map((month, index) => (
                                                <option key={index + 1} value={month}>
                                                    {month}
                                                </option>
                                            ))}
                                        </select>

                                        <label htmlFor="year">Year:</label>
                                        <select id="year" name="year" value={year} onChange={handleYearChange}>

                                            {/* Generate options for years from current year to 100 years ago */}
                                            {Array.from({ length: 101 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>

                                        <input className='profile-info-submit-btn' type="submit" value="Submit" />
                                    </form>

                                    <button style={{ width: '150px' }} className='profile-info-hide-btn'>Hide my Date of Birth</button>
                                </div>
                                :
                                <div style={{ alignItems: 'start' }} className='profile-info-data'>
                                    {
                                        dob &&
                                        <div>
                                            <p>{dob}&nbsp;</p>
                                            <p>[{age} years old]</p>
                                            <p
                                                style={{ color: 'darkblue', fontSize: '1.2rem' }}
                                                className={`${birthday ? '' : 'd-none'}`}>
                                                Today is your Birthday !</p>
                                        </div>
                                    }

                                    <FaEdit onClick={() => setEditDOB(true)} className='edit-icon'></FaEdit>
                                </div>

                        }
                    </>
                    :
                    <div className='profile-info-data'>
                        {
                            dob &&
                            <div>
                                <p>{dob}&nbsp;</p>
                                <p>{age} years age</p>
                                <p
                                    style={{ color: 'darkblue', fontSize: '1.2rem' }}
                                    className={`${birthday ? '' : 'd-none'}`}
                                >Today is {userMongoProfile?.name}'s Birthday !</p>
                            </div>
                        }

                    </div>
            }

        </div>
    );
};

export default DateOfBirth;