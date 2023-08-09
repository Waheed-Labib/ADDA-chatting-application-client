import React from 'react';
import './Message.css'

const Message = ({ msg }) => {

    const { username, userImg, message } = msg;

    return (
        <div>
            <img className='msg-user-img' src={userImg} alt=''></img>
            <div>
                <p><small>{username}</small></p>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Message;