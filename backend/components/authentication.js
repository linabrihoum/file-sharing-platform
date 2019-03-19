(function () {
    const md5 = require('md5');

    var log = (out) => {
        console.log('[\x1b[36mAuth\x1b[0m] %s', out);
    }

    module.exports.authUser = (email, passwordHash, callback) => {

        log('User request received.');

        // Temporary authentication method.
        if (email == 'test@whiting-turner.com' && passwordHash == md5('password')) {

            log('User request successful.');

            // Callback with successful authentication.
            callback(true);

            return;
        }

        log('User request failed.');

        // Callback with unsuccessful authentication.
        callback(false);
        return;
    };
}());