import React from 'react';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';

export type SearchbarProps = {
  onSearch: (value: string) => void;
};

export default function Searchbar({ onSearch }: SearchbarProps) {
  return (
    <div className="flex flex-row items-center px-4 py-2 bg-gray-100 rounded w-1/2 mx-auto my-10">
      <AiOutlineSearch className="text-gray-500 mr-2 text-lg" />
      <input
        type="text"
        spellCheck={false}
        className="w-full bg-transparent outline-none text-gray-700 text-xs"
        placeholder="Search for a library"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
