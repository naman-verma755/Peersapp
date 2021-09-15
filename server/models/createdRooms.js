
const bcrypt = require('bcrypt');

const {client} = require('../models/databaseclient')



async function CreateRoom( roomname, roomkey ) {

try {
       const db = client.db("Rooms");
       var col = db.collection("RoomsSchema");
       var db2 = client.db("RoomMessages");
       var col2 = db2.collection(roomname+"Messages");
       var db3 = client.db("RoomUsers");
       var col3 = db3.collection("Users");
  
       var c =  await col.findOne({roomname:roomname});
   
     
      if(c !==null )
      {
          return "Roomname already exist !!!";
      }

       const hashed = await bcrypt.hash(roomkey,10);
           

           let personDocument = {
           
               "roomname": roomname,
               "roomkey":hashed,
             
   
   
           }
           
     
    async function func(room) {
        
        setTimeout( async function() {
        await col.findOneAndDelete({roomname:room});
            await col3.deleteMany({roomname:room})
           
            await db2.collection(room+"Messages").drop();
          
 
        },28800000)
        
    } 
    

     let k = await col.insertOne(personDocument,{},func(roomname))
      await col2.insertOne({"message":"Welcome to room " + roomname,username:"admin"}) 
        
   return "room created";
 
   }
   catch(err){
       return "Something wrong ocurred, try again";
   }
   



}



async function GetRoomInfo( roomname) {
 
 try {
       
        const db =  client.db("Rooms");
        var col =  db.collection("RoomsSchema");
  
        var c =  await col.findOne({roomname:roomname});
   
       
    return c;

    }
    catch(err){
    
        return err;
    }
    
 }
 
 

 

async function RoomExist( room) {

 try {
        
        const db =  client.db("Rooms");
        var col =  db.collection("RoomsSchema");
 
        var c =  await col.findOne({roomname:room});
        
        if(c !== null)
        return "room exist";
        else
        return "invalid room";
     
            
       
    
       
    
    }
    catch(err){ 
        return err;
    }
    
 
 
 
 }
 
 
 

module.exports = {CreateRoom, GetRoomInfo, RoomExist};







