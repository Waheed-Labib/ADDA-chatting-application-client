import React, { useEffect, useState } from 'react';
import './Messages.css'
import Message from '../Message/Message';
import { FaPaperPlane } from 'react-icons/fa';

const Messages = () => {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/messages')
            .then(res => res.json())
            .then(data => setMessages(data))
    }, [])

    const username = 'Ayesha Takia';
    const userPhoto = 'https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?size=626&ext=jpg&uid=R77838462&ga=GA1.2.1203103457.1659020646&semt=sph'

    return (
        <div className='messages'>
            <div className='messages-header'>
                <img src={userPhoto} alt=''></img>
                <h2>{username}</h2>
            </div>

            <div className='messages-content'>
                {
                    messages.map(msg => <Message key={msg.msgId} msg={msg}></Message>)
                }
            </div>

            <form className='msg-sending-form'>
                <input type='text' placeholder='Type Your Message'></input>
                <p>
                    <FaPaperPlane></FaPaperPlane>
                </p>
            </form>
        </div>
    );
};

export default Messages;