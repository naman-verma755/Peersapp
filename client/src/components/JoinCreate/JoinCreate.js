import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import './JoinCreate.css';




var connectionOptions = {
    "force new connection": true,
    "reconnectionAttempts": "Infinity",
    "timeout": 10000,
    "transports": ["websocket"]
};
const ENDPOINT = 'https://peerswebapplication.herokuapp.com/';



const JoinCreate = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [passcode, setPassword] = useState('');
    const [roompass, setPassroom] = useState({});
    const [allUsers, setUsers] = useState([]);
    const [Error,setError] = useState("");
    const [er, seter] = useState("none")

    const { type } = queryString.parse(location.search);
    



useEffect(() => {
   
        let socket = io(ENDPOINT, connectionOptions);
        socket.on('check', ({roompassword: roompassword, allUsers: allUsers}) => { //WORK AS AN AUTHENTICAION SYSTEM
         
            if(allUsers) {
                 setUsers(allUsers); 
            } 
            setPassroom(roompassword);
    
        });

}, []);


//FUNCTION FOR USER AUTHENTICATION THAT WORK-
// TO PREVENT USERS TO JOIN 
function func() {
 
    if(name.length ===0 || room.length === 0 || passcode.length === 0)
    return 1;
    if (roompass) {

    //    PREVENT USERS TO CREATE ROOM WITH NAME THAT IS ALREADY EXIST
        if (type === "Create") {
           // console.log("yo",roompass.roompassword);
            if (room in roompass) {
                seter("visible");
                setError("room already exist");
               
                return 1;
            }
            else
                return 0;
        }
        else {

            if (room in roompass) { //CHECK ROOM EXISTED OR NOT (FOR JOINING ROOM, ROOM MUST BE ALREADY EXISTED)
               
               

                if (passcode === roompass[room]) { //MATCH ROOM PASSCODE 
                    
                    const arr = [];
                    var ch = 0;
                    allUsers.forEach((Element) => { 
                        if(Element.room ===  room)
                        {
                        arr.push(Element.name);
                        }
                    })
                     
                    arr.forEach((Element) => {
                        if(name === Element)
                        ch = 1;
                    })
                    if(ch) {   // CHECK USERNAME IS NOT ALREADY EXIST IN THE ROOM
                    
                        seter("visible");     //TO MAKE ERROR MESSAGE VISIBLE
                        setError("username is already taken");
                     
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    seter("visible");
                    setError("password doesn't match");
                    
                    return 1;
                }
            }
            else {
                seter("visible");
                setError("room doesn't exist");
              
                return 1;
            }

        }
    }
    else {
        return 0;
    }

   
}


function MakeErrorVisible(value) {

    if(!(value.localeCompare("visible")))
    {
      
        return (
            {
               
                width: "100%",
                height: "23px",
                backgroundColor:" rgba(219, 13, 13, 0.7)",
                boxShadow: "0 8px 32px 0 rgba(40, 40, 135, 0.37)",
                backdropFilter: "blur(4px)",
                borderRadius:"27px",
            }
        );
    } 
    else {
         
        return (
            {
            display: "none"
            }
        );
    }
}

    return ( 
        <div className="JoinCreate">
            <div className="form">
                <div className="joincreate-tag">
                <h1>{type}</h1>

                <div className="error" style={MakeErrorVisible(er)} >{Error}</div>
                </div>
                <br></br>
                
                <div className="joincreate-input"><h3>username</h3></div>
                <div><input placeholder="username" className="join-input" type="text" required onChange={(event) => setName(event.target.value)} ></input></div>
                <div className="joincreate-input"><h3>roomname</h3></div>
                <div><input placeholder="roomname" className="join-input" type="text" required onChange={(event) => setRoom(event.target.value)} ></input></div>
                <div className="joincreate-input"><h3>password</h3></div>
                <div><input placeholder="password" className="join-input" type="text" required onChange={(event) => setPassword(event.target.value)}></input></div><br></br>
                <Link onClick={event => func() ? event.preventDefault() : null} to={`/codearea?name=${name}&room=${room}&passcode=${(passcode)}`}>
                    <button className="join-input" type='submit'>Go</button>
                </Link>

            </div> 


        </div>
    )
}

export default JoinCreate;