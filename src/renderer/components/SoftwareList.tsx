import { FileSize } from 'main/contextBridge/libs/filesystem';
import { NISoftware } from 'main/contextBridge/libs/nativeInstruments/resource';
import React, { useEffect, useState } from 'react';
import searchFilter from 'renderer/util/search';
import Library from './Library';

const { findNISoftware, totalResourceSize } = window.nativeInstruments;
const { calcFileSize } = window.filesystem;

export interface SoftwareListProps {
  search: string;
}

export default function SoftwareList({ search }: SoftwareListProps) {
  const [software, setSoftware] = useState<NISoftware[] | null>(null);
  const [fileSizes, setFileSizes] = useState<{
    [softwareName: string]: FileSize;
  }>({});

  useEffect(() => {
    async function fetchSoftware() {
      const sw = await findNISoftware('dataAndSupport');
      sw.sort(
        (a, b) =>
          totalResourceSize(b.resources) - totalResourceSize(a.resources)
      );

      const fileSizes = {};
      sw.forEach(
        ({ name, resources }) => (fileSizes[name] = calcFileSize(resources))
      );

      setFileSizes(fileSizes);
      setSoftware(sw);
    }

    fetchSoftware();
  }, []);

  return (
    <div className="flex flex-col space-y-5">
      {software ? (
        software
          .filter(searchFilter(search))
          .map(({ name, resources }) => (
            <Library
              key={name}
              name={name}
              path={resources[0].path || ''}
              size={fileSizes[name]}
            />
          ))
      ) : (
        <h1 className="text-center font-semibold text-2xl mt-32 text-gray-700">
          Loading...
        </h1>
      )}
    </div>
  );
}
