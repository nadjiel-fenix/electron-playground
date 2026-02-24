import { app, BrowserWindow, Tray, Menu, ipcMain } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

// TODO: restrict typescript rule for any typed variables
let tray: Tray;

const ctx = {
  greeting: "",
};

function createTray() {
  const iconPath = app.isPackaged
    ? path.join(process.resourcesPath, "resources", "icon.png")
    : path.join(__dirname, "..", "..", "resources", "icon.png");

  tray = new Tray(iconPath);

  const menu = Menu.buildFromTemplate([
    { label: "Configurações", click: createWindow },
    { label: "Greet", click: () => console.log(ctx.greeting) },
    { label: "Serviço ativo", enabled: false },
    { type: "separator" },
    {
      label: "Sair",
      click: app.quit,
    },
  ]);

  tray.setToolTip("Fenix Fiscal Sync");
  tray.setContextMenu(menu);

  tray.on("click", () => {
    createWindow();
  });
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }
};

app.on("ready", createTray);

app.on("window-all-closed", () => {
  // Prevent the app from quitting when all windows are closed,
  // so it can keep running in the tray
});

app.setLoginItemSettings({
  openAtLogin: true,
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("save-greeting", (event, newGreeting) => {
  ctx.greeting = newGreeting;
});
