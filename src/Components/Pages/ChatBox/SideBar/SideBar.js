import React, { useEffect, useState } from 'react';
import './SideBar.css'
import { FaSearch } from 'react-icons/fa';
import Person from './Person/Person';
import Group from './Group/Group';
import Loading from '../../Shared/Loading/Loading';
import ErrorPage from '../../ErrorPage/ErrorPage';
import { setSideBarInLocalStorage } from '../../../../utilities/localStorageUsage';


const SideBar = ({ sideBar, setSideBar, showInSmallDevice, setShowInSmallDevice, setChatMate, setShowLinks }) => {

    const [people, setPeople] = useState(null);
    const [groups, setGroups] = useState(null);
    const [error, setError] = useState(false)

    useEffect(() => {
        fetch('https://adda-chatting-app-server.vercel.app/users')
            .then(res => res.json())
            .then(data => setPeople(data))
            .catch(err => setError(true))
    }, [])

    useEffect(() => {
        fetch('https://adda-chatting-app-server.vercel.app/groups')
            .then(res => res.json())
            .then(data => setGroups(data))
            .catch(err => setError(true))
    }, [])

    const handleSideBarClick = (sideBar) => {
        setSideBar(sideBar)
        setSideBarInLocalStorage(sideBar)
    }

    // console.log('inside sidebar', showInSmallDevice)

    if (error) return <ErrorPage></ErrorPage>

    return (
        <div onClick={() => setShowLinks(false)} className={`sidebar ${showInSmallDevice === 'sideBar' ? 'show-in-small-device' : 'hide-in-small-device'}`}>
            <div className='sidebar-heading'>
                {
                    sideBar === 'people' ?
                        <>
                            <h2>People</h2>
                            <button className='toggle-sidebar-btn' onClick={() => handleSideBarClick('groups')}>Groups</button>
                        </>

                        :
                        <>
                            <h2>Groups</h2>
                            <button className='toggle-sidebar-btn' onClick={() => handleSideBarClick('people')}>People</button>
                        </>
                }

            </div>

            <form className='sidebar-search-input'>
                {
                    sideBar === 'people' ?
                        <input type='text' placeholder='Find a Person'></input>
                        :
                        <input type='text' placeholder='Find a Group'></input>
                }

                <button type='submit'>
                    <FaSearch></FaSearch>
                </button>
            </form>


            <div className='sidebar-content'>

                {
                    !people || !groups ?
                        <Loading position='top'></Loading>
                        :
                        <>
                            {
                                sideBar === 'people' ?
                                    people.map(person => <Person
                                        key={person?.uid}
                                        person={person}
                                        setChatMate={setChatMate}
                                        setShowInSmallDevice={setShowInSmallDevice}
                                    ></Person>)
                                    :
                                    groups.map(group => <Group
                                        key={group?.groupId}
                                        group={group}
                                        setChatMate={setChatMate}
                                        setShowInSmallDevice={setShowInSmallDevice}
                                    ></Group>)
                            }
                        </>

                }

            </div>

        </div>
    );
};

export default SideBar;