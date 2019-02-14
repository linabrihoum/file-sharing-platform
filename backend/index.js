require('g-crypt');
var app = require('express')();
var md5 = require('md5');
const fs = require('fs-extra')

// MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'wt',
    password: '8bU*^x48K3j+#YDG',
    database: 'wtdb'
});

// Git
const git = require('simple-git');
const gitPromise = require('simple-git/promise');

// Load SSL certificates.
var certbotDir = '/etc/letsencrypt/live/zach.black';
var server = require('http').createServer(app);
/*
var server = require('https').createServer({
    key: fs.readFileSync(certbotDir + '/privkey.pem'),
    cert: fs.readFileSync(certbotDir + '/fullchain.pem'),
}, app);*/

// Define socket server.
var io = require('socket.io')(server);
const SocketIOFile = require('socket.io-file');

// Define encryption.
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
        if (loginData.email == 'test@whiting-turner.com' && loginData.passwordHash == md5('password')) {
            // Set authentication status.
            socket.authenticated = true;

            // Assign our user id.
            socket.uid = 1;

            // Clone our temp repo.
            /*
            gitPromise().silent(true)
                .clone('/srv/git/wt.git', 'repos/tmp/' + md5(socket.uid) + '/project1')
                .then(() => console.log('finished'))
                .catch((err) => console.error('failed: ', err));*/

            callback(true);
        }
        else {
            callback(false);
        }
    });

    // Define project creation.
    socket.on('request_createProject', (projectData, callback) => {
        console.log('Project Creation request received.');

        // Validate authentication.
        if (socket.authenticated) {
            // Validate user permissions to create projects...
            console.log(projectData);

            connection.connect();

            // Insert project info into DB.
            connection.query('INSERT INTO Projects SET ?', { Name: projectData.name },
                function (error, results, fields) {
                    if (error) throw error;

                    // Create hash from the inserted ID.
                    var projectHash = md5(results.insertId),
                        projectDir = 'repos/main/' + projectHash + '.git';

                    // Create project directory.
                    fs.mkdirSync(projectDir);

                    git(projectDir).init(true)
                        .raw([
                            'lfs',
                            'install'
                        ], () => {
                            console.log('Repo created and LFS setup.');

                            // Clone repo and create initial commit.
                            gitPromise().silent(true)
                                .clone(projectDir, 'repos/main/tmp/' + projectHash)
                                .then(() => {
                                    // Move gitattributes copy.
                                    fs.copyFileSync('repos/gitattributes',
                                        'repos/main/tmp/' + projectHash + '/.gitattributes');

                                    // Add gitattributes and commit push.
                                    git('repos/main/tmp/' + projectHash)
                                        .add('.gitattributes')
                                        .commit('Initial commit.')
                                        .push('origin', 'master')
                                        .exec(() => {
                                            git(projectDir).raw(
                                                [
                                                    'ls-tree',
                                                    '--full-tree',
                                                    '-r',
                                                    '-z',
                                                    '--name-only',
                                                    '--full-name',
                                                    'HEAD'
                                                ], (err, result) => {
                                                    if (err == null) {
                                                        console.log(result.split('\0'));
                                                        console.log(result.split('\0').filter((s) => {
                                                            return !s.match(/\..+|^$/);
                                                        }));
                                                    }
                                                });

                                            // Return callback.
                                            callback(true);
                                        });
                                });
                        });
                });

            connection.end();

            return;
        }

        // Project was not created.
        callback(false);
    });

    socket.on('request_projectList', (callback) => {
        console.log('Project list request received.');

        if (socket.authenticated) {
            // Respond to client's request.
            callback(crypter.encrypt([
                { projectID: 'p223', name: 'Project_1', access: true },
                { projectID: 'p224', name: 'Project_2', access: false },
                { projectID: 'p226', name: 'Project_3', access: true }
            ]));
        }
    });

    socket.on('disconnect', function () {
        console.log('Client disconnected.');

        // Check if client was authenticated.
        if (socket.authenticated) {
            // Clean up tmp.
            fs.remove('repos/tmp/' + md5(socket.uid), function (error) {
                if (error) {
                    throw error;
                }
                console.log('Removed temp dir for UID: ' + socket.uid);
            });
        }
    });
});


/*

git().silent(true)
    .clone('/srv/git/wt.git', 'repos/uid')
    .then(() => console.log('finished'))
    .catch((err) => console.error('failed: ', err));

    */

git('/srv/git/wt.git').raw(
    [
        'ls-tree',
        '--full-tree',
        '-r',
        '-z',
        '--name-only',
        '--full-name',
        'HEAD'
    ], (err, result) => {
        if (err == null) {
            console.log(result.split('\0').filter((s) => {
                return !s.match(/\..+|^$/);
            }));
        }
    });



// Start listening on the server.
server.listen(3001);