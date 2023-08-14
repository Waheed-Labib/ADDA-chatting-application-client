import React, { useEffect, useRef, useState } from 'react';
import './Messages.css'
import Message from '../Message/Message';
import { FaPaperPlane } from 'react-icons/fa';

const Messages = () => {

    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    useEffect(() => {
        fetch('http://localhost:5000/messages')
            .then(res => res.json())
            .then(data => {
                setMessages(data)
            })
    }, [])

    const username = 'Ayesha Takia';
    const userPhoto = 'https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?size=626&ext=jpg&uid=R77838462&ga=GA1.2.1203103457.1659020646&semt=sph'

    const handleNewMessage = event => {
        event.preventDefault()
        console.log('New Message is : ', newMessage)

        const newMsg = {
            msgFrom: 'Md Abdul Halim',
            senderImg: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&uid=R77838462&ga=GA1.2.1203103457.1659020646&semt=sph',
            message: newMessage
        }

        fetch('http://localhost:5000/messages', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newMsg)
        })
            .then(res => res.json())
            .then(data => {
                setMessages([...messages, data])
            })
            .catch(err => console.error(err))

        event.target.reset();
    }

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
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleNewMessage} className='msg-sending-form'>
                <input
                    onChange={event => setNewMessage(event.target.value)}
                    type='text'
                    placeholder='Type Your Message'></input>

                <button type='submit'>
                    <FaPaperPlane></FaPaperPlane>
                </button>
            </form>
        </div>
    );
};

export default Messages;