const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const scrapeWikipedia = require('./selenium-script')

function createWindow () {
    const win = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('run-selenium', async (event, { name, familyName }) => {
    try {
        
      const result = await scrapeWikipedia(name+" "+ familyName)
        
        event.reply('selenium-result', result)
    } catch (error) {
        event.reply('selenium-result', { error: error.message })
    }
})
