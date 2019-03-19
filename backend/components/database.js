(function () {

    // MySQL
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'wt',
        password: '8bU*^x48K3j+#YDG',
        database: 'wtdb'
    });

    // Custom output.
    var log = (out) => {
        console.log('[\x1b[35mDB\x1b[0m] %s', out);
    }

    // Establish connection to database.
    connection.connect(function (err) {
        if (err) {
            log('Error connecting to database! (Error: ' + err + ')');
            return;
        }

        log('Successfully connected to database.');
    });

    // Project creation.
    module.exports.addProject = (projectName, callback) => {
        // Open connection to database.
        connection.connect();

        // Insert project info into DB.
        connection.query('INSERT INTO `Projects` SET ?', { Name: projectName },
            function (error, results, fields) {

                if (!error) {

                    log('Project data inserted.');

                    callback(results.insertId);
                }
                else {
                    log('Error: ' + error);
                }
            });

        // Close connection to database.
        connection.end();
    }

    module.exports.getProjects = (callback) => {
        log('Loading available projects.');

        // Find available projects
        connection.query('SELECT * FROM `Projects`',
            function (error, results, fields) {
                if (!error) {

                    // Define project array.
                    var projects = [];

                    results.forEach((project) => {
                        projects.push({
                            ID: project.ID,
                            Name: project.Name,
                            Access: true
                        })
                    });

                    // Return projects from database.
                    callback(projects);
                }
                else {
                    log('Error: ' + error);
                }
            });
    }

    module.exports.loadProject = (projectID, callback) => {
        log('Loading project ' + projectID + '.');

        // Define query.
        var query = 'SELECT * FROM `Projects` WHERE `ID` = ' + connection.escape(projectID);

        // Find available projects
        connection.query(query, function (error, results, fields) {
            if (!error) {
                // Define empty project object.
                var project = null;

                // Get project info from results.
                if (results[0] != null) {
                    project = results[0];
                }

                // Return project.
                callback(project);
            }
            else {
                log('Error: ' + error);
            }
        });
    }
}());