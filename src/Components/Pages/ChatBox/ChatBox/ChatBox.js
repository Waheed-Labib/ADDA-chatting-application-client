import React, { useContext, useEffect, useState } from 'react';
import './ChatBox.css'
import Messages from '../Messages/Messages';
import SideBar from '../SideBar/SideBar';
import { DisplayContext } from '../../../../contexts/DisplayProvider';
import ChatBoxAccessories from './ChatBoxAccessories/ChatBoxAccessories';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import { toast } from 'react-hot-toast';
import ErrorPage from '../../ErrorPage/ErrorPage';



const ChatBox = () => {

    const { setDisplayFooter } = useContext(DisplayContext)
    setDisplayFooter(false)

    const { user, loading } = useContext(AuthContext);
    const [error, setError] = useState(false)

    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('https://adda-chatting-app-server.vercel.app/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => setError(true))
    }, [])

    const [sideBar, setSideBar] = useState('people');
    const [showInSmallDevice, setShowInSmallDevice] = useState('sidebar');
    const [chatMate, setChatMate] = useState(null);

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
                >
                </SideBar>
                <Messages
                    showInSmallDevice={showInSmallDevice}
                    setShowInSmallDevice={setShowInSmallDevice}
                    chatMate={chatMate}
                ></Messages>
            </div>
            <ChatBoxAccessories></ChatBoxAccessories>
        </div>
    );
};

export default ChatBox;