import React, { useContext, useEffect, useState } from 'react';
import './ChatBox.css'
import Messages from '../Messages/Messages';
import SideBar from '../SideBar/SideBar';
import { DisplayContext } from '../../../../contexts/DisplayProvider';
import ChatBoxAccessories from './ChatBoxAccessories/ChatBoxAccessories';
import { AuthContext } from '../../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';
import ErrorPage from '../../ErrorPage/ErrorPage';
import { getChatMateFromLocalStorage, getShowInSmallDeviceFromLocalStorage, getSideBarFromLocalStorage } from '../../../../utilities/localStorageUsage';



const ChatBox = () => {

    const { setDisplayFooter } = useContext(DisplayContext)
    setDisplayFooter(false)

    const { user, loading } = useContext(AuthContext);
    const [error, setError] = useState(false)
    const [showLinks, setShowLinks] = useState(false);

    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('https://adda-chatting-app-server.vercel.app/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => setError(true))
    }, [])

    // chatbox states
    const [sideBar, setSideBar] = useState(getSideBarFromLocalStorage() || 'people');
    const [showInSmallDevice, setShowInSmallDevice] = useState(getShowInSmallDeviceFromLocalStorage() || 'sideBar');
    const [chatMate, setChatMate] = useState(getChatMateFromLocalStorage() || null);

    // console.log('inside chat box', showInSmallDevice)

    if (error) return <ErrorPage></ErrorPage>

    if (loading) return <Loading></Loading>

    return (
        <div className='chatbox'>
            <div className='chatbox-body'>
                <SideBar
                    sideBar={sideBar}
                    setSideBar={setSideBar}
                    showInSmallDevice={showInSmallDevice}
                    setShowInSmallDevice={setShowInSmallDevice}
                    setChatMate={setChatMate}
                    setShowLinks={setShowLinks}
                >
                </SideBar>
                <Messages
                    showInSmallDevice={showInSmallDevice}
                    setShowInSmallDevice={setShowInSmallDevice}
                    chatMate={chatMate}
                    setShowLinks={setShowLinks}
                ></Messages>
            </div>
            <ChatBoxAccessories
                showLinks={showLinks}
                setShowLinks={setShowLinks}
            ></ChatBoxAccessories>
        </div>
    );
};

export default ChatBox;