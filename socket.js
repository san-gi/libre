var express = require('express'),
    cors = require('cors'),
    app = express();


//-------parametre-------
app.use(express.static('static')) //dossier static
var serveur = require('https').createServer(app).listen(3005, () => {
    console.log('CORS-enabled web server listening on port 3005')
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


