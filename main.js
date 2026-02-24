import { app, Tray, Menu, BrowserWindow, ipcMain } from "electron";
import path from "path";

let tray;
let window;

let greeting = "";

function createWindow() {
  if (window) return window.show();

  window = new BrowserWindow({
    width: 500,
    height: 400,
    webPreferences: {
      preload: path.join(import.meta.dirname, "preload.js"),
    },
  });

  window.loadFile("index.html");

  window.on("close", (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      window.hide();
    }
  });
}

app.setLoginItemSettings({
  openAtLogin: true,
});

app.on("ready", () => {
  tray = new Tray(path.join(import.meta.dirname, "icon.png"));

  const menu = Menu.buildFromTemplate([
    { label: "Configurações", click: createWindow },
    { label: "Greet", click: () => console.log(greeting) },
    { label: "Serviço ativo", enabled: false },
    { type: "separator" },
    {
      label: "Sair",
      click: () => {
        app.isQuiting = true;
        app.quit();
      },
    },
  ]);

  tray.setToolTip("Fenix Fiscal Sync");
  tray.setContextMenu(menu);

  tray.on("click", () => {
    createWindow();
  });
});

ipcMain.on("save-greeting", (event, newGreeting) => {
  greeting = newGreeting;
});
