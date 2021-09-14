
const bcrypt = require('bcrypt');

const {client} = require('../models/databaseclient')

async function RegisterUser( userid, firstName, lastName, gmail, password  ) {

   
   
try {
     
       const db = client.db("RegisteredUsers");
       var col = db.collection("UsersSchema");
       
       var c =  await col.findOne({gmail:gmail});
     
  
      if(c !==null ) 
      {
          return "already registered";
      }
    
       if(password !== null && password !== undefined )
       { 
 
       const hashed = await bcrypt.hash(password,10);
           

           let personDocument = {
               "userid":userid,
               "firstname":firstName,
               "lastname":lastName,
               "gmail": gmail,
               "password":hashed
   
   
           }
           

    
          
           await col.insertOne(personDocument);

         
      
   return userid;
 
      }
      else {

       let personDocument = {
           "userid":userid,
           "firstname":firstName,
           "lastname":lastName,
           "gmail": gmail,
           "password":password 


       }
      
       await col.insertOne(personDocument);
      
       return userid;

      }
    
     
   }
   catch(err){
   
       return err;
   }
   



}



async function UserLogin(gmail) {

 
try {
     
       const db = client.db("RegisteredUsers");
       var col = db.collection("UsersSchema");
      

       const myDoc = await col.findOne({gmail:gmail});
 
       return myDoc;
   }
   catch(err){
      return "error"
   }
   



}

async function GetUserInfo( userid ) {

 
  
try {
  
    
       const db = client.db("RegisteredUsers");
       var col = db.collection("UsersSchema");
 

       const myDoc = await col.findOne({userid});
      
       if(myDoc !== null)
       {
          return "ok"
       }
       else {
          return "invalid access";
       }
       
   }
   catch(err){
       console.log(err);
      
   }
   



}

module.exports = {RegisterUser, UserLogin,GetUserInfo};










