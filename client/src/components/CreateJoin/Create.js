
import React, {  useState } from 'react';

import './CreateJoin.css'
import Cookies  from 'universal-cookie';

const Create = () => {
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
           

              })
  
}

const response = await fetch(`https://peerswebapplication.herokuapp.com/createrooms`,Options)

const data = await response.json();


if(data.message === "room created")
{
  let cookie = new Cookies();
  cookie.set("roomname",nod[1].value)
  cookie.set("username",nod[0].value);
  window.location.href = "/codearea";
}
else
{ 
  setError(data.message);
 
}

 }



  return (

    <div className="signup-container">

<div className="signup-form">


<div className="signup">
<h2 className="signup-heading ">Create Room</h2>
{
(error !== "")
?
<div className="error">{error}</div>
:
<div className="errorr"></div>

}

<p>Please fill in this form to create an account.</p>
<hr></hr>

<label for="username"><b>Username</b></label>
<input className="login-form-details" type="text" placeholder="Enter user name" name="username" required></input>
<br></br>

<label for="email"><b>Room Name</b></label>
<input className="login-form-details" type="text" placeholder="Enter room name" name="email" required></input>
<br></br>

<label for="password"><b>Password</b></label>
<input className="login-form-details" type="password" placeholder="Enter password" name="password" required></input>
<br></br>


<button className = "signup-submit login" onClick = {() => {submit()}}>Submit</button>
<br></br>














{/* </div> */}
</div>
</div>
</div>

   

  )




}

export default Create;


