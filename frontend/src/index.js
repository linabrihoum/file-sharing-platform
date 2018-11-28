import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import io from 'socket.io-client';
import Crypt from 'g-crypt';

var passphrase = 'Qpud>CdkUbtu^yQ;!a>Ja`Zv?szt<22v';

window.socket = io('https://zach.black:3001', {secure: true});
window.crypter = Crypt(passphrase);

window.socket.on('test', function (msg) {
    var decryptedMessage = window.crypter.decrypt(msg);
    console.log('Message: ' + decryptedMessage);
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
