
import React, { useState } from 'react';
import '../Home/Home.css';
import '../Signup/Signup.css'

import Cookies from 'universal-cookie';


const Join = () => {
  const [error, setError] = useState("");
 


  
  

 async function submit() {
  let nod = document.getElementsByClassName("login-form-details");


     
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
            "roomname":nod[1].value,
            "roomkey":nod[2].value,
            "username":nod[0].value

             })
 
}

const response = await fetch(`http://localhost:5000/joinroom`,Options);
const data = await response.json();

if(data.message === "room joined") {
  let cookie = new Cookies();

  cookie.set("roomname",nod[1].value)
  cookie.set("username",nod[0].value);
  window.location.href = "/codearea";

}
else {
  setError(data.message);
}

 
}


  return (

    <div className="signup-container">

<div className="signup-form">



<div className="signup">
<h2 className="signup-heading ">Join Room</h2>
{
(error !== "")
?
<div className="error">{error}</div>
:
<div className="errorr"></div>

}

<p>Please fill in this form to join room.</p>
<hr></hr>

<label for="username"><b>Username</b></label>
<input className="login-form-details" type="text" placeholder="Enter user name" name="username" autoComplete="off" required></input>
<br></br>

<label for="email"><b>Room Name</b></label>
<input className="login-form-details" type="text" placeholder="Enter room name" name="email" autoComplete="off" required></input>
<br></br>

<label for="password"><b>Room Key</b></label>
<input className="login-form-details" type="password" placeholder="Enter room Key" name="password" required></input>
<br></br>


<button className = "signup-submit login" onClick = {() => {submit()}}>Submit</button>
<br></br>



</div>
</div>
</div>

   

  )




}

export default Join;


