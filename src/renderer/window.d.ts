import fs from 'fs';

export {};

declare global {
  interface Window {
    fs: typeof fs;
  }
}
