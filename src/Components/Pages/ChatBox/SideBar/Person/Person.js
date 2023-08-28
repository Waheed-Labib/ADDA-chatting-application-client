import React, { useContext } from 'react';
import '../SideBar.css'
import { Link } from 'react-router-dom';
import frog from '../../../../../Assets/images/avatar/frog.webp'
import { AuthContext } from '../../../../../contexts/AuthProvider';
import { setChatMateInLocalStorage, setShowInSmallDeviceInLocalStorage } from '../../../../../utilities/localStorageUsage';
import countAge from '../../../../../utilities/countAge';
import birthdayCake from '../../../../../Assets/images/birthday/birthday.png'


const Person = ({ person, setChatMate, setShowInSmallDevice }) => {

    const { uid, name, photoURL } = person
    const { user } = useContext(AuthContext);

    const handlePersonClick = () => {
        setChatMate(person)
        setShowInSmallDevice('messages')

        setChatMateInLocalStorage(person)
        setShowInSmallDeviceInLocalStorage('messages')
    }

    const birthdayDate = person?.dateOfBirth?.day;
    const birthdayMonth = person?.dateOfBirth?.month;
    const birthdayYear = person?.dateOfBirth?.year;
    console.log(birthdayDate, birthdayMonth, birthdayYear)

    const isBirthday = countAge(birthdayDate, birthdayMonth, birthdayYear)[1];
    console.log(isBirthday)

    return (
        <Link onClick={handlePersonClick} style={{ textDecoration: 'none', color: 'black' }}>
            <div className='person'>
                <img className='person-image' src={photoURL || frog} alt=''></img>
                <h4>{name}</h4>
                {
                    user?.uid === uid &&
                    <p style={{ color: 'white', fontWeight: '500' }}><small>(You)</small></p>
                }
                {
                    isBirthday &&
                    <img style={{ height: '45px', width: '45px' }} src={birthdayCake} alt=''></img>
                }
            </div>
        </Link>
    );
};

export default Person;