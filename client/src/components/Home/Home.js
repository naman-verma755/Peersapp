
import React, { useEffect, useState } from 'react';

import './Home.css';
import image1 from '../../icons/compile2.jpg';
import image2 from '../../icons/peers3.png';
import {Link} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

import UserVerification from '../UserVerification/UserVerification';

const Home = () => {

const [valid, setValid] = useState(4);

useEffect(async () => {

    let userAccess = await UserVerification();
    if(userAccess === "valid")
    setValid(1); 
    else
    setValid(0);
},[])






  return (

    <div className="main">
        <NavBar valid = {valid} setValid = {setValid} />
     
        <div className="main-container-first">
            <div className="main-container-first-sub">
                <div className="main-container-first-sub1">
                 <img className="main-img" src={image1} alt="compile"></img>
                    <h2>Execute code in multiple Programming Languages.</h2>

                </div>
                <div className="main-container-first-sub2">
                    <Link className="main-button" to="/coding">
                     <h3>Start Coding</h3>
                        
                    </Link>
                </div>

            </div>


        </div>

        <div className="main-container-second">
            <div className="main-container-first-sub">
                <div className="main-container-first-sub1">
                <img className="main-img2" src={image2} alt="peers"></img>
                <h3>Code with your peers in realtime environment.</h3>
                <h3>And Communicate with them through built in chat application. </h3>

                </div>
                <div className="main-container-first-sub2">
                    <Link className="main-button main-button2" to = "/createjoin">
                        <h3>Peers Programming</h3>
                        
                    </Link >
                  
                </div>

            </div>


        </div>

    </div>
    


   

  )




}

export default Home;



