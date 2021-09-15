
import React, { useEffect, useState } from 'react';
import  { GoogleLogin } from 'react-google-login';
import Cookies from 'universal-cookie';
import './Login.css';
import NavBar from '../NavBar/NavBar';

import UserVerification from '../UserVerification/UserVerification';





 

const Login = ({usertype}) => {

    

    const [error, setError] = useState("");
    const [valid, setValid] = useState(3);

    useEffect(async () => {

      let access = await UserVerification();
      if(access === "valid")
      window.location.href = "/";
      else
      setValid(3)

    
  },[])
  
  


    async function submit() {
        let arr = document.getElementsByClassName("login-form-details");
  


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
                       "usertype": usertype,
                       "gmail":arr[0].value,
                       "password":arr[1].value 
                      
                       
        
                      })
           
        }
        
        const response = await fetch(`https://peerswebapplication.herokuapp.com/login`,Options)
        
        const data = await response.json();

  let res = data.data;
  if(res === "user not registered")
  {
    setError(res);
  }
  else if(res === "wrong password")
  {
    setError(res)
  }
  else if(res === "error")
  {
    setError("Some error ocurred");
  }
  else 
  {
    const cookies = new Cookies();
    cookies.set("id",data.data);
    window.location.href="/"
  
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
                
                 "id":check.googleId,
                  "firstName":check.Ws.zU,
                 "lastName":check.Ws.zS,
                 "gmail":check.Ws.Ht
                 
  
                })
    
  }
  
  const response = await fetch(`https://peerswebapplication.herokuapp.com/login`,Options)
  
  const data = await response.json();
  const cookies = new Cookies();
  cookies.set("id",data.data);
  window.location.href="/"
    }

    
    const onFailure = (res) => {
      setError("Something went wrong, try again")
    }
  
  return (
      <div className="signup-container">
        <NavBar valid = {valid} setValid = {setValid} />  
      

        
        <div className="signup-form">
            <div className="signup">
        <h2 className="signup-heading">Login</h2>
  {
         (error !== "")
         ?
         <div className="error">{error}</div>
         :
         <div className="errorr"></div>

       }
      
  <p>Please fill in this form to create an account.</p>
  <hr></hr>
  
  <label for="email"><b>Email</b></label>
  <input className="login-form-details" type="text" placeholder="Enter Email" name="email" autoComplete="off" required></input>
  <br></br>

  <label for="password"><b>Password</b></label>
  <input className="login-form-details" type="password" placeholder="Enter password" name="password" required></input>
  <br></br>
      

      <button className = "signup-submit login" onClick = {() => {submit()}}>Submit</button>
     
      <span className="or">or</span>
      
      <GoogleLogin  
        className="signup-submit2 "
        clientId="1047619577038-454j1g6t3kntq9d0ljc8rmt16359mvck.apps.googleusercontent.com"
        render = {(renderProps) => (
          <button className="signup-submit2 login" onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</button>
        )}
        onSuccess = {onSuccess}
        onFailure = {onFailure}
        icon = {false}
        cookiePolicy = {'single_host_origin'}
        isSignedIn={false}
        />

        </div>
     

        



</div>
      </div>


     

  )




}

export default Login;



