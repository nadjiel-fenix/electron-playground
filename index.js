import { app, BrowserWindow } from "electron";

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 400,
    autoHideMenuBar: true,
  });

  mainWindow.loadURL(`file://${import.meta.dirname}/index.html`);
});
