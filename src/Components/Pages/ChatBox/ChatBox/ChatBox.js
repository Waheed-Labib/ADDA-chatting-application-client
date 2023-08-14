import React, { useContext, useState } from 'react';
import './ChatBox.css'
import Messages from '../Messages/Messages';
import SideBar from '../SideBar/SideBar';
import { DisplayContext } from '../../../../contexts/DisplayProvider';

const ChatBox = () => {

    const { setDisplayFooter } = useContext(DisplayContext)
    setDisplayFooter(false)

    const [sideBar, setSideBar] = useState('people');

    return (
        <div className='chatbox'>

            <SideBar sideBar={sideBar} setSideBar={setSideBar}></SideBar>
            <Messages></Messages>

        </div>
    );
};

export default ChatBox;