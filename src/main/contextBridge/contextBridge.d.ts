export {};

declare global {
  interface ElectronContextIsolationLib<T> {
    name: string;
    contents: T;
  }
}
