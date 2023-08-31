import React, { useContext } from 'react';
import './Message.css'
import { AuthContext } from '../../../../contexts/AuthProvider';

const Message = ({ message }) => {

    const { user } = useContext(AuthContext)

    const { msg, msgSender, msgSenderPhoto } = message

    return (
        <div className={`msg-content ${msgSender === user?.displayName ? 'own-msg' : 'friends-msg'}`}>

            <img className='sender-image' src={msgSenderPhoto} alt=''></img>

            <p className='msg-text'>{msg}</p>


        </div>
    );
};

export default Message;