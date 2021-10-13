import { NISoftware } from 'main/contextBridge/libs/nativeInstruments';
import React, { useEffect, useState } from 'react';
import Library from 'renderer/components/Library';
import Navbar from 'renderer/components/Navbar';
import Searchbar from 'renderer/components/Searchbar';

const { findNISoftware, totalResourceSize } = window.nativeInstruments;

export default function Home() {
  const [search, onSearch] = React.useState('');

  const [software, setSoftware] = useState<NISoftware[]>([]);

  useEffect(() => {
    const sw = findNISoftware('Application');

    sw.sort(
      (a, b) => totalResourceSize(b.resources) - totalResourceSize(a.resources)
    );

    setSoftware(sw);
  }, []);

  return (
    <div className="h-screen bg-white">
      <Navbar />

      <Searchbar onSearch={onSearch} />
      <h1 className="text-xl font-bold text-center">Libraries</h1>

      <div className="p-10 flex flex-col space-y-5">
        {software
          .filter((s) =>
            search === ''
              ? true
              : s.name.toLowerCase().includes(search.toLowerCase())
          )
          .map(({ name, resources }) => (
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
    </div>
  );
}
