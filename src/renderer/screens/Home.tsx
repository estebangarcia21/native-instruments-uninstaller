import React from 'react';
import Library from 'renderer/components/Library';
import Navbar from 'renderer/components/Navbar';
import Searchbar from 'renderer/components/Searchbar';

const { findNISoftware } = window.nativeInstruments;

export default function Home() {
  const [, onSearch] = React.useState('');

  return (
    <div className="h-screen bg-white">
      <Navbar />

      <Searchbar onSearch={onSearch} />
      <h1 className="text-xl font-bold text-center">Libraries</h1>

      <div className="px-10 my-10 flex flex-col space-y-5">
        {findNISoftware().map(({ name, resources }) => (
          <Library
            key={name}
            name={name}
            path={resources[0].path || ''}
            size={{
              unit: 'GB',
              value: 43
            }}
          />
        ))}
      </div>
    </div>
  );
}
