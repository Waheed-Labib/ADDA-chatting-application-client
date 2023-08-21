import React, { useContext, useEffect, useRef, useState } from 'react';
import './Messages.css'
import Message from '../Message/Message';
import { FaAngleDoubleLeft, FaPaperPlane } from 'react-icons/fa';
import { AuthContext } from '../../../../contexts/AuthProvider';

const Messages = ({ showInSmallDevice, setShowInSmallDevice, chatMate }) => {

    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    // messages section auto scroll to bottom

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    // load messages from database
    useEffect(() => {
        fetch('http://localhost:5000/messages')
            .then(res => res.json())
            .then(data => {
                setMessages(data)
            })
    }, [])

    // chatmate
    const chatMateName = chatMate?.name;
    const chatMatePhoto = chatMate?.photoURL;

    // handle new message
    const handleNewMessage = event => {
        event.preventDefault()
        console.log('New Message is : ', newMessage)

        const newMsg = {
            msgFrom: user?.displayName,
            senderImg: user?.photoURL,
            message: newMessage
        }
        // post new message to database
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

    // when no chatmate is selected
    if (!chatMate) return (
        <div className={`no-message ${showInSmallDevice === 'sidebar' ? 'hide-in-small-device' : 'show-in-small-device'}`}>

        </div>
    )

    // show messages section
    return (
        <div className={`messages ${showInSmallDevice === 'sidebar' ? 'hide-in-small-device' : 'show-in-small-device'}`}>
            <div className='messages-header'>

                <FaAngleDoubleLeft
                    className='return-arrow'
                    onClick={() => setShowInSmallDevice('sidebar')}
                ></FaAngleDoubleLeft>
                <img src={chatMatePhoto} alt=''></img>
                <h2>{chatMateName}</h2>


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