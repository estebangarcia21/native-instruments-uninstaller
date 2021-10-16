import React from 'react';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';

export interface SearchbarProps {
  onSearch: (value: string) => void;
}

export default function Searchbar({ onSearch }: SearchbarProps) {
  return (
    <div className="flex flex-row items-center px-4 bg-white rounded border mx-auto">
      <AiOutlineSearch className="text-gray-500 mr-2 text-lg" />
      <input
        type="text"
        spellCheck={false}
        className="py-2 w-full bg-transparent outline-none text-gray-700 text-xs"
        placeholder="Search for a library"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
