const electron = require('electron');
const url = require('url');
const path = require('path');
const {execFile } = require('child_process');


const { app, BrowserWindow, ipcMain } = electron;

const exe = path.join(__dirname,'NavisConsole.exe');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    ipcMain.on('synchronous-message', (event, arg) => {
        console.log(arg)
        if (arg == 'launchNavis') {
            //TODO: pass cmd line args to launch instance of navis works
            console.log("Opening navis works");
            execFile(exe, ['boop'], (err, data) =>{
                console.log(err);
                console.log(data.toString());
            });
        }
        event.returnValue = 'OK';
    });
});