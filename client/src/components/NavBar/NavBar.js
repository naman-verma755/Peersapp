
import React from 'react';
import '../Home/Home.css'
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';

const NavBar = ({valid, setValid}) => {



   function logout() {
    let cookie = new Cookies();
    cookie.remove("id");
    cookie.remove("roomid")
    cookie.remove("roomname");
    cookie.remove("username");


  }



  return (
    <nav>
    <div className="nav-logo">
         <h1>Peersapp</h1>
    </div>
    
       {
         (valid === 0)
         ?
         <div className="nav-sub">
       
          <Link className="nav-logo1 nav-logo" to="/signup">
          <h1>Signup</h1>
       </Link>
       <Link className="nav-logo1 nav-logo" to="/login">
         <h1>Login</h1> 
       </Link>
       </div>
       :
       
         (valid === 1)
         ?
         <div className="nav-sub">
       <div className="nav-logo1 nav-logo" onClick = {() => {logout(); setValid(0)}}>
         <h1>LogOut</h1> 
       </div>
       </div>
       :
       (valid === 2)
       ?
       <div className="nav-sub">
       <div className="nav-logo1 nav-logo" onClick = {() => {window.location.href = "/login"}}>
         <h1>Login</h1> 
       </div>
       </div>
       :
       (valid === 3)
       ?
       <div className="nav-sub">
       <div className="nav-logo1 nav-logo" onClick = {() => {window.location.href = "/signup"}}>
         <h1>Signup</h1> 
       </div>
       </div>
       :
       <div className="nav-sub">
       <div className="nav-logo1 nav-logo" onClick = {() => {window.location.href = "/signup"}}>
         <h1>Checking user authentication</h1> 
       </div>
       </div>

       

       
       
       

         
       }
      
    
</nav>

   

  )




}

export default NavBar;



