import React, { useContext, useEffect, useRef, useState } from 'react';
import './Messages.css'
import Message from '../Message/Message';
import { FaAngleDoubleLeft, FaPaperPlane } from 'react-icons/fa';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import ErrorPage from '../../ErrorPage/ErrorPage';
import { setShowInSmallDeviceInLocalStorage } from '../../../../utilities/localStorageUsage';


const Messages = ({ showInSmallDevice, setShowInSmallDevice, chatMate, setShowLinks }) => {

    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [error, setError] = useState(false)
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
        fetch('https://adda-chatting-app-server.vercel.app/messages')
            .then(res => res.json())
            .then(data => {
                setMessages(data)
            })
            .catch(err => setError(true))
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
        fetch('https://adda-chatting-app-server.vercel.app/messages', {
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
            .catch(err => setError(true))
        event.target.reset();
    }

    // console.log('outside left arrow', showInSmallDevice)
    const handleLeftArrowClick = () => {
        setShowInSmallDevice('sideBar')
        setShowInSmallDeviceInLocalStorage('sideBar')
    }

    if (error) return <ErrorPage></ErrorPage>
    // when no chatmate is selected
    if (!chatMate) return (
        <div className={`no-message ${showInSmallDevice === 'sideBar' ? 'hide-in-small-device' : 'show-in-small-device'}`}>

        </div>
    )

    // show messages section
    return (
        <div onClick={() => setShowLinks(false)} className={`messages ${showInSmallDevice === 'sideBar' ? 'hide-in-small-device' : 'show-in-small-device'}`}>
            <div className='messages-header'>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '10px' }}>
                    <FaAngleDoubleLeft
                        className='return-arrow'
                        onClick={handleLeftArrowClick}
                    ></FaAngleDoubleLeft>

                    <div className='chatmate-identity'>
                        <img src={chatMatePhoto} alt=''></img>
                        <h2>{chatMateName}</h2>
                    </div>
                </div>

                <Link className='chatmate-profile-link' to={`/profile/${chatMate?.uid}`}>Profile</Link>

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