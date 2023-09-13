const { app, BrowserWindow, Menu } = require('electron')
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 800,
    icon: path.join(__dirname, 'icon.ico'),
  })

  win.loadFile("./App/index.html")
}

Menu.setApplicationMenu(null);

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
