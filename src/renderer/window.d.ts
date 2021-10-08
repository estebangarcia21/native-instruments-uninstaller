import nativeInstruments from 'main/contextBridge/libs/nativeInstruments';

declare global {
  interface Window {
    nativeInstruments: typeof nativeInstruments.contents;
  }
}
