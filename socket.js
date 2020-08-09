var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

server.listen(3001);
io.on('connection', (socket) => {
    socket.on("msg", (msg) => {
        io.emit("msg", msg);
        console.log("msg" + msg);
    })
    socket.on("up", (msgs) => {
        io.emit("up", msgs);
        console.log("msg" + msgs);
    })

});
