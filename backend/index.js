require('g-crypt');
var app = require('express')();
var fs = require('fs');

var certbotDir = '/etc/letsencrypt/live/zach.black';
var server = require('https').createServer({
    key: fs.readFileSync(certbotDir + '/privkey.pem'),
    cert: fs.readFileSync(certbotDir + '/fullchain.pem'),
}, app);
var io = require('socket.io')(server);

var passphrase = 'Qpud>CdkUbtu^yQ;!a>Ja`Zv?szt<22v',
    crypter = Crypt(passphrase);

app.get('/', function (req, res) {
    res.send('<strong>Not for access...</strong>');
});

// Define how our connection functions.
io.on('connection', function (socket) {
    console.log('Client connected.');

    // Set default state of authentication.
    socket.authenticated = false;

    // Emit test message.
    socket.emit('test', crypter.encrypt('hello'));

    // Define authentication method.
    socket.on('request_authenticate', (loginData, callback) => {
        console.log('Authentication request received.');
        
        /*
            Authenticate user here --
        */

        // Temporary auth.
        if (loginData.username == 'username' && loginData.password == 'password') {
            // Set authentication status.
            socket.authenticated = true;
            callback();
        }
    });

    socket.on('request_projectList', (callback) => {
        console.log('Project list request received.');

        if (socket.authenticated) {
            // Respond to client's request.
            callback(crypter.encrypt([
                { projectID: 'p223', name: 'Project_1', access: false },
                { projectID: 'p224', name: 'Project_2', access: false },
                { projectID: 'p226', name: 'Project_3', access: true }
            ]));
        }
    });

    socket.on('disconnect', function () {
        console.log('Client disconnected.');
    });
});

// Start listening on the server.
server.listen(3001);