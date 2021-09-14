

const {client} = require('../models/databaseclient')

async function JoinRoom( roomname,username,socketid ) {

   
   
try {
     
       const db = client.db("RoomUsers");
       var col = db.collection("Users");
       let userExist =  await col.findOne({username:username});
     
      if(userExist !==null )
      {
          return "Username already exist !!!";
      }
    
    
      
           socketid = socketid.toString();
        

           let personDocument = {
           
               "username": username,
               "roomname":roomname,
               "socketid":socketid
            
             
   
   
           }
           
  
    

     await col.insertOne(personDocument)
   
   return "room joined";
 
    
      
        
       
       
   }
   catch(err){
       return "error";
   }
   



}


async function userExist( roomname,username,socketid ) {
 

   
   
try {
     
       const db = client.db("RoomUsers");
       var col = db.collection("Users");
       let userExist =  await col.findOne({roomname:roomname,username:username});
  
      if(userExist !==null )
      {
          return "Username already exist !!!";
      }
    
    
      
           
   
   return "room joined";
 
    
      
        
       
       
   }
   catch(err){
       return "error";
   }
   



}


async function RemoveUser(socketid ) {
    socketid = socketid.toString();
    

   
   
    try {
         
           const db = client.db("RoomUsers");
           var col = db.collection("Users");
         
      
          let person = await col.findOne({socketid:socketid})


           let re = await col.findOneAndDelete({socketid:socketid});
        
       return person;
     
        
          
            
           
           
       }
       catch(err){
          
           return "error";
       }
       
    
    
    
    }
    
    

async function RoomUsers( roomname) {


   
try {
   
       const db =  client.db("RoomUsers");
    
       var col = db.collection("Users");
       let roomusers =  await col.find({roomname:roomname});
      
  

    return roomusers;

   }
   catch(err){ 
   
       return "error";
   }
   



}

module.exports = {JoinRoom,RoomUsers,RemoveUser,userExist};







