import React from 'react';

const Email = ({ userMongoProfile }) => {

    return (
        <div className='profile-info'>
            <h3>Email:</h3>
            <p>{userMongoProfile?.email}</p>
        </div>
    );
};

export default Email;