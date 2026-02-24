const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  saveGreeting: (greeting) => ipcRenderer.send("save-greeting", greeting),
});
