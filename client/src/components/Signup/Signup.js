
import React, { useState,useEffect } from 'react';
import {GoogleLogin} from 'react-google-login';
import Cookies from 'universal-cookie';
import './Signup.css';
import NavBar from '../NavBar/NavBar';
import UserVerification from '../UserVerification/UserVerification';


const Signup= () => {

 
  const [error,setError] = useState("");

  const [valid, setValid] = useState(2);

  useEffect(async () => {

    let access = await UserVerification();
    if(access === "valid")
    window.location.href = "/"; 
    else
    setValid(2)
  

  
},[])


  
  
async function Submit() {

  let formDetails = document.getElementsByClassName("form-details");
  let first_name = formDetails[0].value
  let last_name = formDetails[1].value
  let gmail = formDetails[2].value
  let password = formDetails[3].value
  let repeatPassword = formDetails[4].value


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
               "type":"1",
               "userId":Date.now().toString(),
               "first_name": first_name,
               "last_name":  last_name,
               "gmail": gmail,
               "password": password

              })
  
}

if(first_name === "")
{
     setError("First name field is empty!!!")
} 
else if(last_name === "")
{
  setError("Last name field is empty!!!")
} 
else if(gmail === "")
{
  setError("gmail field is empty!!!")
} 
else if(password === "")
{
  setError("password field is empty!!!")
} 
else if( password !== repeatPassword)
{
  setError("password doesn't match!!!")
} 
else
{

const response = await fetch(`https://peerswebapplication.herokuapp.com/signup`,Options)

const data = await response.json();

 if(data.data === "already registered")
 {
   setError(data.data+"!!!");
 }
 else{
  const cookies = new Cookies();
  cookies.set("id",data.data);
  window.location.href = "/";
  
 }
}

}




  
  const onSuccess = async (res) => {

    let check = res;

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
               "type":"2",
               "id":check.googleId,
                "firstName":check.Ws.zS,
               "lastName":check.Ws.zU,
               "gmail":check.Ws.Ht
               

              })
  
}

const response = await fetch(`https://peerswebapplication.herokuapp.com/signup`,Options)

const data = await response.json();
const cookies = new Cookies();
cookies.set("id",data.data);
window.location.href = "/";
  }

  const onFailure = (res) => {
    setError("Something went wrong, try again")
  }





 







  return (
    <div className="signup-container">
        <NavBar valid = {valid} setValid = {setValid} />
      
     
      
       
       <div className="signup-form">
           <div className="signup">
  <h2 className="signup-heading">Signup</h2>
  {
         (error !== "")
         ?
         <div className="error">{error}</div>
         :
         <div className="errorr"></div>

       }
      


  <p>Please fill in this form to create an account.</p>
  <hr></hr>
  
  <label for="firstname"><b>First Name</b></label>
  <input className="form-details" type="text" placeholder="Enter Email" name="firstname" required></input>
  <br></br>

  <label for="lastname"><b>Last Name</b></label>
  <input className="form-details" type="text" placeholder="Enter Email" name="lastname" required></input>
  <br></br>
    
  

  
  <label for="gmail"><b>Gmail</b></label>
  <input className="form-details" type="text" placeholder="Enter Email" name="gmail" required></input>
  <br></br>
   
  <label for="psw"><b>Password</b></label>
  <input className="form-details" type="password" placeholder="Enter Password" name="psw" required></input>
  <br></br>
  <label for="psw-repeat"><b>Repeat Password</b></label>
  <input className="form-details" type="password" placeholder="Repeat Password" name="psw-repeat" required ></input>
  <br></br>

  <br></br>
  <button className = "signup-submit" onClick = {()=> {Submit()}}>Submit</button>
  <span className="or">or</span>

  <GoogleLogin  
        className="signup-submit2"
        clientId="1047619577038-454j1g6t3kntq9d0ljc8rmt16359mvck.apps.googleusercontent.com"
        render = {(renderProps) => (
          <button className="signup-submit2 login" onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</button>
        )}
        onSuccess = {onSuccess}
        onFailure = {onFailure}
        icon = {false}
        cookiePolicy = {'single_host_origin'}
        isSignedIn={true}
        />
       
  </div>
  

        
  </div>
        
        
    </div>


   

)




}

export default Signup;



