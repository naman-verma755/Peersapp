

const users = []
const roomPassword = {};
const roomUsers = {};

const roomMessage = {};


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

        Messages.deleteMany({}, function(err) {
            console.log("collection removed");
        });

        
        delete roomUsers[room];  
        delete roomPassword[room];
        delete roomMessage[room];



    }

    const index = users.findIndex((user) => user.id === id);


    if (index !== -1) return users.splice(index, 1)[0];


}



module.exports = { addMessage};