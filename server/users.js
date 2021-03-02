


const users = []
const roomPassword = {};
const roomUsers = {};

const roomMessage = {};

const addUser = ({ id, name, room, passcode }) => { 
    
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    if (!(room in roomPassword)) {
        roomPassword[room] = passcode;
        roomUsers[room] = 0;
        roomMessage[room] = "";
    }


    roomUsers[room] += 1;
 

    const user = { id, name, room };

    users.push(user);

    
    return { user };
}

const sendMessage = (room) => {

    return roomMessage[room];
}
const addMessage = (room, value) => {
    roomMessage[room] = value;
}


const removeUser = (id) => {
    let room = -1;
    users.forEach((Element) => {

        if (id == Element.id) {
            room = Element.room;
        }
    });

    if (roomUsers[room] > 1) {
        roomUsers[room] -= 1
    }
    else if (roomUsers[room] === 1) {
        //DELETE ROOM AFTER NO USER LEFT IN THE ROOM 
        roomUsers[room] -= 1;
        delete roomUsers[room];  
        delete roomPassword[room];
        delete roomMessage[room];

    }

    const index = users.findIndex((user) => user.id === id);


    if (index !== -1) return users.splice(index, 1)[0];


}

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getUser = (id) => users.find((user) => user.id === id);

const RoomPassword = roomPassword;
const allUsers = users;


module.exports = { addUser, removeUser, getUser, getUsersInRoom, RoomPassword, sendMessage, allUsers, addMessage };