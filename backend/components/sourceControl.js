/*

git().silent(true)
    .clone('/srv/git/wt.git', 'repos/uid')
    .then(() => console.log('finished'))
    .catch((err) => console.error('failed: ', err));

    */
/*
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
    
*/

// Clone our temp repo.
/*
gitPromise().silent(true)
    .clone('/srv/git/wt.git', 'repos/tmp/' + md5(socket.uid) + '/project1')
    .then(() => console.log('finished'))
    .catch((err) => console.error('failed: ', err));*/

(function () {
    // Git
    const git = require('simple-git');
    const gitPromise = require('simple-git/promise');

    // File system.
    const fs = require('fs-extra');

    // Md5 hash.
    var md5 = require('md5');

    var log = (out) => {
        console.log('[\x1b[33mSC\x1b[0m] %s', out);
    }

    // Create project repository using Git.
    module.exports.createProjectRepo = (projectHash, callback) => {

        // Define directory for project.
        var projectDir = 'repos/main/' + projectHash + '.git';

        // Create project directory.
        fs.mkdirSync(projectDir);

        git(projectDir).init(true)
            .raw([
                'lfs',
                'install'
            ], () => {
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
                                // Remove the directory.
                                fs.removeSync('repos/main/tmp/' + projectHash);

                                log('Project repository created and initialized.');

                                callback();
                            });
                    });
            });
    }

    module.exports.cloneProject = (projectDir, projectID, callback) => {
        log('Cloning project ' + projectID + '.');
        
        gitPromise().silent(true)
            .clone('repos/main/' + md5(projectID) + '.git', projectDir)
            .then(() => {
                log('Project clone successful.');

                // Trigger callback function.
                callback();
            })
            .catch((err) => log('Project clone failed.'));
    }

    module.exports.addFile = (projectDir, fileName) => {
        // Add file to git tracking.
        git(projectDir).add('./' + fileName);

        log('Added new file to repo: ' + fileName + '.');
    }

    module.exports.addPush = (projectDir, fileName) => {
        // Add the file.
        module.exports.addFile(projectDir, fileName);

        // Push the current clone to master.
        git(projectDir).push('origin', 'master');

        log('Pushed repository to origin.');
    }
}());