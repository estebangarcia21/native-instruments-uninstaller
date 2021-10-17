const { contextBridge, ipcRenderer } = require('electron');

require('./contextBridge/dist/libs').default.forEach((lib) => {
  const { name, contents } = lib;

  contextBridge.exposeInMainWorld(name, contents);
});

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    }
  }
});
