
const bcrypt = require('bcrypt');

const {client} = require('../models/databaseclient')




async function Messages(roomname, username, message) {

   
try {
   
       var db = client.db("RoomMessages");
       var col = db.collection(roomname+"Messages");
      
    

    
           

           let personDocument = {
               "username":username,
               "message":message
   
   
           }
           
      
    
          
        let res =  await col.insertOne(personDocument);
   
      return "messagesend";
       
   }
   catch(err){
      
       return err;
   }
   



}







async function fetchMessages(roomname) {

 try {
      
        var db = client.db("RoomMessages");
        var col = db.collection(roomname+"Messages");
     
         let res = col.find({});
        
       return res
  
    }
    catch(err){
        
        return err;
    }
    
 
 
 
 }
 


module.exports = {Messages,fetchMessages};




