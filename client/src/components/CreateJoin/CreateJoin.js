import React, { useEffect, useState } from 'react';
import '../Signup/Signup.css';
import '../CreateJoin/CreateJoin.css'

import UserVerification from '../UserVerification/UserVerification';

import Create from './Create';
import Join from './Join';
import NavBar from '../NavBar/NavBar';



const CreateJoin = () => {
  
    const [type, setType] = useState("");
    const [valid, setValid] = useState(4);

    useEffect(async () => {
    
        let userAccess = await UserVerification(valid, setValid);
        if(userAccess === "valid")
        setValid(1);
        else
        window.location.href="/signup";
    },[])


    

    return (

       <div className="signup-container">
           <NavBar valid = {valid} setValid = {setValid} />
         
        <div className="signup-form">
      
       {
           (type === "")
           ?
           <div className="join-create">
           <div className="joincreate" onClick = {() => {setType("create")}}>Create</div>
           <div className="joincreate"  onClick = {() => {setType("join")}}>Join</div>
       
           </div>
           :
           

               (type === "create")
               ?
               <Create/>
               :
               <Join/>
           
       }

      
    
  
        </div>
        </div>
    )
}


export default CreateJoin;  