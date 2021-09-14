import React, {  useState, useEffect } from 'react';

import image from '../../icons/loading2.gif';
import './CodeEditor.css';
import NavBar from '../NavBar/NavBar'
import UserVerification from '../UserVerification/UserVerification';


import Compiled from '../Compile/Compiled';


const CodeEditor = () => {
    
    


    const [textmessage, setTextMessage] = useState('');
   
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState('C');
    const [langtoggle, setLang] = useState(0); 
    const [input, setInput] = useState("");
    const [iscoderunning, setBit] = useState(1);

    const [valid, setValid] = useState(4);

useEffect(async () => {

    let userAccess = await UserVerification(valid, setValid);
    if(userAccess === "valid")
    setValid(1);
    else
    setValid(0);
},[])



     
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
                        
                           
                            <button className="live-buttons" >I/O Console</button>
                           
                        
                        


                    </div>
                     
    

                                <div className="box1-sub1">
                                
                                    
                                    
                                <div className="output">
                                    
                                <div className="output1">
                                    <h3>output:</h3><br></br>
                                    <div style={{whiteSpace:"pre"}}>
                                        {(output === "compiling code")?
                                        <div className="output1-sub">
                                         {output}<img src={image} ></img>
                                    </div >
                                    :
                                    <div className="output1-sub">
                                        {output}
                                        </div>

                                           }
                                       
                                    </div>
                                    </div>
                                    
                                </div>
                            
                               
                                <div className="input">
                                
                                    <div className="input1">
                                <textarea className="inputContainer" 
                        spellCheck="false"
                        placeholder="Enter input"
                        value={input}
                        onChange={({ target: { value } }) => setInput(value)}
                        
                              ></textarea>
                              </div>
                              
                                </div>
                            </div>

                            


                    




                </div>
                <div className="box2">

                    <textarea className="textContainer" 
                        spellCheck="false"
                        placeholder="Type Code"
                        value={textmessage}
                        onChange={({ target: { value } }) => setTextMessage(value)}
                       
                    >

                    </textarea>

                   

                    <div className="run-code">
                        {(iscoderunning === 1)?
                        
                        <div className="button-run-code"><button className="run"  onClick={async () => {setBit(0);setOutput("compiling code");await Compiled(textmessage,input,language,setOutput,setBit)}}>Run code</button></div>
                         
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

export default CodeEditor;