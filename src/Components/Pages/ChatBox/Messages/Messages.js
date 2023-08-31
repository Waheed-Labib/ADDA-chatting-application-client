import React, { useContext, useEffect, useRef, useState } from 'react';
import './Messages.css'
import Message from '../Message/Message';
import { FaAngleDoubleLeft, FaPaperPlane } from 'react-icons/fa';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import ErrorPage from '../../ErrorPage/ErrorPage';
import { setShowInSmallDeviceInLocalStorage } from '../../../../utilities/localStorageUsage';
import genarateChatId from '../../../../utilities/genarateChatId';


const Messages = ({ showInSmallDevice, setShowInSmallDevice, chatMate, setShowLinks }) => {

    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [error, setError] = useState(false)
    const [chats, setChats] = useState([]);

    // messages section auto scroll to bottom

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    useEffect(() => {
        fetch('https://adda-chatting-app-server.vercel.app/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => setError(true))
    }, [])

    useEffect(() => {
        fetch('https://adda-chatting-app-server.vercel.app/chats')
            .then(res => res.json())
            .then(data => setChats(data))
            .catch(err => setError(true))
    }, [])


    // chatmate
    const chatMateName = chatMate?.name;
    const chatMatePhoto = chatMate?.photoURL;

    const userMongoProfile = users?.find(usr => user?.uid === usr.uid)
    const chat = userMongoProfile?.chatBox?.find(mate => mate.chatMateUid === chatMate?.uid);

    // get full chat
    if (chat) {
        fetch(`https://adda-chatting-app-server.vercel.app/chats/${chat?.chatId}`)
            .then(res => res.json())
            .then(data => setMessages(data.messages))
            .catch(() => { })
    }


    // handle new message
    const handleNewMessage = event => {
        event.preventDefault()

        const newMsg = {
            msgId: messages.length + 1,
            msg: newMessage,
            msgSender: userMongoProfile?.name,
            msgSenderPhoto: userMongoProfile?.photoURL
        }

        if (!chat) {

            const chatId = genarateChatId(chats);

            const newChatMate = {
                chatMateUid: chatMate?.uid,
                chatId: chatId
            }

            // add chatMate in user's chatBox

            userMongoProfile?.chatBox?.push(newChatMate)

            fetch(`https://adda-chatting-app-server.vercel.app/users/${userMongoProfile.uid}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userMongoProfile)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
                .catch(() => { })

            // add new chat in database

            const newChat = {
                chatId: chatId,
                messages: [newMsg]
            }

            fetch('https://adda-chatting-app-server.vercel.app/chats', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newChat)
            })

            // add user in chatMate's chatBox

            const userChatMate = {
                chatMateUid: userMongoProfile?.uid,
                chatId: chatId
            }

            chatMate?.chatBox?.push(userChatMate)

            fetch(`https://adda-chatting-app-server.vercel.app/users/${chatMate.uid}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(chatMate)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
                .catch(() => { })
        }

        else {
            chat?.messages?.push(newMsg)

            fetch(`https://adda-chatting-app-server.vercel.app/chats/${chat?.chatId}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(chat)
            })
                .then(res => res.json())
                .then(data => {
                    setMessages([...messages, newMsg])
                })
                .catch(() => { })
        }

        event.target.reset();
    }


    // console.log('outside left arrow', showInSmallDevice)
    const handleLeftArrowClick = () => {
        setShowInSmallDevice('sideBar')
        setShowInSmallDeviceInLocalStorage('sideBar')
    }

    if (error) return <div className={`messages ${showInSmallDevice === 'sideBar' ? 'hide-in-small-device' : 'show-in-small-device'}`}>
        <ErrorPage></ErrorPage>
    </div>

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
                <div style={{ width: '100%' }}>
                    {
                        messages.map(message => <Message key={message.msgId} message={message}></Message>)
                    }

                    <div ref={messagesEndRef} />
                </div>
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