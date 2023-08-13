import React, { useEffect, useState } from 'react';
import './Groups.css'
import Group from './Group';

const Groups = ({ setSideBar }) => {

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/groups')
            .then(res => res.json())
            .then(data => setGroups(data))
    }, [])

    return (
        <div className='groups sidebar'>
            <div className='sidebar-heading'>
                <h2>Groups</h2>
                <button className='toggle-sidebar-btn' onClick={() => setSideBar('people')}>People</button>
            </div>

            <div className='sidebar-content'>
                {
                    groups.map(group => <Group key={group.groupId} group={group}></Group>)
                }
            </div>
        </div>
    );
};

export default Groups;