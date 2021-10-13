import fs from 'fs';
import path from 'path';
import lib from '..';

/**
 * A unique path for each supported operating system.
 */
interface Environment<T = unknown> {
  darwin: T;
}

type EnvironmentPaths = Environment<string>;

const CURRENT_ENV = (function getCurrentEnv(): keyof Environment {
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
  softwareName?: string;
  path: string;
  exists: boolean;
  byteSize: number;
}

// capatilize each first letter of each word in string
function capitalize(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

class ResourcePath {
  dir: string;

  constructor(
    public readonly type: NIDataType,
    envPaths: EnvironmentPaths,
    public readonly searchSchema: string
  ) {
    this.dir = envPaths[CURRENT_ENV];
  }

  exists(productName: string) {
    return fs.existsSync(this.productPath(productName));
  }

  productPath(productName: string) {
    return path.join(this.dir, productName);
  }

  formatSearchSchema(productName: string) {
    return this.dir.replace(`<productName>`, productName);
  }

  find(): ResourceStat[] {
    const files = fs.readdirSync(this.dir);
    const resources: ResourceStat[] = [];

    let productPath: string;
    let stat: fs.Stats;

    const appendResource = (softwareName: string) => {
      resources.push({
        softwareName: capitalize(softwareName),
        exists: true,
        path: productPath,
        byteSize: stat.size
      });
    };

    files.forEach((f) => {
      productPath = this.productPath(f);
      stat = fs.statSync(productPath);

      if (this.type === 'folder' && stat.isDirectory()) {
        appendResource(f);
      }

      if (this.type === 'plist') {
        const plistTokens = f.split('.');

        if (
          plistTokens.length === 4 &&
          plistTokens.slice(0, 2).join('.') === 'com.native-instruments' &&
          plistTokens[plistTokens.length - 1] === 'plist'
        ) {
          appendResource(plistTokens[2]);
        }
      }
    });

    return resources;
  }
}

const RESOURCE_MAP: NISoftwareResourceMap = {
  Application: [
    new ResourcePath(
      'folder',
      { darwin: '/Applications/Native Instruments' },
      '<productName>'
    ),
    new ResourcePath(
      'plist',
      { darwin: '/Library/Preferences' },
      'com.native-instruments.<productName>.plist'
    )
  ],
  Plugin: [],
  Support: []
};

export function findNISoftware(type: NISoftwareType): NISoftware[] {
  const resources = RESOURCE_MAP[type];

  const software: NISoftware[] = [];

  resources.forEach((r) => {
    const resourceStats = r.find();

    resourceStats.forEach((rs) => {
      const { softwareName, ...resource } = rs;

      const index = software.findIndex((s) => s.name === softwareName);

      if (index === -1) {
        software.push({
          name: softwareName!,
          type,
          resources: [resource]
        });
      } else {
        software[index].resources.push(resource);
      }
    });
  });

  return software;
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
  const paths = RESOURCE_MAP[type];

  const resources: ResourceStat[] = paths.map((path) => {
    const exists = path.exists(name);
    const productPath = path.productPath(name);

    return {
      path: productPath,
      exists,
      byteSize: exists ? fs.statSync(productPath).size : 0
    };
  });

  return { name, type, resources };
}

export default lib('nativeInstruments', {
  findNISoftware,
  searchForNISoftware
});
