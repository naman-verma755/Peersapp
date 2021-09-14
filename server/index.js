const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');


const PORT = process.env.PORT || 5000;

const app = express();  
const server = http.createServer(app);
const io = socketio(server);

const bodyParser = require('body-parser');


const {JoinRoom,RemoveUser} = require('./models/joinRoom');
const {Messages} = require('./models/messages');


const messageRoutes = require("./routes/messages")
const signupRoutes = require("./routes/signup")
const loginRoutes = require("./routes/login")
const createdRoomsRoutes = require("./routes/createRooms");
const joinRoomRoutes = require("./routes/joinRoom");


app.use(bodyParser.urlencoded({extended: false}));  
app.use(bodyParser.json());


app.use(cors());  
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use('/signup', cors(corsOptions), signupRoutes);
app.use('/login',cors(corsOptions), loginRoutes);
app.use('/messages', cors(corsOptions), messageRoutes); 
app.use('/createrooms', cors(corsOptions), createdRoomsRoutes)
app.use('/joinroom', cors(corsOptions), joinRoomRoutes)
  


const {  addMessage } = require('./users'); 
io.on('connect', (socket) => {    

    socket.on("textContainerMessage", ({ textmessage, room }) => { 
  
        addMessage(room, textmessage);  
        socket.broadcast.to(room).emit("textContainerMessage", textmessage); 
    }); 
  
    socket.on('join', async ({room,name}) => {
   
        await JoinRoom(room,name,socket.id);
        socket.join(room); 
        await Messages(room,"admin",`${name} has joined`)
        io.to(room).emit('message', { user: "useralert",name:name,room:room}); 

        io.to(room).emit('roomData', { user: "useralert",room:room});  
         
       
    });
 
    socket.on('sendMessage', async ({message, name, room}, callback) => {
        io.emit('message', { message:"alert",name:name, room:room}); 
        callback();
    }); 
 
    socket.on('disconnect', async () => {
  
          let person =  await RemoveUser(socket.id);
          if(person !== null)
          {
          let room = person.roomname;
          let user = person.username;
        await Messages(room,"admin",`${user} has left`)
               io.emit('roomData', { user: "useralert",room:room}); 
              
               io.emit('message', { user: "useralert",name:user,room:room}); 
          }
    
    });
});

 
server.listen(PORT, () => console.log(`server is up and running `));       

