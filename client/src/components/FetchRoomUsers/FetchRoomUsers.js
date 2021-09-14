





async function FetchRoomUsers(room,setUsers) { 
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
                    "room": room
                  })
      
    }
    const res = await fetch(`http://localhost:5000/createrooms/roomexist`,Options)
    
const datafirst = await res.json();

if(datafirst.message !== "room exist")
{
    window.location.href = "/createjoin";

}

    
    fetch('http://localhost:5000/joinroom/users', Options)
        .then(response => {
         
           return  response.json()
             
        }) 
        .then(data => {
         
            setUsers(data);

        });  
    
    }
    

    export default FetchRoomUsers;
    