import Cookies from "universal-cookie";


const UserVerification = async function ()  {



  

        let cookie = new Cookies();
        let id = cookie.get("id");
        if(id === undefined) {
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
                   "userid":id
      
                    })
        
      }
        
    const response = await fetch(`https://peerswebapplication.herokuapp.com/login/validuser`,Opt)
    
    const data = await response.json();
 
    if(data.message !== "ok")
    {
    return "invalid access"
    }
    else 
    {
      return "valid"
    }
    
    
    
    }


    export default UserVerification;