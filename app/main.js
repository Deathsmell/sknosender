const { app, BrowserWindow } = require('electron')

function createWindow () {
    const options = {
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    };

    const win = new BrowserWindow(options)

    win.loadFile(`${__dirname}/templates/index.html`)

    win.webContents.openDevTools()
}

app.whenReady().then(createWindow)
