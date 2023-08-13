import React, { useEffect, useState } from 'react';
import './People.css'
import Person from './Person';

const People = ({ setSideBar }) => {

    const [people, setPeople] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setPeople(data))
    }, [])

    return (
        <div className='people sidebar'>
            <div className='sidebar-heading'>
                <h2>People</h2>
                <button className='toggle-sidebar-btn' onClick={() => setSideBar('groups')}>Groups</button>
            </div>

            <div className='sidebar-content'>
                {
                    people.map(person => <Person key={person.userId} person={person}></Person>)
                }
            </div>
        </div>
    );
};

export default People;