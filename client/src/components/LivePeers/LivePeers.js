import { React } from "react";


const LivePeers = ({users}) => {
  
    var arr=[];
      for(let i=0;i<users.length; i++)
      {
          arr.push(  <div className="peers" key = {`${i} users`}><div  className="activeItem">{users[i]}</div><div className="online">&#8857;</div></div>);
      }
    
    return ( 
    
        <div>
        <h4>
        {arr}
        </h4>
   </div>
   

   
);

    }



 

export default LivePeers;