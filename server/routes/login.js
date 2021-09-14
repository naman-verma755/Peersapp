const express = require('express');
const bcrypt = require('bcrypt');

const {RegisterUser,UserLogin,GetUserInfo} = require('../models/signup');

const router = express.Router();



router.post('/', async (req, res, next) => {
    
    


    try {

        if(req.body.type === "1")
        {
            const userData = await UserLogin( req.body.gmail);
          
            if(userData === null)
            {
                res.status(201).json({
                    "data":"user not registered"
                })
            }
            else 
            {
               
               bcrypt.compare(req.body.password, userData.password, function(err,result) {
                  if(result === true)
                  {
                      res.status(201).json({
                          "data":userData.userid
                      })
                  }
                  else {

                  res.status(201).json({
                    "data":"wrong password"
                })
            }

                })

               
                
            }
          
           
        } else {
            
            
            
                const userData = await UserLogin(req.body.gmail);
    
            
                if(userData === null)
                {
                    await RegisterUser(req.body.id, req.body.firstName, req.body.lastName, req.body.gmail);
                }
            
                res.status(201).json(
                    {
                        "data":req.body.id
                    });
                }
            }
   catch(err)
   { 
  
   }
    
  
      
  

});



router.post('/validuser', async (req, res, next) => {
    
    
       

    try {
       
            const message = await  GetUserInfo( req.body.userid);
            
           res.status(201).json(
                    {
                        "message":message
                    });
                }
            
   catch(err)
   { 
  
   }
    
  
      
  

});
module.exports = router;