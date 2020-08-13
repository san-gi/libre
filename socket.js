var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

    app.get('/', function (req,res){
        res.sendFile(__dirname+'/index.html');
    })
server.listen(3005);
io.on('connection', (socket) => {
    socket.on("addMessage", (msg) => {
        io.emit("addMessage", msg);
        console.log("addMessage" );
    })
    socket.on("updateMessage", (msg) => {
        io.emit("updateMessage", msg);
        console.log("updateMessage" +msg);
    })
    socket.on("deleteMessage", (msgs) => {
        io.emit("deleteMessage", msgs);
        console.log("deleteMessage");
    })

});
