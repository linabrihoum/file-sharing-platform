// Server configuration.
const port = 3001;

// External libraries.
require('g-crypt');
var app = require('express')();
var fs = require('fs');
var md5 = require('md5');

var certbotDir = '/etc/letsencrypt/live/zach.black';
var server = require('https').createServer({
    key: fs.readFileSync(certbotDir + '/privkey.pem'),
    cert: fs.readFileSync(certbotDir + '/fullchain.pem'),
}, app);
var io = require('socket.io')(server);

var passphrase = 'Qpud>CdkUbtu^yQ;!a>Ja`Zv?szt<22v',
    crypter = Crypt(passphrase);

console.log('\n');
console.log('FSP Server');
console.log('Version: ' + process.env.npm_package_version);
console.log('Starting server on port ' + port + '...');
console.log('\n');

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
        if (loginData.email == 'test@whiting-turner.com' && loginData.passwordHash == md5('password')) {
            // Set authentication status.
            socket.authenticated = true;

            callback(true);
        }
        else {
            callback(false);
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

app.get('/', function (req, res) {
    res.send('<strong>Not for access...</strong>');
});

// Start listening on the server.
server.listen(port);