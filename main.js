const { app, shell, BrowserWindow, globalShortcut, screen, ipcMain, Tray, Menu } = require('electron')
const path = require('path')
const clipboardWatcher = require('electron-clipboard-watcher')

Menu.setApplicationMenu(null) //取消菜单栏
let tray = null
app.whenReady().then(() => {
  //取消dock栏显示
  app.dock.hide()
})

app.on('ready', () => {
  //获取屏幕
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const mainWindow = new BrowserWindow({
    width: width,
    height: 300,
    x: 0,
    y: height - 200,
    frame: false,
    // titleBarStyle: 'hidden',
    resizable: false,
    opacity: 0.9,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, '/preload.js')
    }
  })

  // win.loadFile('index.html')
  mainWindow.loadURL('http://localhost:3000/')
  
  mainWindow.loadFile(path.join(__dirname,'./build/index.html'))
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()


  //定义菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '使用帮助',
      click: () => {
        shell.openExternal('https://zhaosheng-blog.vercel.app/2021/05/22/clipboard/')
      }
    },
    {
      label: '关于作者',
      click: () => {
        shell.openExternal('https://zhaosheng-blog.vercel.app/about')
      }
    },
    {
      label: '退出',
      accelerator: (() => 'CmdOrCtrl+Q')(),
      click: () => {
        win.destroy()
        win = null
        win.destroy()
        win = null
        app.quit()
      }
    }
  ])
  //设置托盘图标
  tray = new Tray(path.join(__dirname, './icons/paste2.png'))
  tray.setToolTip('clipboard')
  tray.setContextMenu(contextMenu)
  //点击显示窗口
  tray.on('click', () => {
    mainWindow.show();
  })




  //监听快捷键
  globalShortcut.register('CommandOrControl+`', () => {
    // console.log('CommandOrControl+` is pressed')
    (mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show())
  })
  ipcMain.on('IfwindowShow', (e, args) => {
    mainWindow.hide()
  })


  //剪切板操作
  clipboardWatcher({
    // (optional) delay in ms between polls
    watchDelay: 1000,

    // handler for when image data is copied into the clipboard
    // onImageChange: function (image) {
    //   let img = image.toDataURL()
    //   console.log(img)
    //   win.webContents.send('copy-img',img)
    // },

    // handler for when text data is copied into the clipboard
    onTextChange: function (text) {
      mainWindow.webContents.send('copy-text', text)
    }
  })

})

app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  console.log('=========>window-all-closed');
  if (process.platform !== 'darwin') app.quit()
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
  console.log('程序结束，注销快捷键')
})
