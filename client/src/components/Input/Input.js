import React from "react";

import './Input.css';

const Input = ({ setMessage, sendMessage, message}) => {

    return (



        <div className="input-form">
           
            <input
                className="input"
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={({ target: { value } }) => setMessage(value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>

        </div>
    )
}

export default Input;