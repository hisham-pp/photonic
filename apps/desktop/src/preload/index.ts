import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  login: () => ipcRenderer.invoke('auth:login'),
  getPhotos: (params?: { pageSize?: number, pageToken?: string }) => ipcRenderer.invoke('photos:list', params),
  selectDirectory: () => ipcRenderer.invoke('scanner:select-directory'),
  scanDirectory: (dirPath: string) => ipcRenderer.invoke('scanner:scan-directory', dirPath),
  windowMinimize: () => ipcRenderer.send('window-minimize'),
  windowMaximize: () => ipcRenderer.send('window-maximize'),
  windowClose: () => ipcRenderer.send('window-close')
});
