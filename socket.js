var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

server.listen(3001);
io.on('connection', (socket) => {
    socket.on("addMessage", (msg) => {
        io.emit("addMessage", msg);
        console.log("addMessage" );
    })
    socket.on("updateMessage", (nmsg, omsg) => {
        io.emit("updateMessage", nmsg, omsg);
        console.log("updateMessage" );
    })
    socket.on("deleteMessage", (msgs) => {
        io.emit("deleteMessage", msgs);
        console.log("deleteMessage");
    })

});
