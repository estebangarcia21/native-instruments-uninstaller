import React from 'react';
import Searchbar from 'renderer/components/Searchbar';
import SoftwareList from 'renderer/components/SoftwareList';

export default function Home() {
  const [search, onSearch] = React.useState('');

  return (
    <div className="flex flex-col max-h-screen bg-white">
      <div className="p-8">
        <Searchbar onSearch={onSearch} />
      </div>

      <div className="border-t p-8 h-full overflow-y-scroll">
        <SoftwareList search={search} />
      </div>
    </div>
  );
}
