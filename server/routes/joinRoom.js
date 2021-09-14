const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// const {JoinRoom} =require('../models/joinRoom')

const {RoomUsers,userExist} =require('../models/joinRoom')
const {GetRoomInfo} = require('../models/createdRooms');

router.get('/', async (req, res, next) => {

    try {
        res.status(200).json("request on joinroom side");
    } catch (error) {
        
    }

})


router.post('/', async (req, res, next) => {
    

    try {
    
        let room = await GetRoomInfo(req.body.roomname);
       
        if(room === null)
        {
            res.status(201).json({"message":"Room doesn't exist !!!"});
        }

        if(room !== null)
        {
        let check = await bcrypt.compare(req.body.roomkey, room.roomkey);

        if(check === false)
        {
            res.status(201).json({"message":"wrong roomkey"});
        }
        else
        {
        let message = await userExist(req.body.roomname, req.body.username)
   
    
            res.status(201).json({"message":message});
        
        
        }
    }

   
    } catch (error) {
      
        res.status(400).json({message:error});
        
    }

})




router.post('/users', async (req, res, next) => {

  
    let users = await RoomUsers(req.body.room);
  
    var arr = [];
    if(users !== null)
    {
    await users.forEach(function(key) {
      arr.push(key.username);
        
    })
}
   
  
    
    res.status(201).json(arr);
})





module.exports = router;


