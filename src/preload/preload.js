/**
 * 预加载脚本
 * 安全地暴露 API 给渲染进程
 */

const { contextBridge, ipcRenderer } = require('electron')

// 暴露安全的 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 应用信息
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getAppPath: (name) => ipcRenderer.invoke('get-app-path', name),
  
  // 系统信息
  platform: process.platform,
  
  // 自定义事件
  send: (channel, data) => {
    const validChannels = ['minimize-window', 'maximize-window', 'close-window']
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  },
  
  receive: (channel, func) => {
    const validChannels = ['window-event']
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args))
    }
  },
})
