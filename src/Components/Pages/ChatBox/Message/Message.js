import React from 'react';
import './Message.css'

const Message = ({ msg }) => {

    const { msgId, msgFrom, senderImg, message } = msg

    return (
        <div className={`msg-content ${msgFrom === 'Md Abdul Halim' ? 'own-msg' : 'friends-msg'}`}>

            <img className='sender-image' src={senderImg} alt=''></img>


            <p className='msg-text'>{message}</p>


        </div>
    );
};

export default Message;