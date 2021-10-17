import fs from 'fs';
import lib from '../..';
import resourcePaths, {
  NISoftware,
  NISoftwareType,
  ResourceStat
} from './resource';

export async function findNISoftware(
  type: NISoftwareType
): Promise<NISoftware[]> {
  const resources = resourcePaths[type];

  const software: NISoftware[] = [];

  for (const r of resources) {
    if (!fs.existsSync(r.dir)) {
      continue;
    }

    const resourceStats = await r.find();

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
  }

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
  const paths = resourcePaths[type];

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

export function totalResourceSize(resources: ResourceStat[]) {
  return resources.reduce((acc, curr) => acc + curr.byteSize, 0);
}

export default lib('nativeInstruments', {
  findNISoftware,
  searchForNISoftware,
  totalResourceSize
});
