
import React, { useEffect, useState } from 'react';

import io from 'socket.io-client';
import '../CodeEditor/CodeEditor.css';
import Cookies from 'universal-cookie';


import LivePeers from '../LivePeers/LivePeers';
import Input from '../Input/Input';
import LiveChat from '../LiveChat/LiveChat';
import RoomVerification from '../RoomVerification/RoomVerification';
import UserVerification from '../UserVerification/UserVerification';
import FetchRoomUsers from '../FetchRoomUsers/FetchRoomUsers';
import FetchRoomMessages from '../FetchRoomMessages/FetchRoomMessages';
import NavBar from '../NavBar/NavBar';

import Compiled from '../Compile/Compiled';
//  const ENDPOINT = 'https://peerswebapplication.herokuapp.com/';
 const ENDPOINT = 'http://localhost:5000';


let socket;

var connectionOptions = {
    "force new connection": true,
    "reconnectionAttempts": "Infinity",
    "timeout": 10000,
    "transports": ["websocket"]
};
const CodeArea = ({ location }) => {
    const [name, setName] = useState("");  //SET NAME FOR THE ROOM 
    const [room, setRoom] = useState("");   //SET ROOM NAME
    const [users, setUsers] = useState('');  
    const [message, setMessage] = useState(''); 
    const [messages, setMessages] = useState();
    const [textmessage, setTextMessage] = useState('');
    const [toggle, setButton] = useState(1);
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState('C'); //INDICATES PRESENT CHOOSING LANGUAGE . BY DEFAULT C LANGUAGE IS CHOOSE.
    const [langtoggle, setLang] = useState(0);  //ENSURE VISIBILITY OF LANGUAGES DROPDOWN BAR.
    const [input, setInput] = useState("");
    const [iscoderunning, setBit] = useState(1);
    const [emit,setEmit] = useState(1);
    
    // const [id,  setId] = useState(localStorage.getItem('login_id'));

    const [valid, setValid] = useState(4);

    useEffect( async () => {
    
        let userAccess = await UserVerification(valid, setValid);
        if(userAccess === "valid")
        setValid(1);
        else
        window.location.href  ="/signup";

        let roomaccess = await RoomVerification();
        if(roomaccess === "invalid access")
        window.location.href = "/createjoin"

        let cookie = new Cookies();
        let username = cookie.get("username");
        let roomname = cookie.get("roomname");
        
        setName(username);
        setRoom(roomname);
       await FetchRoomUsers(roomname,setUsers);
        await FetchRoomMessages(username,message,roomname,setMessages)
        

    },[])


    
 
    



    
      


 

     
 



    useEffect(() => {
    
        socket = io(ENDPOINT, connectionOptions);
     
    }, [ENDPOINT]);


    useEffect(() => {
        if(room !== "")
        socket.emit('join', {name,room});

 
    }, [room]);
   
    useEffect(() => {

        socket.on('addtotextarea', textContainer => {
    
            setTextMessage(textContainer.textContainer);
        })

    },[])


    useEffect(async () => {
        socket.on('message', ({message,name,room})=> {
           
             if(room !== null)
             FetchRoomMessages(name,message,room,setMessages);
        });

        socket.on("roomData", async ({ user,room }) => {
             if(room !== null)
             FetchRoomUsers(room,setUsers);

        }); 


       


    }, [room]);
 

    async function sendMessage(event) {
        event.preventDefault();
        let Options = {
            method: 'POST',
                    mode:'cors',
                    cache: 'no-cache',
                    
                    headers: {
                                 "content-type":"application/json",
                           },
                    
                     redirect: 'follow',
                     referrerPolicy:'no-referrer',
                    body: JSON.stringify({
                        "user": name,
                        "usermessage":message,
                        "roomname": room
                      })
          
        }
        

        
         await  fetch('http://localhost:5000/messages', Options)
       
            socket.emit('sendMessage', {message,name,room}, () => setMessage(''));
      
    }

    useEffect(() => {
        
        socket.on("textContainerMessage", (textmessage) => {

            setTextMessage(textmessage);
            setEmit(0)
        });
        


    }, [textmessage]);

    useEffect(() => {

            if(emit === 1)
            {
            socket.emit("textContainerMessage", { textmessage, room });
            }
        


    }, [textmessage]);

    const languagues = {"C":"C","CPP":"C++","CPP14":"C++ 14", "JAVA": "Java", "JAVASCRIPT_NODE": "Javascript(Node.js)", "PYTHON": "Python 2",
          "PYTHON3": "Python 3", "KOTLIN":"Kotlin"}
    
  function toggleLanguageName() {
      if(langtoggle === 1)
      return 0;
      else
      return 1;
  }
  
    return (

        <div className="main-container">
            
        <NavBar valid = {valid} setValid = {setValid} />
            <div className="container">



                <div className="box1">
                  
                    <div className="box1-buttons">

                        <button className="live-buttons" onClick={(event) => {FetchRoomUsers(room,setUsers); setButton(1)}}>LivePeers</button>
                        <button className="live-buttons" onClick={(event) => {FetchRoomMessages(name,message,room,setMessages);setButton(2)}}>LiveChat</button>
                        <button className="live-buttons" onClick={(event) => setButton(3)}>I/O Console</button>


                    </div>
                    {
                        (toggle === 1)
                            ?
                            <div className="box1-sub1"><div className="LivePeers"><LivePeers users={users} /></div></div>:
                            (toggle === 2)?
                            <div className="box1-sub1">
                                <div className="box1-sub1-cont">
                                    <div id = "chat" className="chat-container"><LiveChat messages={messages} name={name} /></div>
                                    <div className="InputArea"><Input  message={message} setMessage={setMessage} sendMessage={sendMessage} /></div>

                                </div>


                            </div>

                            :
                            <div className="box1-sub1">
                                
                                    
                                    
                                <div className="input">
                                    
                                
                                    <h3>output:</h3><br></br>
                                
                                    <textarea className="inputContainer" 
                                  value = {output}
                                  disabled
                        
                              ></textarea>
                                   
                                    
                                </div>
                            
                               
                                <div className="input">
                                
                                   
                                <textarea className="inputContainer" 
                        spellCheck="false"
                        placeholder="Enter input"
                        value={input}
                        onChange={({ target: { value } }) => setInput(value)}
                        
                              ></textarea>
                            
                              
                                </div>
                            </div>


                    }




                </div>
                <div className="box2">
                    <textarea className="textContainer" 
                        spellCheck="false"
                        placeholder="Type Code"
                        value={textmessage}
                        onChange={({ target: { value } }) => {setEmit(1);setTextMessage(value)}}
                    >

                    </textarea>
                    <div className="run-code">
                        {(iscoderunning === 1)?
                        
                        <div className="button-run-code"><button className="run" onClick={async () => {setBit(0);setOutput("compiling code");await Compiled(textmessage,input,language,setOutput,setBit)}}>Run code</button></div>
                         
                         :
                         <div className="dummy-run-code"><button className="run1 " >Run code</button></div>
    

                         } 
                        <div className="lang" >
                        { (langtoggle === 1)? 
                            <div className="lang-dropdown" id="lang-drop" >
                                 <div className="lang-option" onClick={ () => { setLanguage('C');setLang(0)}}>C</div>
                                 <div className="lang-option" onClick={ () => { setLanguage('CPP');setLang(0)}}>C++</div>
                                 <div className="lang-option" onClick={ () => { setLanguage('CPP14'); setLang(0)}}>C++14</div>
                                 <div className="lang-option" onClick={ () => { setLanguage('JAVA'); setLang(0)}}>Java</div>
                                 <div className="lang-option" onClick={ () => { setLanguage('JAVASCRIPT_NODE'); setLang(0)}}>Javascript(Node.js)</div>
                                 <div className="lang-option" onClick={ () => {setLanguage('PYTHON'); setLang(0)}}>Python 2</div>
                                 <div className="lang-option" onClick={ () => {setLanguage('PYTHON3'); setLang(0)}}>Python 3</div>
                                 
                                 <div className="lang-option" onClick={ () => { setLanguage('KOTLIN');setLang(0)}}>Kotlin</div>

                             </div>
                             :
                             <div></div>
                              }
                        <div className="lang-content"><div className="lang-name"><div>{languagues[language]}</div><div className="lang-button" ><button onClick={() => { setLang(toggleLanguageName())} }>&#9650;</button></div></div></div>
                              
                             
                            </div>
                    </div>
                   
                    
                </div> 
            </div>
          </div>
    )
}

export default CodeArea;