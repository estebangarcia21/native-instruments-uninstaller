import { GrCheckbox } from '@react-icons/all-files/gr/GrCheckbox';
import { GrCheckboxSelected } from '@react-icons/all-files/gr/GrCheckboxSelected';
import { FileSize } from 'main/contextBridge/libs/filesystem';
import React, { useState } from 'react';

export interface LibraryProps {
  name: string;
  path: string;
  size: FileSize;
}

export default function Library({ name, path, size }: LibraryProps) {
  const [selected, setSelected] = useState(false);

  return (
    <button type="button" onClick={() => setSelected(!selected)}>
      <div className="flex flex-row rounded overflow-hidden transition hover:shadow-md">
        <div className="flex flex-col h-auto text-white items-center justify-center flex-[1.5] bg-indigo-600">
          <h1 className="font-semibold text-2xl">{size.value}</h1>
          <h2 className="text-sm font-medium">{size.unit}</h2>
        </div>

        <div className="flex flex-row border border-l-0 flex-[10] bg-white">
          <div className="flex-[9] px-6 py-6 text-center">
            <h1 className="text-lg font-semibold">{name}</h1>
            <p className="text-xs text-gray-500">{path}</p>
          </div>

          <div className="flex-[1.5] text-2xl flex flex-col items-center justify-center">
            {selected ? <GrCheckboxSelected /> : <GrCheckbox />}
          </div>
        </div>
      </div>
    </button>
  );
}
