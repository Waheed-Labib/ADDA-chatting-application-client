import React from 'react';
import './Groups.css'

const Groups = ({ setSideBar }) => {
    return (
        <div className='groups sidebar'>
            <div className='sidebar-heading'>
                <h2>Groups</h2>
                <button className='toggle-sidebar-btn' onClick={() => setSideBar('people')}>People</button>
            </div>
        </div>
    );
};

export default Groups;