const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const router = require('./router');
const PORT = process.env.PORT || 5000;


const app = express();
const server = http.createServer(app);
const io = socketio(server);
  
app.use(cors()); 
app.use(router); // CALL APP.USE(ROUTER) AS A MIDDLEWARE  
 
const { addUser, removeUser, getUser, getUsersInRoom, RoomPassword, sendMessage, allUsers, addMessage } = require('./users');


io.on('connect', (socket) => {
    console.log('We have a new connection'); 
 

    socket.emit('check', ({ roompassword: RoomPassword, allUsers: allUsers }));

    socket.on("textContainerMessage", ({ textmessage, room }) => {

        addMessage(room, textmessage); 
        socket.broadcast.to(room).emit("textContainerMessage", textmessage);
    }); 
 
    socket.on('join', ({ name, room, passcode }) => {
       
        const { error, user } = addUser({ id: socket.id, name, room, passcode });  

        
        

        socket.join(user.room);

        socket.emit("addtotextarea", { textContainer: sendMessage(room) });  
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}` });  
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` }); 

        io.to(user.room).emit('roomData', { user: user.name, users: getUsersInRoom(user.room) }); 
 
       
    });

    socket.on('sendMessage', (message, callback) => {

        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {

        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    });
});


server.listen(PORT, () => console.log(`server is running on ${PORT} `));       