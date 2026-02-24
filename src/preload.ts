import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  saveGreeting: (greeting: string) =>
    ipcRenderer.send("save-greeting", greeting),
});
