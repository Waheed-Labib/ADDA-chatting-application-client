import React from 'react';
import '../SideBar.css'

const Person = ({ person }) => {

    const { userId, username, userPhoto } = person

    return (
        <div>
            <img className='person-image' src={userPhoto} alt=''></img>
            <h4>{username}</h4>
        </div>
    );
};

export default Person;