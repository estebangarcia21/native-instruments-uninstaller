import fs from 'fs';
import getFolderSize from 'get-folder-size';
import path from 'path';
import { currentEnv, OSResourcePaths } from './platform';
import { capitalize } from './util';

/**
 * A Native Instruments software installation.
 */
export interface NISoftware {
  name: string;
  type: NISoftwareType;
  resources: ResourceStat[];
}

/**
 * The type of software a Native Instruments installation is.
 */
export type NISoftwareType = 'application' | 'plugin' | 'dataAndSupport';

/**
 * The type of data a Native Instruments installation depends on.
 */
export type NIResourceType =
  | 'folder'
  | 'component'
  | 'dpm'
  | 'aaxplugin'
  | 'vst'
  | 'plist';

/**
 * Each bundle is a collection of files on the filesystem.
 */
export type NISoftwareResourceMap = {
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

export class ResourcePath {
  dir: string;

  constructor(
    public readonly type: NIResourceType,
    osPaths: OSResourcePaths,
    public readonly searchSchema: string
  ) {
    this.dir = osPaths[currentEnv];
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

  async find(): Promise<ResourceStat[]> {
    const files = fs.readdirSync(this.dir);
    const resources: ResourceStat[] = [];

    let productPath: string;
    let stat: fs.Stats;

    const appendResource = async (softwareName: string) => {
      const size = stat.isDirectory()
        ? await getFolderSize.loose(productPath)
        : stat.size;

      resources.push({
        softwareName: capitalize(softwareName),
        exists: true,
        path: productPath,
        byteSize: size
      });
    };

    for (const f of files) {
      productPath = this.productPath(f);
      stat = fs.statSync(productPath);

      if (this.type === 'folder' && stat.isDirectory()) {
        await appendResource(f);
      }

      if (this.type === 'plist') {
        const plistTokens = f.split('.');

        if (
          plistTokens.length === 4 &&
          plistTokens.slice(0, 2).join('.') === 'com.native-instruments' &&
          plistTokens[plistTokens.length - 1] === 'plist'
        ) {
          await appendResource(plistTokens[2]);
        }
      }

      if (
        this.type === 'aaxplugin' ||
        this.type === 'vst' ||
        this.type === 'dpm' ||
        this.type === 'component'
      ) {
        await appendResource(f.split('.')[0]);
      }
    }

    return resources;
  }
}

const resourcePaths: NISoftwareResourceMap = {
  application: [
    new ResourcePath(
      'folder',
      { osx: '/Applications/Native Instruments' },
      '<productName>'
    ),
    new ResourcePath(
      'plist',
      { osx: '/Library/Preferences' },
      'com.native-instruments.<productName>.plist'
    )
  ],
  plugin: [
    new ResourcePath(
      'component',
      { osx: '/Library/Audio/Plug-Ins/Components' },
      '<productName>.component'
    ),
    new ResourcePath(
      'vst',
      { osx: '/Library/Audio/Plug-Ins/VST' },
      '<productName>.vst'
    ),
    new ResourcePath(
      'component',
      { osx: '/Library/Application Support/Digidesign/Plug-Ins' },
      '<productName>.dpm'
    ),
    new ResourcePath(
      'component',
      { osx: '/Library/Application Support/Avid/Audio/Plug-Ins' },
      '<productName>.aaxplugin'
    )
  ],
  dataAndSupport: [
    new ResourcePath(
      'folder',
      { osx: '/Library/Application Support/Native Instruments' },
      '<productName>'
    ),
    // Content file
    new ResourcePath('folder', { osx: '/Users/Shared' }, '<productName>')
  ]
};

export default resourcePaths;
