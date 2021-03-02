import { React } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';


const LivePeers = ({users}) => (
   
    <ScrollToBottom className="chat-container">
    {users ? <h4> {users.map(({index, name}) => (
    <div className="peers"><div  className="activeItem">{name}</div><div className="online">&#8857;</div></div>))}</h4> : <div></div>}
    </ScrollToBottom>
   

   
);





export default LivePeers;