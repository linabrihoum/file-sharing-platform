(function () {
    const crypto = require('crypto');

    // Define encryption.
    var Crypt = require('g-crypt');

    var passphrase = 'Qpud>CdkUbtu^yQ;!a>Ja`Zv?szt<22v',
        crypter = Crypt(passphrase);

    // Custom output.
    var log = (out) => {
        console.log('[\x1b[37mEncryption\x1b[0m] %s', out);
    }

    module.exports.encrypt = (data) => {
        try {
            return crypter.encrypt(data);
        }
        catch (err) {
            log('Error encrypting data!');

            return null;
        }
    }

    module.exports.decrypt = (data) => {
        try {
            return crypter.decrypt(data);
        }
        catch (err) {
            log('Error decrypting data!');

            return null;
        }
    }

    module.exports.generateHash = (length = 20) => {
        return crypto.randomBytes(length).toString('hex');
    }
}());