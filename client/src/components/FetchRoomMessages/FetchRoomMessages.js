



async function FetchRoomMessages(name,message,room,setMessages) { 

  const Options = {
    method: 'POST',
            mode:'cors',
            cache: 'no-cache',
            
            headers: {
                         "content-type":"application/json",
                   },
            
             redirect: 'follow',
             referrerPolicy:'no-referrer',
            body: JSON.stringify({
                "user": name,
                "usermessage":message,
                "room": room
              })
  
}

    

const res = await fetch(`https://peerswebapplication.herokuapp.com/createrooms/roomexist`,Options)
    
const datafirst = await res.json();

if(datafirst.message !== "room exist")
{
    window.location.href = "/createjoin";

}

 
        const response = await  fetch('https://peerswebapplication.herokuapp.com/messages/mes',Options)
       const data = await response.json();
       let arr = [];
       data.arr.forEach(element => {
          arr.push(element);
          
      });
     
       setMessages(arr);
     
        


}
    

    export default FetchRoomMessages;
    