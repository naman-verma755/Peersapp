const express = require('express');
const router = express.Router();
const {Messages,fetchMessages} = require('../models/messages');

router.post('/', async (req, res, next) => {
   
    
 

    try {

        let c = await Messages(req.body.roomname, req.body.user, req.body.usermessage)
        
   
    res.status(200).json(c);
    
        
    } catch (error) {
       
        res.status(400).json({message: error});
        
    }


    

   
});





router.post('/mes', async (req, res, next) => {

   
 

    try {

   
      
          
        var messages= await fetchMessages(req.body.room);
        let arr = new Array();
        await messages.forEach((item)=> {
           arr.push({"username":item.username, "message":item.message});
          })
         
    
    res.status(200).json({
        arr
    });
    

        
    } catch (error) {

        res.status(400).json({message: error});
        
    }


    

   
});

module.exports = router;