const { app, BrowserWindow } = require('electron')
const config = require('./config');

// Global variable that holds the app window
let win

function createWindow() {

  // Creating the browser window
  win = new BrowserWindow({
    width: 960,
    height: 540,
    webPreferences: {
        contextIsolation: true
    }
  })

  // Load a website
  win.loadURL(config.WEB_URL)

  win.on('closed', () => {
    win = null
  })

//   // Prevent from spawning new windows
//   win.webContents.on('new-window', (event, url) => {
//     event.preventDefault()
//     win.loadURL(url)
//   })

}

// Executing the createWindow function
// when the app is ready
app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (ProcessingInstruction.platform !== 'darwin') {
        app.quit()
    }
})
