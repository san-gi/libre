var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


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
