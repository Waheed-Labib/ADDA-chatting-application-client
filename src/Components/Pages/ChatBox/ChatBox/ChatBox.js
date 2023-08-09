import React from 'react';
import { useLoaderData } from 'react-router-dom';
import './ChatBox.css'
import Message from '../Message/Message';

const ChatBox = () => {

    const messages = useLoaderData();

    return (
        <div className='chatbox'>
            <h2>Messages</h2>
            {
                messages.map(msg => <Message key={msg.id} msg={msg}></Message>)
            }
        </div>
    );
};

export default ChatBox;