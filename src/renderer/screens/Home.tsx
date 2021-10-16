import React from 'react';
import Navbar from 'renderer/components/Navbar';
import Searchbar from 'renderer/components/Searchbar';
import SoftwareList from 'renderer/components/SoftwareList';

export default function Home() {
  const [search, onSearch] = React.useState('');

  return (
    <div className="flex flex-row bg-white">
      <div className="flex-[3] h-screen p-8">
        <div>
          <Searchbar onSearch={onSearch} />
        </div>

        <div className="mt-8">
          <SoftwareList search={search} />
        </div>
      </div>

      {/* <div className="sticky top-0 w-14 h-14 rounded-full bg-white shadow-xl border"></div> */}
    </div>
  );
}
