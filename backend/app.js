
require('./models/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//create server and init socket.io
var app = express();
var server = require('http').createServer(app);

//socket.io
const io = require('socket.io')(server);
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./util/chat/users');
const formatMessage = require('./util/chat/message');
const botName = 'Readit Bot';

//router
const rtsIndex = require('./routes/router');


// middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api', rtsIndex);

//for image displaying
app.use(express.static(__dirname+'/images'))
//app.use(express.static('images'))

//for heroku
app.use(express.static(__dirname + '/dist'));
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
  });
  

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});


io.on('connection', socket => {



    socket.on('joinRoom', (data) => {


        const user = userJoin(socket.id, data.username, data.room);

        socket.join(user.room);

        // Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to the "' + data.room_name + '" room'));

        // Broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit(
                'message',
                formatMessage(botName, `${user.username} has joined the chat`)
            );

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit(
                'message',
                formatMessage(botName, `${user.username} has left the chat`)
            );

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});



// start server
server.listen(process.env.PORT || 80, '0.0.0.0', () => console.log(`Server started at port : ${process.env.PORT}`));