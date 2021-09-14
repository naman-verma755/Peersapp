import Cookies from "universal-cookie";


const RoomVerification = async function (valid, setValid)  {



  

        let cookie = new Cookies();
        let room = cookie.get("roomname");
        if(room === undefined) {
            return "invalid access"
        }
        
        
    
        let Opt = {
          method: 'POST',
                  mode:'cors',
                  cache: 'no-cache',
                  
                  headers: {
                               "content-type":"application/json",
                         },
                  
                   redirect: 'follow',
                   referrerPolicy:'no-referrer',
                  body: JSON.stringify({
                    "room":room
      
                    })
        
      }
        
    const response = await fetch(`http://localhost:5000/createrooms/roomexist`,Opt)
    
    const data = await response.json();

    if(data.message !== "room exist")
    {
    return "invalid access"
    }
    else 
    {
      return "valid"
    }
    
    
    
    }


    export default RoomVerification;