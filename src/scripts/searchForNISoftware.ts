import fs from 'fs';

/**
 * A unique path for each supported operating system.
 */
interface SupportedEnvironments {
  darwin: string;
}

const CURRENT_ENV: keyof SupportedEnvironments = 'darwin';

/**
 * The type of software a Native Instruments installation is.
 */
type NISoftwareType = 'Application' | 'Plugin' | 'Support';

/**
 * A Native Instruments software installation.
 */
interface NISoftware {
  name: string;
  type: NISoftwareType;
  resources: ResourcePath[];
}

/**
 * The type of data a Native Instruments installation depends on.
 */
type NIDataType =
  | 'folder'
  | 'component'
  | 'dpm'
  | 'aaxplugin'
  | 'vst'
  | 'plist';

/**
 * Each bundle is a collection of files on the filesystem.
 */
type NISoftwareResourceMap = {
  [key in NISoftwareType]: ResourcePath[];
};

/**
 * Describes if a resource exists.
 */
export interface ResourceStat {
  path: string;
  exists: boolean;
}

class ResourcePath {
  constructor(
    public readonly type: NIDataType,
    public readonly path: SupportedEnvironments
  ) {}

  format(bundleName: string) {
    return this.path[CURRENT_ENV].replace(`<productName>`, bundleName);
  }
}

const RESOUCE_MAP: NISoftwareResourceMap = {
  Application: [
    new ResourcePath('folder', {
      darwin: '/Applications/Native Instruments/<productName>',
    }),
    new ResourcePath('plist', {
      darwin: '/Library/Preferences/com.native-instruments.<productName>.plist',
    }),
  ],
  Plugin: [],
  Support: [],
};

/**
 * Searches for a Native Instruments software installation.
 * @param type The type of software to search for.
 * @param name The name of the software to search for.
 * @returns An array of paths to the software resources and whether they exist or not.
 */
export function searchForNISoftware(type: NISoftwareType, name: string) {
  const paths = RESOUCE_MAP[type];

  const formattedPaths = paths.map((path) => path.format(name));

  const existingResources: ResourceStat[] = formattedPaths.map((path) => ({
    path,
    exists: fs.existsSync(path),
  }));

  return existingResources;
}
