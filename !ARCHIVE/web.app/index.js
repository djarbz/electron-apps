const { app, BrowserWindow } = require('electron')
const path = require('path');
const fs = require('fs').promises; // Using the promises API for cleaner async/await
const config = require('./app.config');

// Global variable that holds the app window
let win

async function createWindow() {
  // Determine initial window state based on command-line arguments
  const shouldMaximize = app.commandLine.hasSwitch('maximized');
  const shouldFullscreen = app.commandLine.hasSwitch('fullscreen');

  // Creating the browser window
  win = new BrowserWindow({
    width: 960,
    height: 540,
    webPreferences: {
        contextIsolation: true
    }
  })

  // Set maximized or fullscreen if the arguments are present
  if (shouldMaximize) {
    win.maximize();
  } else if (shouldFullscreen) {
    win.setFullScreen(true);
  }

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

// When the app is ready, spawn the window.
app.on('ready', createWindow)

// If all windows are closed, exit the application.
app.on('window-all-closed', () => {
    if (ProcessingInstruction.platform !== 'darwin') {
        app.quit()
    }
})
