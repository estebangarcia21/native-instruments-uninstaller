/**
 * A configuration for each operating system.
 */
export interface OSConfig<T = unknown> {
  osx: T;
}

export type OSResourcePaths = OSConfig<string>;

export const currentEnv = (function getCurrentEnv(): keyof OSConfig {
  return 'osx';
})();
