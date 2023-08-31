import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import countAge from '../../../../utilities/countAge';

const DateOfBirth = ({ userMongoProfile }) => {

    const { user } = useContext(AuthContext)
    const [editDOB, setEditDOB] = useState(false)
    const [day, setDay] = useState(userMongoProfile?.dateOfBirth?.day || 1);
    const [month, setMonth] = useState(userMongoProfile?.dateOfBirth?.month || 'January');
    const [year, setYear] = useState(userMongoProfile?.dateOfBirth?.year || 1990);
    const [isDOBDisplayed, setIsDOBDisplayed] = useState(userMongoProfile?.dateOfBirth?.day)

    const [dob, setDob] = useState(
        `${userMongoProfile?.dateOfBirth?.month} ${userMongoProfile?.dateOfBirth?.day}, ${userMongoProfile?.dateOfBirth?.year}`
        || null)

    const [age, setAge] = useState(countAge(userMongoProfile?.dateOfBirth?.day, userMongoProfile?.dateOfBirth?.month, userMongoProfile?.dateOfBirth?.year)[0] || null)

    const [birthday, setBirthday] = useState(countAge(userMongoProfile?.dateOfBirth?.day, userMongoProfile?.dateOfBirth?.month, userMongoProfile?.dateOfBirth?.year)[1] || false)

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

        setIsDOBDisplayed(true)

        const newDateOfBirth = {
            day: day,
            month: month,
            year: year
        }

        userMongoProfile.dateOfBirth = newDateOfBirth;

        fetch(`https://adda-chatting-app-server.vercel.app/users/${userMongoProfile.uid}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userMongoProfile)
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

    const handleHideDOB = () => {

        userMongoProfile.dateOfBirth = null

        fetch(`https://adda-chatting-app-server.vercel.app/users/${userMongoProfile.uid}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userMongoProfile)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Your Date of Birth is hidden now')
                setDob(``)
                setIsDOBDisplayed(false)
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




                                    <button onClick={handleHideDOB} style={{ width: '150px', paddingInline: '5px' }} className='profile-info-hide-btn'>I won't share my Date of Birth</button>


                                </div>
                                :
                                <div style={{ alignItems: 'start' }} className='profile-info-data'>
                                    {
                                        isDOBDisplayed &&
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
                            isDOBDisplayed &&
                            <div>
                                <p>{dob}&nbsp;</p>
                                <p>[{age} years old]</p>
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