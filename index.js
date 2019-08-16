const express = require('express');
const path = require('path');
const Rooms = require('socket.io-rooms/rooms');
const User = require('socket.io-rooms/user');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(path.join(__dirname, '/public')));
//大厅
io.on('connection', client => {
    let user = new User();
    client.emit('user',user);
    client.on('join', data => {
        /* 加入某个房间 */
        Rooms.join(data,user,io,client)
    });
    client.on('message',msg=>{
        if(user.roomId){
            // io.to(user.roomId).emit('message',msg)
            Rooms.send(user.roomId,msg)
        }else{
            io.emit('message',msg)
        }
        console.log(msg)
    })
    client.on('disconnect', () => {
        /* … */
        console.log("连接断开")
        Rooms.leave(user)
    });
});
http.listen(3000, function () {
    console.log('listening on *:3000 http://localhost:3000')
})