import React, { useState } from 'react';
import './ChatBox.css'
import Messages from '../Messages/Messages';
import SideBar from '../SideBar/SideBar';

const ChatBox = () => {

    const [sideBar, setSideBar] = useState('people');

    return (
        <div className='chatbox'>

            <SideBar sideBar={sideBar} setSideBar={setSideBar}></SideBar>
            <Messages></Messages>

        </div>
    );
};

export default ChatBox;