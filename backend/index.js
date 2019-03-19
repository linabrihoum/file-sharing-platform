// Server configuration.
const port = 3001;

// External libraries.
var app = require('express')();
var md5 = require('md5');
const fs = require('fs-extra');

// Database interaction.
const db = require('./components/database');

// Source control backend.
const sc = require('./components/sourceControl');

// Authentication.
const auth = require('./components/authentication');

// Message encryption.
const crypt = require('./components/encryption');

// User workspace.
const Workspace = require('./workspace/workspace');
const ProjectState = require('./workspace/state');
const Project = require('./workspace/project');

// Load SSL certificates.
var certbotDir = '/etc/letsencrypt/live/zach.black';
var server = require('https').createServer({
    key: fs.readFileSync(certbotDir + '/privkey.pem'),
    cert: fs.readFileSync(certbotDir + '/fullchain.pem'),
}, app);
//var server = require('http').createServer(app);

// Define socket server.
var io = require('socket.io')(server);
const SocketIOFile = require('socket.io-file');

// IO Output log.
io.log = (out) => {
    console.log('[\x1b[32mSocket\x1b[0m] %s', out);
}

// Define how our connection functions.
io.on('connection', function (socket) {
    io.log('Client connected.');

    // Set default state of authentication.
    socket.authenticated = false;

    // Emit test message.
    //socket.emit('test', crypter.encrypt('hello'));

    // Define authentication method.
    socket.on('request_authenticate', (encryptedLoginData, callback) => {
        /*
            Authenticate user here --
        */

        // Decrypt login data.
        var loginData = crypt.decrypt(encryptedLoginData);

        // Verify login data.
        if (loginData != null) {
            auth.authUser(loginData.email, loginData.passwordHash, (success) => {
                if (success) {
                    // Set authentication status.
                    socket.authenticated = true;

                    // Assign our user id.
                    socket.uid = 1;

                    // Create new user workspace.
                    socket.workspace = new Workspace();

                    callback(true);
                }
                else {
                    callback(false);
                }
            });
        }
    });

    // Define project creation.
    socket.on('request_createProject', (projectData, callback) => {
        io.log('Project creation request received.');

        // Validate authentication.
        if (socket.authenticated) {

            // TODO: Validate user permissions to create projects...

            // Add project to database.
            db.addProject(projectData.name, (projectID) => {

                // Create hash from the inserted ID.
                var projectHash = md5(projectID);

                // Create our source control repo for new project.
                sc.createProjectRepo(projectHash, () => {
                    callback(true);
                });
            });

            return;
        }

        io.log('Project creation request denied, user is unauthenticated.');

        // Project was not created.
        callback(false);
    });

    socket.on('request_projectList', (callback) => {
        io.log('Project list request received.');

        // Verify user is authenticated.
        if (socket.authenticated) {

            db.getProjects((results) => {
                // Add projects to workspace.
                results.forEach((project) => {
                    if (!project.Access)
                        return;

                    // Define project directory.
                    var projectDir = 'repos/tmp/' + md5(socket.uid) + '/' + md5(project.ID);

                    // Add project to workspace.
                    socket.workspace.addProject(projectDir, project.ID);
                });

                // Respond to client's request.
                callback(crypt.encrypt(results));

                io.log('Project list sent.');
            });
        }
    });

    socket.on('request_project', (encryptedProjectSelection, callback) => {
        // Verify user authenticated.
        if (socket.authenticated) {

            io.log('Project selection request received.');

            // Decrypt user's project selection.
            var projectSelection = crypt.decrypt(encryptedProjectSelection);

            // Set current workspace project.
            socket.workspace.setProject(projectSelection.ID, (err) => {
                if (!err) {
                    io.log('Workspace project set to ' + projectSelection.ID + '.');

                    var projectData = { };

                    console.log(fs.readdirSync(socket.workspace.currentProject.dir));

                } 
                else {
                    io.log('Workspace error: ' + err);
                }
            });

            return;
        }

        io.log('Project info requested but user is unauthenticated!');
    });

    socket.on('disconnect', function () {
        io.log('Client disconnected.');

        // Check if client was authenticated.
        if (socket.authenticated) {
            // Clean up tmp.
            fs.remove('repos/tmp/' + md5(socket.uid), function (error) {
                if (error) {
                    throw error;
                }

                io.log('Removed user temp directory.');
            });
        }
    });

    var uploader = new SocketIOFile(socket, {
        uploadDir: 'upload',
        accepts: [],
        chunkSize: 10240,
        transmissionDelay: 0,
        overwrite: false,
        rename: (fileName, fileInfo) => {
            // Return random generated hash.
            return crypt.generateHash(25);
        }
    });

    uploader.on('start', (fileInfo) => {
        console.log('Start uploading');
    });

    uploader.on('complete', (fileInfo) => {
        console.log('Upload Complete.');
        console.log(fileInfo);
        
        // Move the file to current working directory.
        fs.moveSync(fileInfo.uploadDir, socket.workspace.currentProject.dir + '/' + fileInfo.originalFileName);

        // Add new file to source control.
        sc.addPush(socket.workspace.currentProject.dir, fileInfo.originalFileName);
    });
});

// Start listening on the server.
server.listen(port, (err) => {
    if (!err) {
        console.log('\n');
        console.log('FSP Server');
        console.log('Version: ' + process.env.npm_package_version);
        console.log('Server started on port ' + port);
        console.log('');
    }
    else {
        console.log('Error: ' + error);
    }
});