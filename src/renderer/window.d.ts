import nativeInstruments from 'main/contextBridge/libs/nativeInstruments/index';
import filesystem from 'main/contextBridge/libs/filesystem/index';

declare global {
  interface Window {
    nativeInstruments: typeof nativeInstruments.contents;
    filesystem: typeof filesystem.contents;
  }
}
