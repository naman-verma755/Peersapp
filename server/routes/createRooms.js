
const express = require('express');
const router = express.Router();

const NewRoom = require('../models/createdRooms');
const {CreateRoom,RoomExist} = require('../models/createdRooms');

 


router.post('/', async (req, res, next) => {
   

    

    try {

        const message = await CreateRoom( req.body.roomname, req.body.roomkey);
     
            
            res.status(201).json({
                "message":message,
         

            })
        
      
     

    } catch (error ) {
        res.status(400).send(error);
        
    }
})




router.post('/roomexist', async (req, res, next) => {
    
    try {

 
    let message = await RoomExist(req.body.room);
    res.status(200).json({
        
        "message": message
        
        
   });

    
     

    
    } catch (error ) {
        res.status(400).send(error);
        
    }
})



module.exports = router;