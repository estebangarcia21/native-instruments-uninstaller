import { NISoftware } from 'main/contextBridge/libs/nativeInstruments';
import React, { useEffect, useState } from 'react';
import searchFilter from 'renderer/util/search';
import Library from './Library';

const { findNISoftware, totalResourceSize } = window.nativeInstruments;

export interface SoftwareListProps {
  search: string;
}

export default function SoftwareList({ search }: SoftwareListProps) {
  const [software, setSoftware] = useState<NISoftware[]>([]);

  useEffect(() => {
    const sw = findNISoftware('Application');

    sw.sort(
      (a, b) => totalResourceSize(b.resources) - totalResourceSize(a.resources)
    );

    setSoftware(sw);
  }, []);

  return (
    <div className="flex flex-col space-y-5">
      {software.filter(searchFilter(search)).map(({ name, resources }) => (
        <Library
          key={name}
          name={name}
          path={resources[0].path || ''}
          size={{
            unit: 'B',
            value: totalResourceSize(resources)
          }}
        />
      ))}
    </div>
  );
}
