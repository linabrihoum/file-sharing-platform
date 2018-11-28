var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.send('<strong>Not for access...</strong>');
});

io.on('connection', function (socket) {
    console.log('Client connected.');

    // Emit test message.
    socket.emit('test', 'message');

    socket.on('disconnect', function() {
        console.log('Client disconnected.');
    });
});

// Start listening on the server.
server.listen(3001);