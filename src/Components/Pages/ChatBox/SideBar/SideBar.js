import React, { useEffect, useState } from 'react';
import './SideBar.css'
import { FaSearch } from 'react-icons/fa';
import Person from './Person/Person';
import Group from './Group/Group';


const SideBar = ({ sideBar, setSideBar }) => {

    const [people, setPeople] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setPeople(data))
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/groups')
            .then(res => res.json())
            .then(data => setGroups(data))
    }, [])

    return (
        <div className='sidebar'>
            <div className='sidebar-heading'>
                {
                    sideBar === 'people' ?
                        <>
                            <h2>People</h2>
                            <button className='toggle-sidebar-btn' onClick={() => setSideBar('groups')}>Groups</button>
                        </>

                        :
                        <>
                            <h2>Groups</h2>
                            <button className='toggle-sidebar-btn' onClick={() => setSideBar('people')}>People</button>
                        </>
                }

            </div>

            <div className='sidebar-search-input'>
                {
                    sideBar === 'people' ?
                        <input type='text' placeholder='Find a Person'></input>
                        :
                        <input type='text' placeholder='Find a Group'></input>
                }

                <p><FaSearch></FaSearch></p>
            </div>

            <div className='sidebar-content'>

                {sideBar === 'people' ?
                    people.map(person => <Person key={person.userId} person={person}></Person>)
                    :
                    groups.map(group => <Group key={group.groupId} group={group}></Group>)
                }
            </div>
        </div>
    );
};

export default SideBar;