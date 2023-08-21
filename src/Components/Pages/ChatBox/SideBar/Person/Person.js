import React, { useContext } from 'react';
import '../SideBar.css'
import { Link } from 'react-router-dom';
import frog from '../../../../../Assets/images/avatar/frog.webp'
import { AuthContext } from '../../../../../contexts/AuthProvider';


const Person = ({ person, setChatMate, setShowInSmallDevice }) => {

    const { uid, name, photoURL } = person
    const { user } = useContext(AuthContext);

    const handlePersonClick = () => {
        setChatMate(person)
        setShowInSmallDevice('messages')
    }

    return (
        <Link onClick={handlePersonClick} style={{ textDecoration: 'none', color: 'black' }}>
            <div className='person'>
                <img className='person-image' src={photoURL || frog} alt=''></img>
                <h4>{name}</h4>
                {
                    user?.uid === uid &&
                    <p style={{ color: 'white', fontWeight: '500' }}><small>(You)</small></p>
                }
            </div>
        </Link>
    );
};

export default Person;