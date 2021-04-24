module.exports.chatSockets =  function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){
        console.log("new connection received", socket.id);
    
    // whenever the client disconnects an automatic disconnect event is fired
socket.on('disconnect', function(){
    console.log("socket disconnected!!");
});

// user has send the req from front-end to join the room and here below server is detecting the request
socket.on('join_room', function(data){
    console.log("joining req received",data);
// here below server lets the requested user is joining the room requested by the user
    socket.join(data.chatroom);
// and then emitting the notification  to all the user chatroom that this user has joined the chatroom
    io.in(data.chatroom).emit('user_joined', data);
});


socket.on('send_message', function(data){
    io.in(data.chatroom).emit('receive_message',data);
})

    });
}



