import React from 'react';
import Navbar from 'renderer/components/Navbar';
import Searchbar from 'renderer/components/Searchbar';
import SoftwareList from 'renderer/components/SoftwareList';

export default function Home() {
  const [search, onSearch] = React.useState('');

  return (
    <div className="h-screen bg-white">
      <Navbar />

      <Searchbar onSearch={onSearch} />
      <h1 className="text-xl font-bold text-center">Libraries</h1>

      <SoftwareList search={search} />
    </div>
  );
}
