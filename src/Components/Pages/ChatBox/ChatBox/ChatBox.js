import React, { useState } from 'react';
import './ChatBox.css'
import People from '../People/People';
import Groups from '../Groups/Groups';
import Messages from '../Messages/Messages';

const ChatBox = () => {

    const [sideBar, setSideBar] = useState('people');

    return (
        <div className='chatbox'>

            {
                sideBar === 'people' ?
                    <People setSideBar={setSideBar}></People>
                    :
                    <Groups setSideBar={setSideBar}></Groups>
            }

            <Messages></Messages>

        </div>
    );
};

export default ChatBox;