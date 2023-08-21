import React, { useContext, useState } from 'react';
import './ChatBox.css'
import Messages from '../Messages/Messages';
import SideBar from '../SideBar/SideBar';
import { DisplayContext } from '../../../../contexts/DisplayProvider';
import ChatBoxAccessories from './ChatBoxAccessories/ChatBoxAccessories';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';



const ChatBox = () => {

    const { setDisplayFooter } = useContext(DisplayContext)
    setDisplayFooter(false)

    const { user } = useContext(AuthContext);

    const [sideBar, setSideBar] = useState('people');
    const [showInSmallDevice, setShowInSmallDevice] = useState('sidebar');
    const [chatMate, setChatMate] = useState('');



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