import React from 'react';
import './People.css'

const People = ({ setSideBar }) => {
    return (
        <div className='people sidebar'>
            <div className='sidebar-heading'>
                <h2>People</h2>
                <button className='toggle-sidebar-btn' onClick={() => setSideBar('groups')}>Groups</button>
            </div>
        </div>
    );
};

export default People;