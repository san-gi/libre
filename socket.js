var express = require('express'),
    cors = require('cors'),
    app = express(),
    fs = require('fs');


//-------parametre-------

var serveur = require('https').createServer({
    key: fs.readFileSync('C:/Certbot/live/oniric.eu/privkey.pem'),
    cert: fs.readFileSync('C:/Certbot/live/oniric.eu/fullchain.pem'),
}, app).listen(3005, () => {
    console.log('CORS-enabled web server listening on port 443')
});
app.use(cors()) //lancement cors
app.get('/products/:id', (req, res, next) => {      //param cors
    res.json({ msg: 'This is CORS-enabled for all origins!' })
})

io = require('socket.io').listen(serveur)
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


