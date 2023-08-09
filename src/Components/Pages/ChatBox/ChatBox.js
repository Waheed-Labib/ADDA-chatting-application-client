import React from 'react';
import { useLoaderData } from 'react-router-dom';
import './ChatBox.css'

const ChatBox = () => {

    const messages = useLoaderData();

    return (
        <div className='chatbox'>
            <h2>Messages : {messages.length}</h2>
        </div>
    );
};

export default ChatBox;