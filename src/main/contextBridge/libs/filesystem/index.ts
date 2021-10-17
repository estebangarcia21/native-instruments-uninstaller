import lib from '../..';
import { totalResourceSize } from '../nativeInstruments';
import { ResourceStat } from '../nativeInstruments/resource';

export interface FileSize {
  value: number;
  unit: string;
}

export function convertBytes(bytes: number): FileSize {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];

  if (bytes == 0) {
    return {
      value: 0,
      unit: 'B'
    };
  }

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const unit = sizes[i];

  if (i == 0) {
    return {
      value: bytes,
      unit
    };
  }

  return {
    value: parseInt((bytes / Math.pow(1024, i)).toFixed(1)),
    unit
  };
}

function calcFileSize(resources: ResourceStat[]): FileSize {
  const size = totalResourceSize(resources);

  return convertBytes(size);
}

export default lib('filesystem', {
  convertBytes,
  calcFileSize
});
