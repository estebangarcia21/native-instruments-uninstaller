import fs from 'fs';
import lib from '..';

/**
 * A unique path for each supported operating system.
 */
interface SupportedEnvironments {
  darwin: string;
}

const CURRENT_ENV = (function getCurrentEnv(): keyof SupportedEnvironments {
  return 'darwin';
})();

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
  resources: ResourceStat[];
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

  format(productName: string) {
    return this.path[CURRENT_ENV].replace(`<productName>`, productName);
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

export function findNISoftware(): NISoftware[] {
  return [
    {
      name: 'X',
      resources: [
        {
          exists: true,
          path: '',
        },
      ],
      type: 'Application',
    },
  ];
}

/**
 * Searches for a Native Instruments software installation.
 * @param type The type of software to search for.
 * @param name The name of the software to search for.
 * @returns An array of paths to the software resources and whether they exist or not.
 */
export function searchForNISoftware(
  type: NISoftwareType,
  name: string
): NISoftware {
  const paths = RESOUCE_MAP[type];

  const formattedPaths = paths.map((path) => path.format(name));

  const resources: ResourceStat[] = formattedPaths.map((path) => ({
    path,
    exists: fs.existsSync(path),
  }));

  return { name, type, resources };
}

export default lib('nativeInstruments', {
  findNISoftware,
  searchForNISoftware,
});
