import React from 'react';

import Message from './Message/Message';




const LiveChat = ({messages, name}) => { 
  
    if(messages !== undefined)
    return  (
             
            <div>
            {messages.map((message, i) => <div key = {i}><Message message={message} name={name}/></div>)}
           </div>
    )
    else
    {
        return (<div></div>);
    }
    
    
    
   


}



export default LiveChat;