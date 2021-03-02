import React, { useEffect, useState } from 'react';

import queryString from 'query-string';
import io from 'socket.io-client';
import './CodeArea.css';


import LivePeers from '../LivePeers/LivePeers';
import Input from '../Input/Input';
import LiveChat from '../LiveChat/LiveChat';

const ENDPOINT = 'https://peerswebapplication.herokuapp.com/';


let socket;

var connectionOptions = {
    "force new connection": true,
    "reconnectionAttempts": "Infinity",
    "timeout": 10000,
    "transports": ["websocket"]
};
const CodeArea = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState(''); 
    const [messages, setMessages] = useState([]);
    const [textmessage, setTextMessage] = useState('');
    const [toggle, setButton] = useState(1);



    useEffect(() => {
        const { name, room, passcode } = queryString.parse(location.search);

        socket = io(ENDPOINT, connectionOptions);
        
        setRoom(room);
        setName(name);

        socket.emit('join', { name, room, passcode });


    }, [ENDPOINT, location.search]);
   
    useEffect(() => {

        socket.on('addtotextarea', textContainer => {

            setTextMessage(textContainer.textContainer);
        })
    })


    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message]);
        });

        socket.on("roomData", ({ users }) => {

            setUsers(users);

        });
    }, [messages]);


    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    useEffect(() => {

        socket.on("textContainerMessage", (textmessage) => {

            setTextMessage(textmessage);
        });


    }, []);

    const sendtext = (value) => {

        socket.emit("textContainerMessage", { textmessage, room });

    }
    

    
    return (

        <div className="main-container">

            <nav className="nav-bar">
                <h1>Peersapp</h1>
            </nav>
            <div className="container">



                <div className="box1">
                    <div className="design">
                        <div className="design1"></div>
                        <div className="design1  design1-block"></div>
                        <div className="design1"></div>
                        <div className="design1"></div>
                    </div>
                    <div className="box1-buttons">

                        <button className="live-buttons" onClick={(event) => setButton(1)}>LivePeers</button>
                        <button className="live-buttons" onClick={(event) => setButton(2)}>LiveChat</button>


                    </div>
                    {
                        (toggle === 1)
                            ?
                            <div className="box1-sub1"><div className="LivePeers"><LivePeers users={users} /></div></div>
                            :
                            <div className="box1-sub1">
                                <div className="box1-sub1-cont">
                                    <div className="chat-container"><LiveChat messages={messages} name={name} /></div>
                                    <div className="InputArea"><Input  message={message} setMessage={setMessage} sendMessage={sendMessage} /></div>

                                </div>


                            </div>

                    }




                </div>
                <div className="box2">
                    <textarea className="textContainer"
                        spellCheck="false"
                        placeholder="Type Code"
                        value={textmessage}
                        onChange={({ target: { value } }) => setTextMessage(value)}
                        onKeyPress={event => event.key === ('Enter') ? sendtext(event) : null}
                    >

                    </textarea>


                </div>
            </div>
        </div>
    )
}

export default CodeArea;