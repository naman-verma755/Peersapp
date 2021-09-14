import React from 'react';
import ReactEmoji from 'react-emoji';

import './message.css';
const Message = ({ message: { username, message }, name }) => {

  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (username === trimmedName) {
    isSentByCurrentUser = true;

  }


  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">

          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(message)}</p>
          </div>
        </div>
      )
      : (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(message)}</p>
          </div>
          <p className="sentText pl-10 ">{username}</p>
        </div>
      )
  );
}

export default Message;