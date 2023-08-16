import React, { useContext } from 'react';
import '../SideBar.css'
import { Link } from 'react-router-dom';
import frog from '../../../../../Assets/images/avatar/frog.webp'
import { AuthContext } from '../../../../../contexts/AuthProvider';

const Person = ({ person }) => {

    const { uid, name, photoURL } = person
    const { user } = useContext(AuthContext);

    return (
        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/profile/${uid}`}>
            <div className='person'>
                <img className='person-image' src={photoURL || frog} alt=''></img>
                <h4>{name}</h4>
                {
                    user.uid === uid &&
                    <p style={{ color: 'white', fontWeight: '500' }}><small>(You)</small></p>
                }
            </div>
        </Link>
    );
};

export default Person;