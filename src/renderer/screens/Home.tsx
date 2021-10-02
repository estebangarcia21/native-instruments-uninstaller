import React from 'react';
import Library from 'renderer/components/Library';
import Navbar from 'renderer/components/Navbar';
import Searchbar from 'renderer/components/Searchbar';

export default function Home() {
  const [, onSearch] = React.useState('');

  return (
    <div className="h-screen bg-white">
      <Navbar />

      <Searchbar onSearch={onSearch} />
      <h1 className="text-xl font-bold text-center">Libraries</h1>

      <div className="px-10 my-10 flex flex-col space-y-5">
        <Library
          name="Session Strings Pro"
          path="/Users/estebangarcia/Shared/SessionStringsPro.kontakt"
          size={{
            unit: 'GB',
            value: 45,
          }}
        />
        <Library
          name="Mallet Flux"
          path="/Users/estebangarcia/Shared/MalletFlux.kontakt"
          size={{
            unit: 'GB',
            value: 32,
          }}
        />
      </div>
    </div>
  );
}
