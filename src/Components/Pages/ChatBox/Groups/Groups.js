import React from 'react';
import './Groups.css'

const Groups = ({ setSideBar }) => {
    return (
        <div className='groups sidebar'>
            <div className='sidebar-heading'>
                <h2>Groups</h2>
                <button onClick={() => setSideBar('people')}>Show People</button>
            </div>
        </div>
    );
};

export default Groups;